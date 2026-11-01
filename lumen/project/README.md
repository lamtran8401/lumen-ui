Lumen is a personal design system for three surfaces: work tracking with AI agents, guide books for research, and charts and diagrams. It sits on shadcn/ui foundations and adds soft radii, edge shadows, a small amount of glass and spring motion.

## Principles

1. **Soft, not sharp.** Every container has a radius of 6px or more. A square corner appears only where a bar meets the chart baseline.
2. **Edges, not elevation.** A shadow draws a 1px ring that replaces a border. Use `shadow-ring` for most surfaces. Use `shadow-raised` for one layer above its neighbours.
3. **Glass is rare.** Use `glass` with `blur-glass` for one floating layer in each view: the composer, a sticky bar or a chart tooltip. Never put glass on a card in a grid.
4. **Calm hover.** Hover changes a fill or a shadow. It never moves, scales or recolors a component. Press scales a button to 0.97.
5. **Motion explains change.** A card that changes column moves there. A tool call expands with a height spring. Nothing moves for decoration.
6. **Agent work is visible.** Each agent item shows the agent avatar, a status word and a status icon. A reader must tell agent work from human work at a glance.

## Content

- Write in Simplified Technical English. A sentence has 25 words or fewer. An instruction has 20 or fewer.
- Use sentence case for every label, title and button: "Start run", not "Start Run".
- Start a button with a verb: "Open pull request", "Stop agent".
- Use real numbers and names: "512 MB limit at 02:14", not "high memory".
- Use "must" for a requirement and "can" for a possibility. Do not use "should" or "may".
- Write an error as the fix: "Budget must be 2,000 tokens or more."
- Do not use emoji in UI text or in guide books.
- Guide books use the three `Callout` kinds only: "In short", "Good to know" and "Watch out". Use 3 or fewer in each document.

## Color

Lumen is neutral first. One accent, `accent` (tide teal), marks the primary action, the selected item and the running agent.

- Set the page on `canvas`. Set cards, columns and chart plots on `surface`.
- Use `surface-raised` for a surface inside a surface, for example a `ToolCall` in a message.
- Use `surface-sunken` for wells: code, progress tracks, segmented-control tracks, board columns.
- Set text in `ink`. Set descriptions and axis labels in `ink-muted`. Set placeholders and timestamps in `ink-subtle`.
- Put `on-accent` text on an `accent` fill. Put `accent-ink` text on an `accent-soft` fill.
- Status colors are `success`, `warning` and `danger`, each with a `-soft` fill. A status always carries a word and an icon.
- Every text pair named in a token note holds 4.5:1 or more in both themes. `control-border` and `focus` hold 3:1.

## Data visualization

- Series take `chart-1` (blue), `chart-2` (orange), `chart-3` (aqua), `chart-4` (yellow) and `chart-5` (magenta) in that order. The order is the color-blind safety. Never cycle it.
- Color follows the entity, not its rank. A filter that removes a series must not repaint the others.
- Use one y axis. For two measures with different units, use two charts.
- A sixth series folds into "Other".
- Lines are 2px with round joins. Bars have a 4px rounded top and a flat baseline. Grid lines use `chart-grid`.
- Text in a chart uses `ink-muted`, never the series color.
- Every chart has a hover tooltip and a hidden data table for screen readers.
- `chart-3` and `chart-4` are below 3:1 on the light `surface`. Charts that use them must show direct labels or a legend.

## Type

- The sans family is Geist. The mono family is Geist Mono. Both load from Google Fonts in `bundle.css`.
- Set guide-book prose and agent messages in `body` (15/24). Set dense UI in `body-sm` (13/20).
- Use `display` once on a guide-book cover. Use `title` for a page and `heading` for a section or card.
- Set buttons, labels and tabs in `label` (13/16, weight 500).
- Set code, tool calls and task IDs in `code`. Set stat-tile values in `metric` with tabular figures.

## Shape and space

- Radii grow with the container: `radius-sm` (10px) for small controls, `radius-md` (14px) for buttons and task cards, `radius-lg` (18px) for cards and bubbles, `radius-xl` (24px) for the composer and dialogs.
- Badges, switches, avatars and icon buttons use `radius-pill`.
- A nested radius is the outer radius minus the padding. A 4px-padded track in a `radius-md` control uses `radius-sm`.
- Use the 4px spacing scale: `space-3` inside task cards, `space-4` inside cards, `space-8` between page sections.

## Motion

Motion uses framer-motion springs. The presets live in `Lumen.MotionPreset`.

| Preset | Spring | Use |
| --- | --- | --- |
| `snappy` | stiffness 520, damping 38 | Thumbs, switches, button press, chevrons |
| `smooth` | stiffness 260, damping 30 | Cards that enter or move, tool-call expand |
| `gentle` | stiffness 160, damping 24 | Progress fills, chart bars |
| `fade` | 180 ms, ease (0.2, 0, 0, 1) | Tooltips, icon swaps |

- Enter: fade from 6px below with a 2px blur. Exit: fade 3px up.
- Lists stagger by 40 ms or less.
- Respect `prefers-reduced-motion`. Spinners and the stream caret stop.

## Iconography

- Use lucide icons at 14px or 16px, stroke 2. Use 12px inside badges.
- Icons take the text color of their row. A status icon takes its tone.
- The agent glyph is lucide `Bot`. The person glyph is initials, not an icon.
- No logo exists yet. Set the name "Lumen" in `heading` type.

## Code standards

- Write TypeScript with ES2022 features. Use classes for stateful logic with one job: `LinearScale`, `BandScale`, `PointScale`, `MotionPreset`.
- Branch on a union with `ts-pattern` `match(...).exhaustive()`. Do not chain `if` or `switch` over status values.
- Validate every data prop at the edge with zod. A component drops a bad record and logs one warning. It never renders blank.
- Use libraries with 1M or more weekly downloads only: React, framer-motion, zod, ts-pattern, clsx, lucide-react.
- Comment only hard logic, in one or two lines.

## Consuming the bundle

Load React 18 and ReactDOM 18, then `components/bundle.js`. Components live on `window.Lumen`. Load `tokens.css`, then `components/bundle.css`.
