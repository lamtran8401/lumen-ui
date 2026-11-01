StatTile shows one headline number with its change and a 7-point sparkline.

**Consumer provides:** `label`, `value` (formatted string), and optional `delta` (%), `deltaLabel`, `goodWhen`, `trend`.

- Set `goodWhen="down"` for latency, cost and error counts. The delta color follows the meaning, not the sign.
- The delta always shows an arrow and a sign, so color is never the only cue.
