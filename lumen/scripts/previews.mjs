import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const page = ({ name, group, height, width, subtitle, script, layout = 'row' }) => `<!-- @dsCard group="${group}" height=${height}${width ? ` width=${width}` : ''} subtitle="${subtitle}" -->
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${name} — preview</title>
<style>
  body { padding: 20px; background: var(--canvas); }
  .pv-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
  .pv-col { display: flex; flex-direction: column; gap: 16px; max-width: 680px; }
  .pv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
</style>
</head>
<body>
<div id="root" class="pv-${layout}"></div>
<script>
  var L = window.Lumen, h = React.createElement;
${script.trim().split('\n').map((line) => `  ${line}`).join('\n')}
</script>
</body>
</html>
`;

const mount = 'ReactDOM.createRoot(document.getElementById("root")).render';

const previews = [
  {
    name: 'Button', group: 'Actions', height: 120, subtitle: 'Primary, secondary, ghost, danger; three sizes and icon',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Button, { variant: 'primary' }, 'Start run'),
  h(L.Button, null, 'View log'),
  h(L.Button, { variant: 'ghost' }, 'Cancel'),
  h(L.Button, { variant: 'danger' }, 'Stop agent'),
  h(L.Button, { variant: 'primary', loading: true }, 'Deploying'),
  h(L.Button, { size: 'sm' }, 'Small'),
  h(L.Button, { size: 'lg', variant: 'primary' }, 'Large')
));`,
  },
  {
    name: 'SegmentedControl', group: 'Actions', height: 100, subtitle: 'View switch with a sliding thumb',
    script: `
${mount}(h(React.Fragment, null,
  h(L.SegmentedControl, { 'aria-label': 'View', options: [{ value: 'board', label: 'Board' }, { value: 'list', label: 'List' }, { value: 'timeline', label: 'Timeline' }] }),
  h(L.SegmentedControl, { size: 'sm', defaultValue: '7d', 'aria-label': 'Range', options: [{ value: '24h', label: '24h' }, { value: '7d', label: '7d' }, { value: '30d', label: '30d' }] })
));`,
  },
  {
    name: 'Input', group: 'Forms', height: 200, subtitle: 'Label, hint and error states', layout: 'grid',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Input, { label: 'Task title', placeholder: 'Add retry to the log ingester', hint: 'Use a verb first.' }),
  h(L.Input, { label: 'Budget', defaultValue: '1200', trailing: 'tokens', error: 'Budget must be 2,000 tokens or more.' })
));`,
  },
  {
    name: 'Switch', group: 'Forms', height: 140, subtitle: 'Settings toggle with label and description', layout: 'col',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Switch, { defaultChecked: true, label: 'Auto-approve read-only tools', description: 'The agent runs grep, read and list without a prompt.' }),
  h(L.Switch, { label: 'Allow network access', description: 'Off by default for every new run.' })
));`,
  },
  {
    name: 'Card', group: 'Surfaces', height: 300, subtitle: 'Solid, glass and inset', layout: 'grid',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Card, { title: 'Sprint 42', description: '12 of 18 tasks done' }, h(L.Progress, { value: 67, label: 'Scope' })),
  h('div', { style: { position: 'relative', overflow: 'hidden', padding: 16, borderRadius: 24, background: 'var(--accent-soft)' } },
    h('span', { style: { position: 'absolute', width: 96, height: 96, right: 12, top: -20, borderRadius: 9999, background: 'var(--chart-2)' } }),
    h('span', { style: { position: 'absolute', width: 140, height: 44, left: 20, bottom: 10, borderRadius: 9999, background: 'var(--accent)' } }),
    h(L.Card, { variant: 'glass', title: 'Glass panel', description: 'Floating bars and the composer only.' })),
  h(L.Card, { variant: 'inset', title: 'Inset well', description: 'Groups content inside a card.' })
));`,
  },
  {
    name: 'Badge', group: 'Feedback', height: 88, subtitle: 'Five tones, each with a word',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Badge, null, 'Draft'),
  h(L.Badge, { tone: 'accent', dot: true }, 'Running'),
  h(L.Badge, { tone: 'success', dot: true }, 'Merged'),
  h(L.Badge, { tone: 'warning', dot: true }, 'Needs input'),
  h(L.Badge, { tone: 'danger', dot: true }, 'Blocked')
));`,
  },
  {
    name: 'Avatar', group: 'Feedback', height: 88, subtitle: 'Human initials or agent glyph',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Avatar, { name: 'Lam Tran' }),
  h(L.Avatar, { name: 'planner-agent', kind: 'agent' }),
  h(L.Avatar, { name: 'Mai Pham', size: 'sm' }),
  h(L.Avatar, { name: 'review-agent', kind: 'agent', size: 'sm' })
));`,
  },
  {
    name: 'Callout', group: 'Guide book', height: 280, subtitle: 'In short, Good to know, Watch out', layout: 'col',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Callout, { kind: 'in-short' }, 'Metrics count events. Traces show the path of one request.'),
  h(L.Callout, { kind: 'good-to-know' }, 'Sample traces at 10% when traffic is above 2,000 req/s.'),
  h(L.Callout, { kind: 'watch-out' }, 'A label with user IDs creates one time series for each user.')
));`,
  },
  {
    name: 'Progress', group: 'Feedback', height: 150, subtitle: 'Animated bar in four tones', layout: 'col',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Progress, { value: 64, label: 'Context window' }),
  h(L.Progress, { value: 92, label: 'Token budget', tone: 'warning' }),
  h(L.Progress, { value: 100, label: 'Tests', tone: 'success', size: 'sm' })
));`,
  },
  {
    name: 'TaskCard', group: 'Work tracking', height: 200, subtitle: 'One task with status, owner and progress', layout: 'grid',
    script: `
${mount}(h(React.Fragment, null,
  h(L.TaskCard, { onOpen: function () {}, task: { id: 'CB-142', title: 'Stream tool output into the callboard', status: 'doing', priority: 'p1', tags: ['agent', 'ui'], progress: 60, assignee: { name: 'builder-agent', kind: 'agent' } } }),
  h(L.TaskCard, { task: { id: 'CB-139', title: 'Write the retry guide chapter', status: 'review', due: 'Nov 4', assignee: { name: 'Lam Tran' } } }),
  h(L.TaskCard, { task: { id: 'CB-131', title: 'Harness: sandbox escapes on file write', status: 'blocked', priority: 'p0', tags: ['security'] } })
));`,
  },
  {
    name: 'Board', group: 'Work tracking', height: 420, width: 1040, subtitle: 'Columns with WIP limits; cards animate between columns', layout: 'col',
    script: `
var tasks = [
  { id: 'CB-150', title: 'Add run cost to the summary', status: 'todo', tags: ['harness'] },
  { id: 'CB-142', title: 'Stream tool output into the callboard', status: 'doing', priority: 'p1', progress: 60, assignee: { name: 'builder-agent', kind: 'agent' } },
  { id: 'CB-144', title: 'Diff viewer for agent edits', status: 'doing', assignee: { name: 'Lam Tran' } },
  { id: 'CB-139', title: 'Write the retry guide chapter', status: 'review', due: 'Nov 4', assignee: { name: 'review-agent', kind: 'agent' } },
  { id: 'CB-120', title: 'Token budget per run', status: 'done', assignee: { name: 'Lam Tran' } }
];
function Demo() {
  var s = React.useState(tasks), list = s[0], set = s[1];
  var cols = [['todo', 'To do'], ['doing', 'In progress', 2], ['review', 'In review'], ['done', 'Done']];
  function advance(t) {
    var order = ['todo', 'doing', 'review', 'done'];
    var next = order[(order.indexOf(t.status) + 1) % order.length];
    set(list.map(function (x) { return x.id === t.id ? Object.assign({}, x, { status: next }) : x; }));
  }
  return h(L.Board, { onOpenTask: advance, columns: cols.map(function (c) {
    return { id: c[0], title: c[1], limit: c[2], tasks: list.filter(function (t) { return t.status === c[0]; }) };
  }) });
}
${mount}(h(Demo));`,
  },
  {
    name: 'StatTile', group: 'Data viz', height: 150, subtitle: 'Headline number, delta and sparkline', layout: 'grid',
    script: `
${mount}(h(React.Fragment, null,
  h(L.StatTile, { label: 'Runs today', value: '1,284', delta: 12, deltaLabel: 'vs yesterday', trend: [8, 10, 9, 13, 12, 15, 17] }),
  h(L.StatTile, { label: 'p95 latency', value: '412 ms', delta: 8, goodWhen: 'down', deltaLabel: 'vs last week', trend: [380, 360, 390, 400, 410, 405, 412] }),
  h(L.StatTile, { label: 'Open blockers', value: '3', delta: 0, deltaLabel: 'no change' })
));`,
  },
  {
    name: 'AgentMessage', group: 'AI agent', height: 330, subtitle: 'User, agent, system; streaming caret', layout: 'col',
    script: `
${mount}(h(React.Fragment, null,
  h(L.AgentMessage, { role: 'user', time: '09:41' }, 'Find why the ingest job failed last night.'),
  h(L.AgentMessage, { role: 'agent', author: 'ops-agent', time: '09:41' },
    h('p', null, 'The job hit the 512 MB memory limit at 02:14. I checked 3 log sources.'),
    h(L.ToolCall, { name: 'search_logs', status: 'success', summary: 'since 02:00, level=error', duration: '1.2 s' })),
  h(L.AgentMessage, { role: 'system' }, 'Run paused: waiting for approval'),
  h(L.AgentMessage, { role: 'agent', author: 'ops-agent', streaming: true }, 'I can raise the limit to 1 GB or split the batch')
));`,
  },
  {
    name: 'ToolCall', group: 'AI agent', height: 300, subtitle: 'Collapsible tool step with input and output', layout: 'col',
    script: `
${mount}(h(React.Fragment, null,
  h(L.ToolCall, { name: 'read_file', status: 'success', summary: 'src/ingest/worker.ts', duration: '84 ms', defaultOpen: true,
    input: '{ "path": "src/ingest/worker.ts", "lines": [40, 72] }', output: 'const BATCH = 50_000 // 512 MB at peak' }),
  h(L.ToolCall, { name: 'run_tests', status: 'running', summary: 'pnpm test ingest' }),
  h(L.ToolCall, { name: 'deploy', status: 'error', summary: 'staging', duration: '14 s', input: 'deploy --env staging', output: 'Error: approval required for env=staging' })
));`,
  },
  {
    name: 'RunTimeline', group: 'AI agent', height: 330, subtitle: 'Steps of one agent run', layout: 'col',
    script: `
${mount}(h(L.RunTimeline, { title: 'Run #318 · fix-ingest-oom', steps: [
  { id: '1', label: 'Plan', status: 'success', duration: '3 s', detail: 'Split into 4 steps; budget 40k tokens.' },
  { id: '2', label: 'Read code and logs', status: 'success', duration: '11 s' },
  { id: '3', label: 'Patch batch size', status: 'running', detail: 'Editing src/ingest/worker.ts' },
  { id: '4', label: 'Run tests', status: 'pending' },
  { id: '5', label: 'Open pull request', status: 'pending' }
] }));`,
  },
  {
    name: 'Composer', group: 'AI agent', height: 220, subtitle: 'Glass prompt box; Enter sends, Shift+Enter adds a line', layout: 'col',
    script: `
${mount}(h(React.Fragment, null,
  h(L.Composer, { placeholder: 'Ask ops-agent…', context: h(L.Badge, { tone: 'accent' }, 'repo: story-ui') }),
  h(L.Composer, { busy: true, defaultValue: 'Split the batch into 10k rows' })
));`,
  },
  {
    name: 'CodeBlock', group: 'Guide book', height: 200, subtitle: 'Filename header and copy button', layout: 'col',
    script: `
${mount}(h(L.CodeBlock, { filename: 'otel.config.ts', code: "export const sampler = new TraceIdRatioBasedSampler(0.1)\\n\\n// keep every error trace\\nexport const keepErrors = (span) => span.status.code === SpanStatusCode.ERROR" }));`,
  },
  {
    name: 'BarChart', group: 'Data viz', height: 300, subtitle: 'Single series; hover a bar for its value', layout: 'col',
    script: `
${mount}(h(L.BarChart, { title: 'Tasks closed per day', data: [
  { label: 'Mon', value: 6 }, { label: 'Tue', value: 9 }, { label: 'Wed', value: 4 }, { label: 'Thu', value: 11 },
  { label: 'Fri', value: 8 }, { label: 'Sat', value: 2 }, { label: 'Sun', value: 3 }
] }));`,
  },
  {
    name: 'LineChart', group: 'Data viz', height: 340, subtitle: 'Up to 5 series; crosshair tooltip and direct labels', layout: 'col',
    script: `
${mount}(h(L.LineChart, { title: 'Latency by service', unit: ' ms',
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  series: [
    { name: 'api', values: [120, 118, 160, 210, 190, 150, 130] },
    { name: 'ingest', values: [300, 280, 260, 340, 420, 380, 310] },
    { name: 'search', values: [80, 90, 110, 140, 120, 100, 90] }
  ] }));`,
  },
  {
    name: 'FlowDiagram', group: 'Data viz', height: 300, width: 880, subtitle: 'Agent harness flow; the active edge pulses', layout: 'col',
    script: `
${mount}(h(L.FlowDiagram, { title: 'Engineering harness',
  nodes: [
    { id: 'you', label: 'You', caption: 'task brief', kind: 'human', x: 0, y: 70 },
    { id: 'plan', label: 'planner-agent', caption: 'splits work', kind: 'agent', x: 220, y: 0 },
    { id: 'tools', label: 'Tool sandbox', caption: 'read, edit, test', kind: 'tool', x: 440, y: 0 },
    { id: 'gate', label: 'Review gate', caption: 'human approves', kind: 'gate', x: 440, y: 140 },
    { id: 'repo', label: 'Repository', caption: 'pull request', kind: 'store', x: 660, y: 140 }
  ],
  edges: [
    { from: 'you', to: 'plan', label: 'brief' },
    { from: 'plan', to: 'tools', active: true },
    { from: 'tools', to: 'gate', label: 'diff' },
    { from: 'gate', to: 'repo', label: 'merge' }
  ] }));`,
  },
];

for (const preview of previews) {
  const dir = path.join(root, 'project', 'components', preview.name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'preview.html'), page(preview));
}
console.log(`${previews.length} previews written`);
