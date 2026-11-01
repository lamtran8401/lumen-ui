import { z } from 'zod';

export const TaskStatus = z.enum(['todo', 'doing', 'review', 'done', 'blocked']);
export const Priority = z.enum(['p0', 'p1', 'p2', 'p3']);

export const AssigneeSchema = z.object({
  name: z.string().min(1),
  kind: z.enum(['human', 'agent']).default('human'),
});

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  status: TaskStatus.default('todo'),
  priority: Priority.default('p2'),
  assignee: AssigneeSchema.optional(),
  tags: z.array(z.string()).default([]),
  due: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
});

export const StepStatus = z.enum(['pending', 'running', 'success', 'error', 'skipped']);

export const RunStepSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  status: StepStatus,
  detail: z.string().optional(),
  duration: z.string().optional(),
});

export const DatumSchema = z.object({ label: z.string(), value: z.number() });

export const SeriesSchema = z.object({
  name: z.string().min(1),
  values: z.array(z.number()),
});

export const FlowNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  caption: z.string().optional(),
  kind: z.enum(['human', 'agent', 'tool', 'store', 'gate']).default('agent'),
  x: z.number(),
  y: z.number(),
});

export const FlowEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string().optional(),
  active: z.boolean().default(false),
});

export type Task = z.input<typeof TaskSchema>;
export type ParsedTask = z.output<typeof TaskSchema>;
export type TaskStatus = z.infer<typeof TaskStatus>;
export type RunStep = z.infer<typeof RunStepSchema>;
export type StepStatus = z.infer<typeof StepStatus>;
export type Datum = z.infer<typeof DatumSchema>;
export type Series = z.infer<typeof SeriesSchema>;
export type FlowNode = z.input<typeof FlowNodeSchema>;
export type FlowEdge = z.input<typeof FlowEdgeSchema>;

// a bad record must not blank the whole board; drop it and report once in the console
export function parseList<T extends z.ZodType>(schema: T, items: unknown[], label: string): z.output<T>[] {
  return items.flatMap((item, index) => {
    const result = schema.safeParse(item);
    if (result.success) return [result.data];
    console.warn(`[Lumen] ${label}[${index}] dropped:`, result.error.issues);
    return [];
  });
}
