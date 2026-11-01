Card groups related content on a surface; `glass` floats over content and `inset` sinks into a card.

**Consumer provides:** `children`, and optional `title`, `description`, `actions`, `variant`, `padding`, `animateIn`.

- Use `solid` for most content. It uses `surface` and `shadow-ring`.
- Use `glass` only for a layer that floats over other content: a sticky bar, a panel over a chart. Use one glass layer in each view.
- Use `inset` for a well inside a card. Do not nest a solid card in a solid card.
- Set `animateIn` for a card that appears after load, for example a new agent result.
