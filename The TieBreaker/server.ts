import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn('GEMINI_API_KEY environment variable is not defined.');
}

// Endpoint to generate decision analysis
app.post('/api/analyze', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: 'Gemini API client is not initialized. Please configure your GEMINI_API_KEY in the Secrets panel.',
      });
    }

    const { title, description, options } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Decision title is required.' });
    }

    const optionsList = options && options.length > 0 ? options : ['Yes', 'No'];

    const prompt = `
You are "The Tiebreaker", an elite decision-making consultant.
Analyze the following decision dilemma:
- Dilemma Title: ${title}
- Context/Description: ${description || 'No additional context provided.'}
- Options to choose between: ${optionsList.map((o: string) => `"${o}"`).join(', ')}

Provide a comprehensive, objective, and deeply analytical breakdown of the decision.
Your response MUST be a JSON object matching this TypeScript schema exactly:

interface ProConItem {
  id: string; // unique random id like "pc-1", "pc-2"
  type: 'pro' | 'con';
  option: string; // The option this pro/con belongs to (must match one of the options listed or be "General")
  title: string; // Short concise point (e.g. "High Upfront Cost")
  description: string; // 1-2 sentences explaining why
  weight: number; // Importance rating from 1 (minor) to 5 (critical impact)
  category: string; // Category like Financial, Career, Social, Health, Growth, etc.
}

interface ComparisonCriterion {
  criterion: string; // Aspect like Cost, Time Investment, Career Impact, Risk, Stress
  description: string; // Concise description of this criterion
  optionScores: { [optionName: string]: number }; // Score from 1 (poor) to 5 (excellent) for each option
  optionDetails: { [optionName: string]: string }; // Brief note explaining the score for each option
  importance: number; // Importance rating from 1 to 5
}

interface SWOTQuadrant {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface CognitiveBias {
  name: string; // Name of bias, e.g., "Sunk Cost Fallacy", "Status Quo Bias", "Confirmation Bias"
  description: string; // How this bias might be affecting the user's decision here
  advice: string; // Concrete tip to overcome or neutralize this bias
}

interface DecisionVerdict {
  recommendation: string; // The clear recommended choice or paths forward (can be a specific option, a hybrid, or a conditional recommendation)
  confidence: number; // Confidence level as percentage (50 to 95)
  explanation: string; // Clear, structured logical explanation of why this option is the tiebreaker
  actionSteps: string[]; // 3-4 immediate concrete actionable steps the user should take next
  cognitiveBiases: CognitiveBias[]; // 2-3 potential biases to watch out for
}

interface DecisionAnalysis {
  id: string;
  title: string;
  description: string;
  options: string[];
  prosCons: ProConItem[];
  criteria: ComparisonCriterion[];
  swot: { [optionName: string]: SWOTQuadrant }; // A SWOT analysis block for each option
  verdict: DecisionVerdict;
}

Guidelines for the analysis:
1. Provide a healthy mix of pros and cons for each option (at least 2-3 pros and 2-3 cons per option).
2. For criteria, identify 4-6 highly relevant evaluation dimensions (e.g., if buying a car, criteria should include Safety, Initial Cost, Fuel Economy, Joy, Maintenance). Ensure scores are logically distributed and accurately reflect the context.
3. For SWOT, perform a rich, targeted SWOT analysis for EACH option. Ensure strengths/weaknesses are internal factors, opportunities/threats are external factors.
4. For Verdict, don't sit on the fence! Provide a clear recommendation (the "Tiebreaker"). Be logical, compassionate, and wise. Suggest immediate action steps.
5. Identify 2-3 Cognitive Biases (e.g. Loss Aversion, Sunk Cost, Confirmation Bias, Choice Overload) that are highly likely to influence the user's decision on this specific matter, and explain how to mitigate them.

Return ONLY a valid JSON object. No markdown wrappers, no backticks, no other text. Just the raw JSON content.
`;

    // Using gemini-2.5-flash as recommended by gemini_api skill for general text task
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response received from Gemini.');
    }

    // Parse to verify it is valid JSON
    const parsedData = JSON.parse(text.trim());
    
    // Inject a unique ID if not generated
    if (!parsedData.id) {
      parsedData.id = 'dec_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Set title, description, options in the result to ensure matching
    parsedData.title = title;
    parsedData.description = description || '';
    parsedData.options = optionsList;

    return res.json(parsedData);

  } catch (error: any) {
    console.error('Error generating decision analysis:', error);
    return res.status(500).json({
      error: 'An error occurred while generating the decision analysis.',
      details: error.message || String(error),
    });
  }
});

// Setup dev vs production modes
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  // Serve static assets from build directory
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // In development, we use Vite's dev server as a middleware
  import('vite').then(async (vite) => {
    const viteServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    
    app.use(viteServer.middlewares);
    
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await viteServer.transformIndexHtml(
          url,
          `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Tiebreaker - AI Decision Assistant</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        viteServer.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`The Tiebreaker server is running at http://0.0.0.0:${PORT}`);
});
