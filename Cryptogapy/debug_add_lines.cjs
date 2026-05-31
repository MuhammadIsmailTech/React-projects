const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('src/components/CryptoTable.jsx', 'utf8');
const lines = code.split('\n');
const beforeDesktop = lines.slice(0, 61); // up to but excluding the desktop wrapper line
for (let i = 61; i <= lines.length; i++) {
  const text = beforeDesktop.concat(lines.slice(61, i)).join('\n');
  try {
    parser.parse(text, { sourceType: 'module', plugins: ['jsx'] });
    // still valid
  } catch (err) {
    console.log('failed when adding up to line', i, 'line text:', lines[i-1]);
    console.log(err.message);
    process.exit(0);
  }
}
console.log('still valid after adding all desktop lines');
