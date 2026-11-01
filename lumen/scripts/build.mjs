import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'project', 'components');
const shim = (name) => path.join(root, 'src', 'shims', name);

const COMPONENTS = [
  'Button', 'SegmentedControl', 'Input', 'Switch', 'Card', 'Badge', 'Avatar', 'Callout', 'Progress',
  'TaskCard', 'Board', 'StatTile', 'AgentMessage', 'ToolCall', 'RunTimeline', 'Composer', 'CodeBlock',
  'BarChart', 'LineChart', 'FlowDiagram',
];

async function bundle() {
  const result = await build({
    entryPoints: [path.join(root, 'src', 'entry.ts')],
    bundle: true,
    write: false,
    format: 'iife',
    minify: true,
    target: 'es2020',
    jsx: 'automatic',
    legalComments: 'none',
    define: { 'process.env.NODE_ENV': '"production"' },
    alias: {
      react: shim('react.cjs'),
      'react/jsx-runtime': shim('jsx-runtime.cjs'),
      'react/jsx-dev-runtime': shim('jsx-runtime.cjs'),
      'react-dom': shim('react-dom.cjs'),
    },
  });
  // consumers inline the bundle, so these sequences would end the script element early
  const code = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '\\x3C!--');
  const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: 'Lumen', components: COMPONENTS.map((name) => ({ name })) })} */\n`;
  writeFileSync(path.join(out, 'bundle.js'), header + code);
  return code.length;
}

function types() {
  const tmp = path.join(root, 'dist', 'types');
  execFileSync(path.join(root, 'node_modules', '.bin', 'tsc'), ['--declaration', '--emitDeclarationOnly', '--noEmit', 'false', '--outDir', tmp], { cwd: root });
  const body = COMPONENTS.map((name) => {
    const text = readFileSync(path.join(tmp, 'components', `${name}.d.ts`), 'utf8');
    return text.split('\n').filter((line) => !line.startsWith('import ') && !line.startsWith('export {}')).join('\n').trim();
  });
  const head = readFileSync(path.join(root, 'src', 'types-header.d.ts'), 'utf8');
  writeFileSync(path.join(out, 'index.d.ts'), `${head.trim()}\n\n${body.join('\n\n')}\n`);
}

mkdirSync(out, { recursive: true });
const size = await bundle();
types();
console.log(`bundle.js ${(size / 1024).toFixed(1)} KB, ${readdirSync(out).length} entries in project/components`);
