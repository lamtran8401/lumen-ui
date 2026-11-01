BarChart compares one measure across 3 to 12 categories.

**Consumer provides:** `data` (`{ label, value }[]`), and optional `title`, `unit`, `height`.

- Bars use `chart-1` with a 4px rounded top and a flat baseline.
- Hover shows a glass tooltip and dims the other bars. A hidden table gives the values to screen readers.
- For more than one series, use LineChart or small multiples. Do not use two y axes.
