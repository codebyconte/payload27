import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';
const html = await readFile('dist/index.html', 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('Missing prerender root.');
await writeFile('dist/index.html', html.replace(marker, () => `<div id="root">${render()}</div>`));
await rm('.prerender', { recursive: true, force: true });
console.log('P27 page prerendered: visible content is available without JavaScript.');
