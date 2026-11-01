FlowDiagram draws a small node-and-edge diagram: an agent harness, a pipeline or a request path.

**Consumer provides:** `nodes` (`{ id, label, caption?, kind, x, y }[]`), `edges` (`{ from, to, label?, active? }[]`), optional `title`, `nodeWidth`.

- Place nodes on a 20px grid. Use x steps of 220 and y steps of 140 for a clear layout.
- `kind` sets the icon: `human`, `agent`, `tool`, `store`, `gate`.
- Set `active` on the one edge that carries work now. A dash pulse moves along it.
- Use 8 nodes or fewer. Split a larger flow into two diagrams.
