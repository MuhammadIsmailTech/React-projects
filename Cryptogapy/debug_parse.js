const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('src/components/CryptoTable.jsx', 'utf8');

try {
  parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
  console.log('OK');
} catch (err) {
  console.error(err.message);
  if (err.loc) {
    const lines = code.split('\n');
    const { line, column } = err.loc;
    console.error('error line', line, 'column', column);
    const start = Math.max(0, line - 3);
    const end = Math.min(lines.length, line + 2);
    for (let i = start; i < end; i++) {
      console.error(`${i + 1}: ${lines[i]}`);
    }
  }
  process.exit(1);
}
