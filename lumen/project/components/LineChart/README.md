LineChart shows change over time for 1 to 5 series on one y axis.

**Consumer provides:** `labels` (x values), `series` (`{ name, values }[]`), and optional `title`, `unit`, `height`.

- Series take `chart-1` to `chart-5` in the order given. Keep the order fixed when a filter removes a series.
- A legend shows for 2 or more series. Up to 4 series also get direct labels at the line end.
- A sixth series is dropped. Fold extra series into "Other" before you pass them.
- Hover shows a crosshair and a tooltip with every series at that x.
