const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('src/components/CryptoTable.jsx', 'utf8');
const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'], errorRecovery: true });
console.log('errors', ast.errors.length);
ast.errors.forEach((err, idx) => {
  console.error(idx + 1, err.message, err.loc);
});
