import React, { useState, useEffect } from 'react';
import {
  Scale,
  Sparkles,
  Plus,
  Trash2,
  Save,
  History,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  X,
  FileText,
  ChevronRight,
  Info,
  Layers,
  BookOpen,
  Zap,
  HelpCircle,
  PlusCircle,
  Share2,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DecisionAnalysis, SavedDecision, ProConItem, ComparisonCriterion } from './types';

// Demo analysis to pre-fill in case user wants to test or has no API key
const DEMO_DECISION_CAREER: DecisionAnalysis = {
  id: 'demo_career',
  title: 'Accept Startup Offer or Stay at Stable Tech Corp?',
  description: 'Offered a Senior Engineering role at an early-stage Series A startup. Current job is a comfortable, stable position at a Fortune 500 tech firm with good benefits but slow growth.',
  options: ['Join Early-Stage Startup', 'Stay at Corporate Firm'],
  prosCons: [
    {
      id: 'pc-1',
      type: 'pro',
      option: 'Join Early-Stage Startup',
      title: 'High Equity Upside',
      description: 'Significant stock options that could become highly valuable if the company succeeds or gets acquired.',
      weight: 5,
      category: 'Financial'
    },
    {
      id: 'pc-2',
      type: 'pro',
      option: 'Join Early-Stage Startup',
      title: 'Rapid Career Growth & Autonomy',
      description: 'Will lead critical architecture decisions, wear many hats, and likely fast-track to a director/VP level.',
      weight: 5,
      category: 'Career'
    },
    {
      id: 'pc-3',
      type: 'con',
      option: 'Join Early-Stage Startup',
      title: 'High Risk of Failure',
      description: 'Most Series A startups fail within 3 years, which could mean sudden unemployment and worthless equity.',
      weight: 4,
      category: 'Risk'
    },
    {
      id: 'pc-4',
      type: 'con',
      option: 'Join Early-Stage Startup',
      title: 'Longer Work Hours & High Stress',
      description: 'Expect 50+ hour weeks, tight product deadlines, and a chaotic environment with shifting priorities.',
      weight: 4,
      category: 'Lifestyle'
    },
    {
      id: 'pc-5',
      type: 'pro',
      option: 'Stay at Corporate Firm',
      title: 'Unmatched Job Security & Benefits',
      description: 'Excellent health insurance, generous 401k match, stable hours, and very low risk of layoffs.',
      weight: 4,
      category: 'Financial'
    },
    {
      id: 'pc-6',
      type: 'pro',
      option: 'Stay at Corporate Firm',
      title: 'Great Work-Life Balance',
      description: 'Consistent 40-hour weeks, clear boundaries, and ample paid time off to spend with family and hobbies.',
      weight: 5,
      category: 'Lifestyle'
    },
    {
      id: 'pc-7',
      type: 'con',
      option: 'Stay at Corporate Firm',
      title: 'Stagnant Growth & Bureaucracy',
      description: 'Promotions are slow and heavily political. Architecture decisions take months and multiple review boards.',
      weight: 4,
      category: 'Career'
    },
    {
      id: 'pc-8',
      type: 'con',
      option: 'Stay at Corporate Firm',
      title: 'Lower Creative Fulfillment',
      description: 'Maintaining legacy codebases and building minor internal tools rather than crafting exciting new products.',
      weight: 3,
      category: 'Personal'
    }
  ],
  criteria: [
    {
      criterion: 'Financial Upside',
      description: 'Potential for high wealth generation through equity or bonuses.',
      optionScores: { 'Join Early-Stage Startup': 5, 'Stay at Corporate Firm': 3 },
      optionDetails: {
        'Join Early-Stage Startup': 'Substantial Series A stock options with massive multiplier potential.',
        'Stay at Corporate Firm': 'Consistent high base salary with steady 3% annual raises.'
      },
      importance: 4
    },
    {
      criterion: 'Risk & Stability',
      description: 'Likelihood of job security, reliable paycheck, and robust benefits.',
      optionScores: { 'Join Early-Stage Startup': 1, 'Stay at Corporate Firm': 5 },
      optionDetails: {
        'Join Early-Stage Startup': 'Startup has 14 months of runway; high dependency on next funding round.',
        'Stay at Corporate Firm': 'Extremely profitable enterprise. Near-zero risk of standard layoff.'
      },
      importance: 5
    },
    {
      criterion: 'Professional Growth',
      description: 'Speed of learning, acquisition of new skills, and resume prestige.',
      optionScores: { 'Join Early-Stage Startup': 5, 'Stay at Corporate Firm': 2 },
      optionDetails: {
        'Join Early-Stage Startup': 'Will build a modern cloud stack from scratch and lead a small engineering pod.',
        'Stay at Corporate Firm': 'Siloed role focused on small modules in a mature enterprise framework.'
      },
      importance: 4
    },
    {
      criterion: 'Work-Life Balance',
      description: 'Stress levels, working hours, and flexibility to step away.',
      optionScores: { 'Join Early-Stage Startup': 2, 'Stay at Corporate Firm': 5 },
      optionDetails: {
        'Join Early-Stage Startup': 'Startup culture expects high availability and weekend fire-fighting.',
        'Stay at Corporate Firm': 'Strict 9-5 schedule, fully remote option, and no on-call duties.'
      },
      importance: 4
    },
    {
      criterion: 'Creative Autonomy',
      description: 'Freedom to experiment, propose ideas, and make fast decisions.',
      optionScores: { 'Join Early-Stage Startup': 5, 'Stay at Corporate Firm': 2 },
      optionDetails: {
        'Join Early-Stage Startup': 'Absolute authority over tech stack choices; minimal processes.',
        'Stay at Corporate Firm': 'Every minor package dependency change requires 3 approvals.'
      },
      importance: 3
    }
  ],
  swot: {
    'Join Early-Stage Startup': {
      strengths: ['Highly agile team', 'Cutting-edge tech stack', 'Direct line to founders'],
      weaknesses: ['Poor operational structure', 'Inexperienced leadership pod', 'No documented codebase processes'],
      opportunities: ['Define the core industry-disrupting product', 'Fast-track to Chief Architect position within 2 years', 'Establish industry network among top VCs'],
      threats: ['Impending macroeconomic downturn squeezing tech budgets', 'Aggressive competitors with 10x funding', 'Key founder departure']
    },
    'Stay at Corporate Firm': {
      strengths: ['Massive brand equity', 'Vast engineering resources', 'Proven, reliable monetized channels'],
      weaknesses: ['Extremely slow technical execution', 'Outdated, bloated software architecture', 'High developer friction and overhead'],
      opportunities: ['Internal horizontal transfers to higher priority teams', 'Sponsored MBA or specialized advanced master classes', 'Stable environment to work on personal side projects'],
      threats: ['Potential AI automation disrupting support wings', 'Quiet firing of underperforming older divisions', 'Loss of market relevance to fast-moving startups']
    }
  },
  verdict: {
    recommendation: 'Stay at Corporate Firm, but set a 6-month deadline to transition into a more autonomous role or launch a side-hustle.',
    confidence: 78,
    explanation: 'While the early-stage startup offers tremendous upside and rapid growth, your profile heavily highlights an active need for stability right now. Given that you rank "Risk & Stability" as your highest importance (5/5), jumping into a Series A startup with just 14 months of runway presents a severe mismatch with your core priorities. However, staying in your current corporate role in a completely passive manner will lead to creative stagnation. The ideal tiebreaker is a structured hybrid path: leverage the corporate stability and excellent work-life balance (5/5) to spend 10 hours a week researching, building a side project, or interviewing at more established, stable scale-ups (Series C/D) that bridge the gap between autonomy and security.',
    actionSteps: [
      'Have an honest, direct conversation with your corporate manager about carving out a new, high-growth research project in your current team.',
      'Commit to a structured schedule of 5-10 hours per week outside work to build your personal project or master a new stack.',
      'Politely decline the startup offer, but keep in close contact with the founders for potential consulting or future high-level hiring.',
      'Review your financial runway and target Series C or Series D mid-size startups that offer both equity upside and solid funding cushions.'
    ],
    cognitiveBiases: [
      {
        name: 'Grass is Greener Syndrome (Impact Bias)',
        description: 'You are likely overestimating the day-to-day happiness of startup life while ignoring the heavy administrative friction, lack of direction, and relentless hours.',
        advice: 'Speak to 2 engineers currently working at Series A startups to get a highly objective, realistic view of their weekly stress levels.'
      },
      {
        name: 'Loss Aversion',
        description: 'Your fear of losing corporate benefits is highly dominant, causing you to feel deep dread about the startup risk, even if your savings could easily sustain a 6-month search.',
        advice: 'Create an absolute worst-case plan: If you join the startup and it fails in 6 months, how long would it take to land another corporate job? Realizing the backup is secure relieves the paralysis.'
      }
    ]
  }
};

const DEMO_DECISION_HOUSING: DecisionAnalysis = {
  id: 'demo_housing',
  title: 'Buy a Suburban House or Continue Renting Downtown Apartment?',
  description: 'Expanding family of three trying to decide whether to purchase a larger 3-bedroom house in the quiet suburbs or remain in a rented 2-bedroom loft in the vibrant city center.',
  options: ['Buy Suburban House', 'Rent Downtown Apartment'],
  prosCons: [
    {
      id: 'pc-10',
      type: 'pro',
      option: 'Buy Suburban House',
      title: 'Wealth Accumulation & Stability',
      description: 'Building home equity instead of paying "dead money" on rent; predictable fixed mortgage payments.',
      weight: 5,
      category: 'Financial'
    },
    {
      id: 'pc-11',
      type: 'pro',
      option: 'Buy Suburban House',
      title: 'Spacious Backyard & Private Rooms',
      description: 'Dedicated office space, dynamic kids playroom, a secure private yard for the pet, and extra storage.',
      weight: 4,
      category: 'Lifestyle'
    },
    {
      id: 'pc-12',
      type: 'con',
      option: 'Buy Suburban House',
      title: 'Relentless Home Maintenance Costs',
      description: 'Fully responsible for expensive repairs (roof, HVAC, plumbing) plus high property taxes and landscaping effort.',
      weight: 4,
      category: 'Financial'
    },
    {
      id: 'pc-13',
      type: 'con',
      option: 'Buy Suburban House',
      title: 'Soul-Crushing Daily Commute',
      description: 'Commute times into the city will balloon from 15 minutes walking to 60-70 minutes in heavy gridlock.',
      weight: 5,
      category: 'Lifestyle'
    },
    {
      id: 'pc-14',
      type: 'pro',
      option: 'Rent Downtown Apartment',
      title: 'Maximum Walkability & Amenities',
      description: 'Minutes away from prime offices, trendy restaurants, museums, parks, and superb public transit systems.',
      weight: 5,
      category: 'Lifestyle'
    },
    {
      id: 'pc-15',
      type: 'pro',
      option: 'Rent Downtown Apartment',
      title: 'Zero Maintenance Overhead',
      description: 'Any leak, broken appliance, or security issue is solved immediately by building management at zero cost.',
      weight: 4,
      category: 'Lifestyle'
    },
    {
      id: 'pc-16',
      type: 'con',
      option: 'Rent Downtown Apartment',
      title: 'Skyrocketing Rent & No Equity',
      description: 'Landlord can raise rent by 8% annually. None of the monthly outlay contributes to long-term net worth.',
      weight: 5,
      category: 'Financial'
    },
    {
      id: 'pc-17',
      type: 'con',
      option: 'Rent Downtown Apartment',
      title: 'Space Constraints for Growing Child',
      description: 'Sharing a single bathroom, small bedrooms, and lack of dedicated quiet workspaces causes cabin fever.',
      weight: 4,
      category: 'Personal'
    }
  ],
  criteria: [
    {
      criterion: 'Long-term Financial Value',
      description: 'Ability to grow net worth, build equity, and hedge against inflation.',
      optionScores: { 'Buy Suburban House': 5, 'Rent Downtown Apartment': 1 },
      optionDetails: {
        'Buy Suburban House': 'A primary home acts as a powerful forced savings vehicle and tends to appreciate steadily.',
        'Rent Downtown Apartment': 'Paying rent generates zero return; stock market investment of the downpayment would need to be very high.'
      },
      importance: 5
    },
    {
      criterion: 'Daily Time & Commute',
      description: 'Hours saved daily by avoiding heavy driving and traffic.',
      optionScores: { 'Buy Suburban House': 1, 'Rent Downtown Apartment': 5 },
      optionDetails: {
        'Buy Suburban House': 'Adding 10+ hours of driving per week back and forth, reducing family evening time.',
        'Rent Downtown Apartment': 'Walking distance to work, daycare, and grocery stores. Zero commute stress.'
      },
      importance: 4
    },
    {
      criterion: 'Mental Peace & Space',
      description: 'Space for children, personal hobbies, quiet workspace, and pets.',
      optionScores: { 'Buy Suburban House': 5, 'Rent Downtown Apartment': 2 },
      optionDetails: {
        'Buy Suburban House': 'Massive indoor and outdoor square footage. Highly peaceful cul-de-sac environment.',
        'Rent Downtown Apartment': 'Shared walls, urban street sirens, and general clutter of tight space.'
      },
      importance: 4
    },
    {
      criterion: 'Flexibility & Freedom',
      description: 'Ability to pack up, move to a new city, or adjust budget instantly.',
      optionScores: { 'Buy Suburban House': 2, 'Rent Downtown Apartment': 5 },
      optionDetails: {
        'Buy Suburban House': 'Tied down by high transaction fees (6% agent fees) and a 30-year financial contract.',
        'Rent Downtown Apartment': 'Can pack bags and move with a simple 60-day lease termination notice.'
      },
      importance: 3
    }
  ],
  swot: {
    'Buy Suburban House': {
      strengths: ['Total physical control of environment', 'Appreciating physical asset', 'Top-tier public suburban school systems'],
      weaknesses: ['Substantial cash reserves locked up in downpayment', 'High physical maintenance responsibility', 'Dependence on automobiles'],
      opportunities: ['Build a secondary rental unit (ADU) in the large yard', 'Host large family gatherings and holidays comfortably', 'Establish deep roots in a tight-knit family neighborhood'],
      threats: ['Interest rate fluctuations crashing local resale value', 'Sudden property tax increases', 'Environmental risks (flooding, wildfires)']
    },
    'Rent Downtown Apartment': {
      strengths: ['Immediate proximity to high-paying city jobs', 'High-end shared building amenities (pool, gym)', 'Extremely low friction of daily living'],
      weaknesses: ['Exposure to land lord whim and eviction risk', 'No physical control to renovate or paint', 'Zero home-equity tax deductions'],
      opportunities: ['Invest the downpayment fund heavily into high-yielding index funds', 'Quickly move closer to child\'s chosen school later', 'Change neighborhoods in 24 hours if crime patterns shift'],
      threats: ['Hyper-inflation of rental markets', 'Severe urban noise pollution affecting child\'s sleep', 'Decline of public amenities nearby']
    }
  },
  verdict: {
    recommendation: 'Rent Downtown Apartment for one more year, but aggressively pool cash to purchase a townhome in a transit-friendly "Middle Ring" suburb.',
    confidence: 83,
    explanation: 'The extreme commute penalty of the far suburbs (1/5) stands in stark, painful opposition to your current lifestyle. Commuting 2 hours daily will actively sabotage your family connection and increase stress, which nullifies the extra square footage. However, continuing to rent downtown indefinitely with zero equity is building high financial anxiety. The ultimate tiebreaker is a delayed, strategic hybrid compromise. By staying in the downtown loft for 12 more months, you avoid rushing into a high-interest mortgage in a panic. During this year, narrow your house hunt exclusively to "transit-oriented development suburbs" (such as outer neighborhoods with direct express train lines) where you can buy a townhouse, securing space without sacrificing sanity on the highways.',
    actionSteps: [
      'Set up a high-yield savings account explicitly for a 12-month house fund and automate a monthly savings goal.',
      'Begin taking weekend trips to "transit suburbs" located along major train lines to evaluate school quality and neighborhoods.',
      'Commit to a strict minimalist audit of your current loft: declutter aggressively and add creative vertical storage systems to make the 2-bedroom space feel roomier for the next year.',
      'Meet with a mortgage broker to get a detailed assessment of your maximum buying power once interest rates stabilize.'
    ],
    cognitiveBiases: [
      {
        name: 'Rent-as-Dead-Money Fallacy',
        description: 'You are viewing rent as completely wasted money, which is causing panic buying. Rent is actually paying for high-flexibility, zero maintenance, and premium central location.',
        advice: 'Calculate the unrecoverable costs of owning a home (interest, property taxes, maintenance, home insurance). You will find that renting is often cheaper than these combined costs in the short run.'
      },
      {
        name: 'Status Quo Bias',
        description: 'You are extremely comfortable with your daily walk to coffee shops and are letting the fear of change prevent you from taking a healthy step toward long-term wealth creation.',
        advice: 'Create a list of 5 concrete local activities you can do in a suburban neighborhood (gardening, barbecuing, bike paths) to form a positive mental image of change.'
      }
    ]
  }
};

export default function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>(['Option A', 'Option B']);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);
  const [savedDecisions, setSavedDecisions] = useState<SavedDecision[]>([]);
  const [selectedSavedId, setSelectedSavedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'balance' | 'matrix' | 'swot' | 'biases'>('balance');
  const [userNotes, setUserNotes] = useState('');
  const [customProsCons, setCustomProsCons] = useState<ProConItem[]>([]);
  
  // Custom pro/con form state
  const [newPcType, setNewPcType] = useState<'pro' | 'con'>('pro');
  const [newPcOption, setNewPcOption] = useState('');
  const [newPcTitle, setNewPcTitle] = useState('');
  const [newPcDesc, setNewPcDesc] = useState('');
  const [newPcWeight, setNewPcWeight] = useState(3);
  const [newPcCategory, setNewPcCategory] = useState('Personal');

  // SWOT option switch state
  const [swotActiveOption, setSwotActiveOption] = useState('');

  // Loading steps animation
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingSteps = [
    'Mapping decision nodes & parameters...',
    'Structuring balanced pros & cons lists...',
    'Generating comparative multi-criteria matrices...',
    'Formulating comprehensive SWOT analysis grids...',
    'Scanning for prominent cognitive biases & fallacies...',
    'Weighing mathematical scores for final Tiebreaker recommendations...'
  ];

  // Load saved decisions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tiebreaker_decisions');
      if (stored) {
        const parsed = JSON.parse(stored) as SavedDecision[];
        setSavedDecisions(parsed);
      }
    } catch (e) {
      console.error('Failed to load decisions:', e);
    }
  }, []);

  // Update swotActiveOption whenever options are available
  useEffect(() => {
    if (analysis && analysis.options.length > 0) {
      setSwotActiveOption(analysis.options[0]);
      setNewPcOption(analysis.options[0]);
    }
  }, [analysis]);

  // Loading step cycling
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (analyzing) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [analyzing]);

  const handleAddOption = () => {
    const nextLetter = String.fromCharCode(65 + options.length); // A, B, C, D...
    setOptions([...options, `Option ${nextLetter}`]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return; // Maintain at least 2 options
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...options];
    updated[index] = val;
    setOptions(updated);
  };

  // Launch analysis request to backend
  const handleAnalyze = async () => {
    if (!title.trim()) return;

    setAnalyzing(true);
    setAnalysis(null);
    setCustomProsCons([]);
    setUserNotes('');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          options: options.filter(o => o.trim() !== ''),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate analysis.');
      }

      const result = await response.json() as DecisionAnalysis;
      setAnalysis(result);
    } catch (error: any) {
      console.error(error);
      alert(`API Error: ${error.message || 'Make sure your GEMINI_API_KEY is configured.'}. Loading Career Demo decision so you can experience the app interface!`);
      // Fallback to high-quality demo so app is functional
      const fallbackDemo = { ...DEMO_DECISION_CAREER, id: 'fallback_' + Math.random().toString(36).substr(2, 9) };
      setAnalysis(fallbackDemo);
    } finally {
      setAnalyzing(false);
    }
  };

  const loadDemo = (type: 'career' | 'housing') => {
    const demo = type === 'career' ? DEMO_DECISION_CAREER : DEMO_DECISION_HOUSING;
    const freshDemo = { ...demo, id: 'demo_' + Date.now() };
    setAnalysis(freshDemo);
    setCustomProsCons([]);
    setUserNotes('');
    setTitle(demo.title);
    setDescription(demo.description);
    setOptions(demo.options);
  };

  // Save the current analysis to history
  const handleSaveDilemma = () => {
    if (!analysis) return;

    // Check if already exists in saved list
    const existingIndex = savedDecisions.findIndex(d => d.analysis.id === analysis.id);
    
    const newSaved: SavedDecision = {
      id: analysis.id,
      title: analysis.title,
      options: analysis.options,
      analysis: analysis,
      userNotes: userNotes,
      customProsCons: customProsCons,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    let updatedList = [...savedDecisions];
    if (existingIndex >= 0) {
      updatedList[existingIndex] = newSaved;
    } else {
      updatedList = [newSaved, ...updatedList];
    }

    setSavedDecisions(updatedList);
    localStorage.setItem('tiebreaker_decisions', JSON.stringify(updatedList));
    setSelectedSavedId(analysis.id);
    
    // Smooth toast or notice (simulated via standard style transition)
  };

  const handleLoadSaved = (saved: SavedDecision) => {
    setAnalysis(saved.analysis);
    setUserNotes(saved.userNotes);
    setCustomProsCons(saved.customProsCons);
    setTitle(saved.analysis.title);
    setDescription(saved.analysis.description);
    setOptions(saved.analysis.options);
    setSelectedSavedId(saved.id);
  };

  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedDecisions.filter(d => d.id !== id);
    setSavedDecisions(updated);
    localStorage.setItem('tiebreaker_decisions', JSON.stringify(updated));
    if (selectedSavedId === id) {
      setAnalysis(null);
      setSelectedSavedId(null);
    }
  };

  // Add a user custom pro/con point dynamically
  const handleAddCustomProCon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPcTitle.trim() || !analysis) return;

    const newItem: ProConItem = {
      id: 'custom-' + Date.now(),
      type: newPcType,
      option: newPcOption,
      title: newPcTitle,
      description: newPcDesc || 'Manually added key consideration.',
      weight: newPcWeight,
      category: newPcCategory
    };

    setCustomProsCons([...customProsCons, newItem]);
    
    // Reset form fields
    setNewPcTitle('');
    setNewPcDesc('');
    setNewPcWeight(3);
    setNewPcCategory('Personal');
  };

  // Delete a user custom pro/con point
  const handleDeleteCustomProCon = (id: string) => {
    setCustomProsCons(customProsCons.filter(item => item.id !== id));
  };

  // Combine default and custom pros/cons for score calculation and display
  const allProsCons = analysis ? [...analysis.prosCons, ...customProsCons] : [];

  // Recalculate scores in real-time based on combined items
  const calculateOptionScore = (optionName: string) => {
    if (!analysis) return 0;
    
    const optionItems = allProsCons.filter(item => item.option === optionName);
    let score = 0;
    optionItems.forEach(item => {
      if (item.type === 'pro') {
        score += item.weight;
      } else {
        score -= item.weight;
      }
    });
    return score;
  };

  // Calculate Weighted Matrix Score for comparison grid
  const calculateWeightedMatrixScore = (optionName: string) => {
    if (!analysis) return 0;
    let totalScore = 0;
    let totalImportance = 0;

    analysis.criteria.forEach((crit) => {
      const score = crit.optionScores[optionName] || 0;
      totalScore += score * crit.importance;
      totalImportance += crit.importance;
    });

    if (totalImportance === 0) return 0;
    return parseFloat((totalScore / totalImportance).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200 py-3.5 px-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Scale id="app-logo-icon" className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              The Tiebreaker
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium tracking-wide">
                AI CO-PILOT
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-normal">Settle tough dilemmas with mathematical clarity</p>
          </div>
        </div>
        
        {/* Quick Demo Pre-fill triggers */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Try Demo:</span>
          <button 
            id="demo-career-btn"
            onClick={() => loadDemo('career')} 
            className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium rounded-lg border border-slate-200 transition-all cursor-pointer"
          >
            💼 Career Shift
          </button>
          <button 
            id="demo-housing-btn"
            onClick={() => loadDemo('housing')} 
            className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium rounded-lg border border-slate-200 transition-all cursor-pointer"
          >
            🏡 Housing Duel
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sidebars & Setup (4 Columns on large screen) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          {/* Saved History Quick list */}
          {savedDecisions.length > 0 && (
            <div id="saved-history-card" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" /> Saved Dilemmas
              </h2>
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {savedDecisions.map((sd) => (
                  <div
                    key={sd.id}
                    onClick={() => handleLoadSaved(sd)}
                    className={`group w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedSavedId === sd.id
                        ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900'
                        : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60 hover:border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="text-xs font-semibold truncate">{sd.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{sd.createdAt}</div>
                    </div>
                    <button
                      id={`delete-dilemma-${sd.id}`}
                      onClick={(e) => handleDeleteSaved(sd.id, e)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-white transition-colors"
                      title="Delete Dilemma"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Decision Input Form */}
          <div id="decision-input-card" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col flex-1">
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" /> Frame Your Dilemma
            </h2>

            <div className="space-y-4 flex-1">
              {/* Title */}
              <div>
                <label htmlFor="dilemma-title" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  What is the decision you need to make? <span className="text-rose-500">*</span>
                </label>
                <input
                  id="dilemma-title"
                  type="text"
                  placeholder="e.g., Should I buy a Tesla Model Y or Honda CR-V?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              {/* Context */}
              <div>
                <label htmlFor="dilemma-desc" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Context & Constraints (Optional)
                </label>
                <textarea
                  id="dilemma-desc"
                  rows={3}
                  placeholder="Describe your current situation, emotional deadlocks, or financial boundaries..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50 resize-none"
                />
              </div>

              {/* Dynamic Options List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-600">
                    Compare Options (Minimum 2)
                  </label>
                  <button
                    id="add-option-btn"
                    type="button"
                    onClick={handleAddOption}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Option
                  </button>
                </div>
                
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        placeholder={`Option ${idx + 1}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/30"
                      />
                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="mt-6">
              <button
                id="analyze-decision-btn"
                onClick={handleAnalyze}
                disabled={!title.trim() || analyzing}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {analyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing Trade-offs...
                  </>
                ) : (
                  <>
                    <Scale className="w-4.5 h-4.5" />
                    Let AI Break the Tie
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Analysis Dashboard (8 Columns on large screen) */}
        <div className="lg:col-span-8 flex flex-col space-y-6 min-h-[500px]">
          
          <AnimatePresence mode="wait">
            
            {/* 1. Loading State */}
            {analyzing && (
              <motion.div
                key="loading-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-200 p-8 text-center flex-1 flex flex-col items-center justify-center shadow-sm"
              >
                <div className="relative mb-6">
                  {/* Outer breathing ring */}
                  <div className="w-20 h-20 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-indigo-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Assembling Consulting Engine</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                  Our advanced AI co-pilot is mapping out options, evaluating probabilities, and detecting logical vulnerabilities.
                </p>

                {/* Simulated progress step list */}
                <div className="w-full max-w-sm bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left">
                  {loadingSteps.map((step, idx) => {
                    let status = 'pending';
                    if (loadingStep > idx) status = 'done';
                    else if (loadingStep === idx) status = 'active';

                    return (
                      <div key={idx} className="flex items-center space-x-2.5 py-1.5">
                        {status === 'done' && (
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">✓</div>
                        )}
                        {status === 'active' && (
                          <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold animate-pulse">●</div>
                        )}
                        {status === 'pending' && (
                          <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px] font-bold">•</div>
                        )}
                        <span className={`text-xs ${status === 'active' ? 'text-slate-800 font-semibold' : status === 'done' ? 'text-slate-500' : 'text-slate-300'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 2. Standard State: Empty Dashboard waiting for analysis */}
            {!analyzing && !analysis && (
              <motion.div
                key="empty-dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl border border-slate-200 p-8 text-center flex-1 flex flex-col items-center justify-center shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 shadow-inner">
                  <Scale className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">No Dilemma Analyzed Yet</h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Provide your decision context on the left or select one of our premium real-world dilemmas to see how The Tiebreaker dissects choices with extreme logic and balance.
                </p>
                
                {/* Visual grid showing what they will unlock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
                  <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors">
                    <span className="text-lg mb-2 block">⚖️</span>
                    <h4 className="text-xs font-bold text-slate-800 mb-1">Weighed Pros & Cons</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Interactive sheets where custom user inputs recalculate overall scores instantly.</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors">
                    <span className="text-lg mb-2 block">📊</span>
                    <h4 className="text-xs font-bold text-slate-800 mb-1">Criteria Matrix</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Dynamic grid analyzing critical dimensions like stress, finance, and risks side-by-side.</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors">
                    <span className="text-lg mb-2 block">🎯</span>
                    <h4 className="text-xs font-bold text-slate-800 mb-1">SWOT Grid</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Full internal Strengths/Weaknesses and external Opportunities/Threats per option.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Render Dashboard with analyzed decision */}
            {!analyzing && analysis && (
              <motion.div
                key="analysis-dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                
                {/* Top Section: The Verdict & Recommendation Card */}
                <div id="verdict-card" className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl shadow-indigo-900/10 relative overflow-hidden">
                  {/* Ambient graphic background circles */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

                  {/* Header Title with Dilemma description */}
                  <div className="mb-6 relative z-10">
                    <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">
                      <Sparkles className="w-3.5 h-3.5" /> The Tiebreaker Verdict
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{analysis.title}</h2>
                    {analysis.description && (
                      <p className="text-xs text-indigo-100/70 mt-2 font-normal line-clamp-2 italic leading-relaxed">
                        "{analysis.description}"
                      </p>
                    )}
                  </div>

                  {/* Recommendation block & Gauge */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center relative z-10 pt-4 border-t border-white/10">
                    
                    {/* Gauge Column */}
                    <div className="col-span-1 flex flex-col items-center justify-center text-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        {/* Circular progress bar background */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="56"
                            cy="56"
                            r="48"
                            stroke="rgba(255, 255, 255, 0.08)"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r="48"
                            stroke="#6366f1"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={301.6}
                            strokeDashoffset={301.6 - (301.6 * analysis.verdict.confidence) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-extrabold tracking-tight">{analysis.verdict.confidence}%</span>
                          <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Confidence</span>
                        </div>
                      </div>
                    </div>

                    {/* Explanation details Column */}
                    <div className="md:col-span-3 space-y-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md">
                          Core Recommendation
                        </span>
                        <h3 className="text-lg font-extrabold tracking-tight mt-1.5 text-white leading-snug">
                          {analysis.verdict.recommendation}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {analysis.verdict.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Saving dilemma control */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
                    <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      Add custom Pros/Cons below to automatically adjust score weights.
                    </div>
                    
                    <button
                      id="save-dilemma-btn"
                      onClick={handleSaveDilemma}
                      className="text-xs bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl border border-indigo-400/30 transition-all shadow-md shadow-indigo-950/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Dilemma to History
                    </button>
                  </div>
                </div>

                {/* Main Tabs Selection */}
                <div className="flex border-b border-slate-200 gap-1.5 overflow-x-auto pb-px">
                  <button
                    id="tab-balance-btn"
                    onClick={() => setActiveTab('balance')}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                      activeTab === 'balance'
                        ? 'border-indigo-600 text-indigo-600 font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Scale className="w-4 h-4" /> ⚖️ Balance Sheet
                  </button>
                  <button
                    id="tab-matrix-btn"
                    onClick={() => setActiveTab('matrix')}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                      activeTab === 'matrix'
                        ? 'border-indigo-600 text-indigo-600 font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Layers className="w-4 h-4" /> 📊 Comparison Matrix
                  </button>
                  <button
                    id="tab-swot-btn"
                    onClick={() => setActiveTab('swot')}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                      activeTab === 'swot'
                        ? 'border-indigo-600 text-indigo-600 font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" /> 🎯 SWOT Analysis
                  </button>
                  <button
                    id="tab-biases-btn"
                    onClick={() => setActiveTab('biases')}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                      activeTab === 'biases'
                        ? 'border-indigo-600 text-indigo-600 font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" /> 🧠 Cognitive Traps
                  </button>
                </div>

                {/* Tab Views Content */}
                <div id="tab-content" className="min-h-[400px]">
                  
                  {/* TAB 1: BALANCE SHEET (PROS & CONS) */}
                  {activeTab === 'balance' && (
                    <div className="space-y-6">
                      
                      {/* Interactive score summary cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysis.options.map((optionName, idx) => {
                          const score = calculateOptionScore(optionName);
                          const isPositive = score >= 0;
                          return (
                            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Option {idx+1} Score</span>
                                <h4 className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{optionName}</h4>
                              </div>
                              <div className="text-right">
                                <div className={`text-2xl font-black ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                                  {isPositive ? `+${score}` : score}
                                </div>
                                <span className="text-[9px] text-slate-400 font-medium">Weighted Balance</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Side-by-side Columns of Pros and Cons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {analysis.options.map((optionName, optIdx) => {
                          const pros = allProsCons.filter(item => item.option === optionName && item.type === 'pro');
                          const cons = allProsCons.filter(item => item.option === optionName && item.type === 'con');

                          return (
                            <div key={optIdx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                              <div className="border-b border-slate-100 pb-3">
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  Option {optIdx+1}
                                </span>
                                <h3 className="text-base font-extrabold text-slate-800 mt-1">{optionName}</h3>
                              </div>

                              {/* Pros */}
                              <div className="space-y-2.5">
                                <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                                  <span>▲</span> Pros ({pros.length})
                                </h4>
                                {pros.length === 0 ? (
                                  <p className="text-xs text-slate-400 italic">No pros cataloged.</p>
                                ) : (
                                  pros.map((item) => (
                                    <div key={item.id} className="group/item bg-emerald-50/40 hover:bg-emerald-50 border border-emerald-100/50 hover:border-emerald-200 rounded-xl p-3 text-left transition-all">
                                      <div className="flex items-start justify-between gap-1.5">
                                        <div className="font-bold text-xs text-emerald-900 leading-tight flex-1">
                                          {item.title}
                                          <span className="text-[9px] bg-emerald-100/70 text-emerald-800 ml-2 px-1.5 py-0.5 rounded font-semibold align-middle">
                                            +{item.weight}
                                          </span>
                                        </div>
                                        {item.id.startsWith('custom') && (
                                          <button
                                            onClick={() => handleDeleteCustomProCon(item.id)}
                                            className="text-slate-400 hover:text-rose-500 p-0.5 rounded cursor-pointer opacity-0 group-hover/item:opacity-100 transition-all"
                                            title="Delete custom item"
                                          >
                                            <X className="w-3 h-3" />
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-emerald-850/80 mt-1 font-normal leading-relaxed">{item.description}</p>
                                      {item.category && (
                                        <span className="text-[9px] text-slate-400 bg-white/75 mt-1.5 inline-block px-1.5 py-0.5 rounded border border-slate-200/50">
                                          {item.category}
                                        </span>
                                      )}
                                    </div>
                                  ))
                                )}
                              </div>

                              {/* Cons */}
                              <div className="space-y-2.5 pt-2">
                                <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                                  <span>▼</span> Cons ({cons.length})
                                </h4>
                                {cons.length === 0 ? (
                                  <p className="text-xs text-slate-400 italic">No cons cataloged.</p>
                                ) : (
                                  cons.map((item) => (
                                    <div key={item.id} className="group/item bg-rose-50/40 hover:bg-rose-50 border border-rose-100/50 hover:border-rose-200 rounded-xl p-3 text-left transition-all">
                                      <div className="flex items-start justify-between gap-1.5">
                                        <div className="font-bold text-xs text-rose-900 leading-tight flex-1">
                                          {item.title}
                                          <span className="text-[9px] bg-rose-100/70 text-rose-800 ml-2 px-1.5 py-0.5 rounded font-semibold align-middle">
                                            -{item.weight}
                                          </span>
                                        </div>
                                        {item.id.startsWith('custom') && (
                                          <button
                                            onClick={() => handleDeleteCustomProCon(item.id)}
                                            className="text-slate-400 hover:text-rose-500 p-0.5 rounded cursor-pointer opacity-0 group-hover/item:opacity-100 transition-all"
                                            title="Delete custom item"
                                          >
                                            <X className="w-3 h-3" />
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-rose-850/80 mt-1 font-normal leading-relaxed">{item.description}</p>
                                      {item.category && (
                                        <span className="text-[9px] text-slate-400 bg-white/75 mt-1.5 inline-block px-1.5 py-0.5 rounded border border-slate-200/50">
                                          {item.category}
                                        </span>
                                      )}
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Custom consideration form */}
                      <div id="add-custom-procon-form" className="bg-slate-100/80 rounded-2xl border border-slate-200/60 p-5">
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1">
                          <PlusCircle className="w-4 h-4 text-indigo-500" /> Weigh Your Personal Inputs
                        </h3>
                        <p className="text-[11px] text-slate-400 mb-4 font-normal">
                          Did the AI miss a highly specific personal factor? Add your own customized pro or con below, assign an impact score (1-5), and watch the overall balances recalculate instantly!
                        </p>

                        <form onSubmit={handleAddCustomProCon} className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
                          
                          {/* Option Toggle */}
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Option</label>
                            <select
                              value={newPcOption}
                              onChange={(e) => setNewPcOption(e.target.value)}
                              className="w-full text-xs p-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              {analysis.options.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          {/* Pro vs Con Toggle */}
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Type</label>
                            <select
                              value={newPcType}
                              onChange={(e) => setNewPcType(e.target.value as 'pro' | 'con')}
                              className="w-full text-xs p-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                            >
                              <option value="pro">Pro (+)</option>
                              <option value="con">Con (-)</option>
                            </select>
                          </div>

                          {/* Title */}
                          <div className="sm:col-span-4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Short Consideration Point</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. My spouse's absolute dream backyard"
                              value={newPcTitle}
                              onChange={(e) => setNewPcTitle(e.target.value)}
                              className="w-full text-xs p-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>

                          {/* Category */}
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
                            <select
                              value={newPcCategory}
                              onChange={(e) => setNewPcCategory(e.target.value)}
                              className="w-full text-xs p-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              <option value="Personal">Personal</option>
                              <option value="Financial">Financial</option>
                              <option value="Career">Career</option>
                              <option value="Lifestyle">Lifestyle</option>
                              <option value="Social">Social</option>
                              <option value="Risk">Risk</option>
                              <option value="Health">Health</option>
                            </select>
                          </div>

                          {/* Weight */}
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Weight / Impact (1 to 5)</label>
                            <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                              {[1, 2, 3, 4, 5].map((val) => (
                                <button
                                  type="button"
                                  key={val}
                                  onClick={() => setNewPcWeight(val)}
                                  className={`w-6 h-6 rounded-lg text-xs font-black transition-all ${
                                    newPcWeight === val
                                      ? 'bg-indigo-600 text-white shadow-sm'
                                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Description */}
                          <div className="sm:col-span-6">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Description (Optional Detail)</label>
                            <input
                              type="text"
                              placeholder="Add a brief reason why this point weighs so heavily..."
                              value={newPcDesc}
                              onChange={(e) => setNewPcDesc(e.target.value)}
                              className="w-full text-xs p-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>

                          {/* Submit button */}
                          <div className="sm:col-span-3">
                            <button
                              id="add-custom-procon-btn"
                              type="submit"
                              className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs py-2 px-3 rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> Inject Consideration
                            </button>
                          </div>

                        </form>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: COMPARISON MATRIX */}
                  {activeTab === 'matrix' && (
                    <div className="space-y-6">
                      
                      {/* Matrix description & dynamic calculations */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                          <h3 className="text-sm font-bold text-slate-800">Criteria Comparison Grid</h3>
                          <span className="text-[11px] text-slate-400">Scale: 1 (Poor) to 5 (Excellent)</span>
                        </div>

                        {/* Responsive Matrix Grid */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                              <tr className="border-b border-slate-100">
                                <th className="py-3 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4">Evaluation Criterion</th>
                                <th className="py-3 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider text-center w-12">Imp</th>
                                {analysis.options.map((opt, i) => (
                                  <th key={i} className="py-3 px-4 text-xs font-extrabold text-slate-800 uppercase tracking-wider text-center w-1/3">
                                    {opt}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {analysis.criteria && analysis.criteria.map((crit, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                  {/* Criterion details */}
                                  <td className="py-4 px-2">
                                    <div className="text-xs font-bold text-slate-800">{crit.criterion}</div>
                                    <div className="text-[10px] text-slate-400 font-normal mt-0.5 max-w-[200px] leading-relaxed">
                                      {crit.description}
                                    </div>
                                  </td>
                                  
                                  {/* Importance Rating */}
                                  <td className="py-4 px-2 text-center">
                                    <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100/50">
                                      {crit.importance}
                                    </span>
                                  </td>

                                  {/* Option Score cells */}
                                  {analysis.options.map((optionName, optIdx) => {
                                    const score = crit.optionScores[optionName] || 0;
                                    const detail = crit.optionDetails[optionName] || '';
                                    
                                    // Map color depending on score
                                    let scoreColor = 'bg-slate-100 text-slate-600';
                                    if (score >= 4) scoreColor = 'bg-emerald-100 text-emerald-800 border border-emerald-200/50';
                                    else if (score <= 2) scoreColor = 'bg-rose-100 text-rose-800 border border-rose-200/50';

                                    return (
                                      <td key={optIdx} className="py-4 px-4 align-top">
                                        <div className="flex flex-col items-center">
                                          <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center ${scoreColor}`}>
                                            {score}
                                          </div>
                                          
                                          {/* Visual bar graph block */}
                                          <div className="w-full max-w-[120px] bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                            <div 
                                              className={`h-full ${score >= 4 ? 'bg-emerald-500' : score <= 2 ? 'bg-rose-500' : 'bg-slate-400'}`} 
                                              style={{ width: `${(score / 5) * 100}%` }}
                                            />
                                          </div>

                                          {detail && (
                                            <p className="text-[10px] text-slate-500 text-center font-normal leading-relaxed mt-2 italic max-w-[150px]">
                                              "{detail}"
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}

                              {/* Weighted Score Totals Footer Row */}
                              <tr className="bg-indigo-50/50 font-bold border-t-2 border-indigo-100">
                                <td className="py-4 px-2 text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
                                  Weighted Average Score
                                </td>
                                <td className="py-4 px-2 text-center text-slate-400">
                                  —
                                </td>
                                {analysis.options.map((optionName, idx) => {
                                  const totalScore = calculateWeightedMatrixScore(optionName);
                                  return (
                                    <td key={idx} className="py-4 px-4 text-center">
                                      <div className="text-xl font-black text-indigo-950">{totalScore} <span className="text-xs text-slate-400">/ 5.0</span></div>
                                      <span className="text-[9px] text-indigo-600 uppercase tracking-widest font-bold">Weighted Sum</span>
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 3: SWOT ANALYSIS */}
                  {activeTab === 'swot' && (
                    <div className="space-y-6">
                      
                      {/* Interactive tabs to toggle SWOT per option */}
                      <div className="flex bg-slate-100 p-1 rounded-xl w-fit gap-1">
                        {analysis.options.map((optionName, i) => (
                          <button
                            key={i}
                            id={`swot-opt-toggle-${i}`}
                            onClick={() => setSwotActiveOption(optionName)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              swotActiveOption === optionName
                                ? 'bg-white text-indigo-600 shadow-sm font-extrabold'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {optionName}
                          </button>
                        ))}
                      </div>

                      {/* SWOT Matrix Block */}
                      {analysis.swot && analysis.swot[swotActiveOption] ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* S: Strengths */}
                          <div className="bg-emerald-50/40 border border-emerald-200/50 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center space-x-2 text-emerald-800 mb-3">
                              <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center">S</span>
                              <h3 className="text-sm font-black uppercase tracking-wider">Strengths</h3>
                            </div>
                            <ul className="space-y-2">
                              {analysis.swot[swotActiveOption].strengths.map((item, idx) => (
                                <li key={idx} className="text-xs text-slate-700 font-normal leading-relaxed flex items-start gap-1.5">
                                  <span className="text-emerald-500 font-bold mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* W: Weaknesses */}
                          <div className="bg-amber-50/40 border border-amber-200/50 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center space-x-2 text-amber-800 mb-3">
                              <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center">W</span>
                              <h3 className="text-sm font-black uppercase tracking-wider">Weaknesses</h3>
                            </div>
                            <ul className="space-y-2">
                              {analysis.swot[swotActiveOption].weaknesses.map((item, idx) => (
                                <li key={idx} className="text-xs text-slate-700 font-normal leading-relaxed flex items-start gap-1.5">
                                  <span className="text-amber-500 font-bold mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* O: Opportunities */}
                          <div className="bg-sky-50/40 border border-sky-200/50 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center space-x-2 text-sky-800 mb-3">
                              <span className="w-6 h-6 rounded-lg bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center">O</span>
                              <h3 className="text-sm font-black uppercase tracking-wider">Opportunities</h3>
                            </div>
                            <ul className="space-y-2">
                              {analysis.swot[swotActiveOption].opportunities.map((item, idx) => (
                                <li key={idx} className="text-xs text-slate-700 font-normal leading-relaxed flex items-start gap-1.5">
                                  <span className="text-sky-500 font-bold mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* T: Threats */}
                          <div className="bg-rose-50/40 border border-rose-200/50 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center space-x-2 text-rose-800 mb-3">
                              <span className="w-6 h-6 rounded-lg bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center">T</span>
                              <h3 className="text-sm font-black uppercase tracking-wider">Threats</h3>
                            </div>
                            <ul className="space-y-2">
                              {analysis.swot[swotActiveOption].threats.map((item, idx) => (
                                <li key={idx} className="text-xs text-slate-700 font-normal leading-relaxed flex items-start gap-1.5">
                                  <span className="text-rose-500 font-bold mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No SWOT analysis generated for this option.</p>
                      )}

                    </div>
                  )}

                  {/* TAB 4: COGNITIVE BIASES */}
                  {activeTab === 'biases' && (
                    <div className="space-y-6">
                      
                      <div className="bg-amber-50/50 border border-amber-200 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-start space-x-3.5 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-5.5 h-5.5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-amber-900 leading-tight">Mental Traps & Cognitive Defenses</h3>
                            <p className="text-xs text-amber-850/80 mt-1 font-normal leading-relaxed">
                              Decisions are rarely purely logical. We are often unconsciously sabotaged by internal heuristics. Check if the following biases are twisting your decision making here:
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {analysis.verdict.cognitiveBiases && analysis.verdict.cognitiveBiases.map((bias, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-all shadow-sm">
                              <div className="flex items-center space-x-2 text-indigo-900 mb-2.5">
                                <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center">
                                  {idx+1}
                                </span>
                                <h4 className="text-xs font-extrabold tracking-tight uppercase">{bias.name}</h4>
                              </div>
                              
                              <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                                <strong className="text-slate-800">How it manifests:</strong> {bias.description}
                              </p>

                              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-start gap-2 text-left">
                                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="text-[11px] text-slate-700 font-medium">
                                  <strong className="text-slate-900 font-bold block mb-0.5">Countering Advice:</strong>
                                  {bias.advice}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                {/* Bottom Section: Personal reflections journal / Action Steps Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-slate-200">
                  
                  {/* Action checklist (7 Columns) */}
                  <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> Action Steps to Break the Deadlock
                    </h3>
                    <p className="text-xs text-slate-400 mb-4 font-normal">
                      Immediate actions you should take right now to solidify your next moves:
                    </p>
                    <div className="space-y-2.5">
                      {analysis.verdict.actionSteps && analysis.verdict.actionSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-slate-100">
                          <input
                            type="checkbox"
                            id={`step-chk-${idx}`}
                            className="w-4.5 h-4.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor={`step-chk-${idx}`} className="text-xs text-slate-700 font-medium leading-relaxed select-none cursor-pointer">
                            {step}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal diary/Notes section (5 Columns) */}
                  <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-indigo-500" /> Personal Thoughts Journal
                      </h3>
                      <p className="text-xs text-slate-400 mb-3 font-normal">
                        Jot down updates, feelings, and details as they develop. These will be securely bundled inside your history log!
                      </p>
                      <textarea
                        id="user-diary-notes"
                        rows={5}
                        placeholder="e.g., Talked to Sarah and she is super enthusiastic about option A. Need to review budget figures on Friday..."
                        value={userNotes}
                        onChange={(e) => setUserNotes(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 resize-none"
                      />
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end">
                      <button
                        id="save-journal-btn"
                        onClick={handleSaveDilemma}
                        className="text-xs bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold py-2 px-4 rounded-xl shadow transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Reflection Journal
                      </button>
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 px-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Scale className="w-4.5 h-4.5 text-indigo-500" />
            <span className="font-semibold text-slate-300">The Tiebreaker</span>
            <span>— Your Elite Decision-Making Co-Pilot</span>
          </div>
          <div className="text-[11px] text-slate-500 font-normal">
            Designed for deep balance, rational mapping, and mitigation of cognitive bias. Powered by Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
}
