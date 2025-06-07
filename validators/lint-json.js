const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('workflows');
let hasError = false;

files.forEach(file => {
const data = JSON.parse(fs.readFileSync(path.join('workflows', file)));
if (!data.name || !data.nodes) {
console.error(Invalid workflow file: ${file});
hasError = true;
}
});

if (hasError) {
process.exit(1);
} else {
console.log('✅ All workflow files are valid.');
}
