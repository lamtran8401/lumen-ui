SegmentedControl switches between 2 to 5 views of the same content.

**Consumer provides:** `options` (`{ value, label }[]`), `value` + `onChange` or `defaultValue`, and an `aria-label`.

- Use it for a view switch (Board, List, Timeline) or a time range (24h, 7d, 30d).
- The thumb slides with a spring. Do not use it for navigation between pages.
- Use `size="sm"` above charts.
