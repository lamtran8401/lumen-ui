ToolCall shows one tool step of an agent with status and duration; it expands to show input and output.

**Consumer provides:** `name`, `status`, and optional `summary`, `input`, `output`, `duration`, `defaultOpen`.

- Keep `summary` to the main argument: a path, a query, an environment.
- Open failed calls by default. The reader needs the error first.
- The body expands with a height spring. Do not put a second ToolCall inside a ToolCall.
