const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('src/components/CryptoTable.jsx', 'utf8');
const lines = code.split('\n');
let lastValid = 0;
for (let i = 1; i <= lines.length; i++) {
  const text = lines.slice(0, i).join('\n');
  try {
    parser.parse(text, { sourceType: 'module', plugins: ['jsx'] });
    lastValid = i;
  } catch (err) {
    // invalid prefix
  }
}
console.log('last valid prefix line', lastValid);
console.log('next line', lastValid + 1, 'text:', lines[lastValid] || 'EOF');
