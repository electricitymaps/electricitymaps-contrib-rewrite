import * as fs from 'node:fs';
import * as path from 'node:path';

console.log('Generating index files...');

// Import generated zones file
const zones = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../config/zones.json'), 'utf8')
);

// Create list of paths to be used
const generalPaths = ['/map', '/faq'];
const zonePaths = Object.keys(zones).map((zone) => `/zone/${zone}`);
const allPaths = [...generalPaths, ...zonePaths];

// Generate index.html files for all paths
let filesGenerated = 0;
const indexHtml = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8');
for (const filePath of allPaths) {
  const dir = path.resolve(__dirname, `../dist${filePath}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const file = path.resolve(dir, 'index.html');
  if (!fs.existsSync(file)) {
    fs.writeFileSync(path.resolve(dir, 'index.html'), indexHtml);
    console.log(`Created index.html for ${filePath}`);
    filesGenerated++;
  }
}

console.log(`Generated ${filesGenerated} new files.`);
