// Local check only: the published page compiles tokens.css itself and preloads the same files.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const project = path.join(root, 'project');
const outDir = process.argv[2] ?? path.join(root, 'dist', 'shots');
mkdirSync(outDir, { recursive: true });

function tokensCss() {
  const t = JSON.parse(readFileSync(path.join(project, 'tokens.json'), 'utf8'));
  const [first, ...rest] = t.color.themes.map((theme) => theme.id);
  const themed = [...t.color.tokens, ...(t.shadow?.tokens ?? [])];
  const value = (token, theme) => (typeof token.value === 'string' ? token.value : token.value[theme] ?? token.value[first]);
  const block = (theme) => themed.map((token) => `  --${token.name}: ${value(token, theme)};`).join('\n');
  const flat = ['spacing', 'radius', 'blur'].flatMap((family) => t[family]?.tokens ?? []).map((token) => `  --${token.name}: ${token.value};`);
  const fonts = Object.entries(t.type.families).map(([key, stack]) => `  --font-${key}: ${stack};`);
  return [`:root, [data-theme="${first}"] {\n${block(first)}\n}`, ...rest.map((theme) => `[data-theme="${theme}"] {\n${block(theme)}\n}`), `:root {\n${[...flat, ...fonts].join('\n')}\n}`].join('\n');
}

const head = [
  `<style>${tokensCss()}</style>`,
  `<style>${readFileSync(path.join(project, 'components', 'bundle.css'), 'utf8')}</style>`,
  `<script>${readFileSync(path.join(root, 'node_modules/react/umd/react.production.min.js'), 'utf8')}</script>`,
  `<script>${readFileSync(path.join(root, 'node_modules/react-dom/umd/react-dom.production.min.js'), 'utf8')}</script>`,
  `<script>${readFileSync(path.join(project, 'components', 'bundle.js'), 'utf8')}</script>`,
].join('\n');

const only = process.argv[3]?.split(',');
const names = readdirSync(path.join(project, 'components'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'lib' && (!only || only.includes(d.name))).map((d) => d.name);

const browser = await chromium.launch();
for (const theme of ['light', 'dark']) {
  const page = await browser.newPage({ viewport: { width: 960, height: 300 }, deviceScaleFactor: 1 });
  for (const name of names) {
    const errors = [];
    page.removeAllListeners('pageerror');
    page.removeAllListeners('console');
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errors.push(m.text()));
    const html = readFileSync(path.join(project, 'components', name, 'preview.html'), 'utf8')
      .replace('<html>', `<html data-theme="${theme}">`).replace('<head>', () => `<head>\n${head}`);
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(outDir, `${name}-${theme}.png`), fullPage: true });
    const text = (await page.textContent('body'))?.trim().length ?? 0;
    console.log(`${theme.padEnd(5)} ${name.padEnd(18)} text=${text}${errors.length ? ' ERR ' + errors.join(' | ') : ''}`);
  }
  await page.close();
}
await browser.close();
