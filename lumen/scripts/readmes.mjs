import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const docs = {
  Button: `Button starts one action; use \`primary\` for the one main action in a view.

**Consumer provides:** \`children\` (a verb: "Start run"), \`onClick\`, and optional \`variant\`, \`size\`, \`leading\`, \`trailing\`, \`loading\`.

- Use one \`primary\` button in each view region. Use \`secondary\` for the others.
- Use \`danger\` only for an action that stops or deletes: "Stop agent", "Delete run".
- Use \`size="icon"\` with an \`aria-label\`. The icon button is a circle.
- Set \`loading\` while the action runs. The button keeps its width and blocks a second click.
- Do not add hover lift or scale. Hover changes the fill only. Press scales to 0.97.`,

  SegmentedControl: `SegmentedControl switches between 2 to 5 views of the same content.

**Consumer provides:** \`options\` (\`{ value, label }[]\`), \`value\` + \`onChange\` or \`defaultValue\`, and an \`aria-label\`.

- Use it for a view switch (Board, List, Timeline) or a time range (24h, 7d, 30d).
- The thumb slides with a spring. Do not use it for navigation between pages.
- Use \`size="sm"\` above charts.`,

  Input: `Input takes one line of text with a label, a hint and an error.

**Consumer provides:** \`label\`, native input props, and optional \`hint\`, \`error\`, \`leading\`, \`trailing\`.

- Always give a \`label\`. A placeholder is an example, not a label.
- Write the error as the fix: "Budget must be 2,000 tokens or more."
- The 1px outline uses \`control-border\` (3:1). Focus adds a \`focus\` ring with an \`accent-soft\` halo.`,

  Switch: `Switch turns one setting on or off and applies it immediately.

**Consumer provides:** \`checked\` + \`onChange\` or \`defaultChecked\`, and \`label\`; \`description\` is optional.

- Use a switch only for a setting that takes effect at once. Use a button for an action that needs a confirm step.
- Write the label as the "on" state: "Auto-approve read-only tools".`,

  Card: `Card groups related content on a surface; \`glass\` floats over content and \`inset\` sinks into a card.

**Consumer provides:** \`children\`, and optional \`title\`, \`description\`, \`actions\`, \`variant\`, \`padding\`, \`animateIn\`.

- Use \`solid\` for most content. It uses \`surface\` and \`shadow-ring\`.
- Use \`glass\` only for a layer that floats over other content: a sticky bar, a panel over a chart. Use one glass layer in each view.
- Use \`inset\` for a well inside a card. Do not nest a solid card in a solid card.
- Set \`animateIn\` for a card that appears after load, for example a new agent result.`,

  Badge: `Badge labels a status or a category with a short word.

**Consumer provides:** \`children\` (one or two words), \`tone\`, and optional \`dot\` or \`icon\`.

- Each tone must carry a word. Color alone never tells the status.
- Tones: \`neutral\` (draft, queued), \`accent\` (running), \`success\` (done), \`warning\` (needs input), \`danger\` (blocked, failed).`,

  Avatar: `Avatar shows who owns a task or a message: initials for a person, a robot glyph for an agent.

**Consumer provides:** \`name\`, and optional \`kind\` (\`human\` | \`agent\`) and \`size\`.

- Always set \`kind="agent"\` for an agent. A reader must tell agent work from human work at a glance.`,

  Callout: `Callout holds a short side note in a guide book: In short, Good to know or Watch out.

**Consumer provides:** \`kind\` and \`children\` (3 sentences or fewer); \`title\` overrides the default title.

- Use 3 callouts or fewer in each document.
- A callout never repeats the body text.
- \`in-short\` gives the answer for a reader who scans. \`good-to-know\` gives a useful fact. \`watch-out\` gives a risk and its cause.`,

  Progress: `Progress shows how much of a known total is done.

**Consumer provides:** \`value\` (0–100), and optional \`label\`, \`showValue\`, \`tone\`, \`size\`.

- Use \`warning\` above 85% of a budget (tokens, context window). Use \`danger\` at the limit.
- For unknown duration, use a \`running\` status icon, not a progress bar.`,

  TaskCard: `TaskCard shows one work item: ID, title, priority, status, owner and optional progress.

**Consumer provides:** \`task\` (\`{ id, title, status?, priority?, assignee?, tags?, due?, progress? }\`), optional \`onOpen\` and \`compact\`.

- The card validates \`task\` with zod. An invalid task renders an error line, not a blank card.
- Set \`assignee.kind\` to \`agent\` for agent-owned work.
- Hover raises the shadow from \`shadow-ring\` to \`shadow-raised\`. It does not move the card.`,

  Board: `Board lays out task columns; cards animate to their new column when their status changes.

**Consumer provides:** \`columns\` (\`{ id, title, tasks, limit? }[]\`) and optional \`onOpenTask\`.

- Set \`limit\` for a WIP limit. The count turns \`danger\` when the column is over its limit.
- Keep the task \`id\` stable. The move animation uses it.
- The board scrolls sideways below 4 × 232px.`,

  StatTile: `StatTile shows one headline number with its change and a 7-point sparkline.

**Consumer provides:** \`label\`, \`value\` (formatted string), and optional \`delta\` (%), \`deltaLabel\`, \`goodWhen\`, \`trend\`.

- Set \`goodWhen="down"\` for latency, cost and error counts. The delta color follows the meaning, not the sign.
- The delta always shows an arrow and a sign, so color is never the only cue.`,

  AgentMessage: `AgentMessage shows one turn in a conversation with an agent: user, agent or system.

**Consumer provides:** \`role\`, \`children\`, and optional \`author\`, \`time\`, \`streaming\`.

- The user bubble is \`accent-soft\` on the right. The agent bubble is \`surface\` on the left with the agent avatar.
- Put \`ToolCall\` items inside the agent bubble, after the text that explains them.
- Use \`role="system"\` for run events: "Run paused: waiting for approval".
- Set \`streaming\` while tokens arrive. A caret blinks at the end.`,

  ToolCall: `ToolCall shows one tool step of an agent with status and duration; it expands to show input and output.

**Consumer provides:** \`name\`, \`status\`, and optional \`summary\`, \`input\`, \`output\`, \`duration\`, \`defaultOpen\`.

- Keep \`summary\` to the main argument: a path, a query, an environment.
- Open failed calls by default. The reader needs the error first.
- The body expands with a height spring. Do not put a second ToolCall inside a ToolCall.`,

  RunTimeline: `RunTimeline shows the ordered steps of one agent run and the state of each step.

**Consumer provides:** \`steps\` (\`{ id, label, status, detail?, duration? }[]\`) and optional \`title\`.

- One step at a time is \`running\`. It gets a soft accent halo.
- Steps are validated with zod. An invalid step is dropped with a console warning.`,

  Composer: `Composer is the glass prompt box for an agent; Enter sends and Shift+Enter adds a line.

**Consumer provides:** \`onSubmit\`, and optional \`placeholder\`, \`busy\`, \`onStop\`, \`context\`, \`maxRows\`.

- Put context chips (repo, model, files) in \`context\`.
- Set \`busy\` while the agent runs. The send button becomes a stop button.
- The composer is the one glass layer in a chat view.`,

  CodeBlock: `CodeBlock shows a code sample with a filename and a copy button.

**Consumer provides:** \`code\`, and optional \`filename\` or \`language\`.

- Keep a sample short enough to read without a scroll: 20 lines or fewer.
- The block has no syntax colors. Use comments to point at the line that matters.`,

  BarChart: `BarChart compares one measure across 3 to 12 categories.

**Consumer provides:** \`data\` (\`{ label, value }[]\`), and optional \`title\`, \`unit\`, \`height\`.

- Bars use \`chart-1\` with a 4px rounded top and a flat baseline.
- Hover shows a glass tooltip and dims the other bars. A hidden table gives the values to screen readers.
- For more than one series, use LineChart or small multiples. Do not use two y axes.`,

  LineChart: `LineChart shows change over time for 1 to 5 series on one y axis.

**Consumer provides:** \`labels\` (x values), \`series\` (\`{ name, values }[]\`), and optional \`title\`, \`unit\`, \`height\`.

- Series take \`chart-1\` to \`chart-5\` in the order given. Keep the order fixed when a filter removes a series.
- A legend shows for 2 or more series. Up to 4 series also get direct labels at the line end.
- A sixth series is dropped. Fold extra series into "Other" before you pass them.
- Hover shows a crosshair and a tooltip with every series at that x.`,

  FlowDiagram: `FlowDiagram draws a small node-and-edge diagram: an agent harness, a pipeline or a request path.

**Consumer provides:** \`nodes\` (\`{ id, label, caption?, kind, x, y }[]\`), \`edges\` (\`{ from, to, label?, active? }[]\`), optional \`title\`, \`nodeWidth\`.

- Place nodes on a 20px grid. Use x steps of 220 and y steps of 140 for a clear layout.
- \`kind\` sets the icon: \`human\`, \`agent\`, \`tool\`, \`store\`, \`gate\`.
- Set \`active\` on the one edge that carries work now. A dash pulse moves along it.
- Use 8 nodes or fewer. Split a larger flow into two diagrams.`,
};

for (const [name, body] of Object.entries(docs)) {
  writeFileSync(path.join(root, 'project', 'components', name, 'README.md'), `${body}\n`);
}
console.log(`${Object.keys(docs).length} component READMEs written`);
