import fs from 'fs';

const src = fs.readFileSync(
  '/home/z/my-project/src/components/home/PlacementRadar.tsx',
  'utf-8'
);

// The dataset is the object literal assigned to branchDataset (lines up to the
// closing `};` before `const branchKeys`).
const start = src.indexOf('const branchDataset: Record<string, BranchConfig> = {');
const end = src.indexOf('};', start);
const literal = src
  .slice(src.indexOf('{', start), end + 1)
  .replace(/\bBranchConfig\b/g, '')
  .trim();

const data = eval(`(${literal})`);
await Bun.write('/home/z/my-project/content/pages/radar.json', JSON.stringify(data, null, 2));
console.log('Radar branches extracted:', Object.keys(data).join(', '));
