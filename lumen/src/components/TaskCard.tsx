import { motion } from 'framer-motion';
import { match } from 'ts-pattern';
import { Calendar } from 'lucide-react';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';
import { TaskSchema, type ParsedTask, type Task } from '../lib/schemas';
import { taskStatusMeta } from '../lib/status';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { StatusIcon } from './StatusIcon';

export interface TaskCardProps {
  task: Task;
  onOpen?: (task: ParsedTask) => void;
  compact?: boolean;
}

const priorityLabel = (priority: ParsedTask['priority']) =>
  match(priority)
    .with('p0', () => 'Urgent')
    .with('p1', () => 'High')
    .with('p2', () => 'Normal')
    .with('p3', () => 'Low')
    .exhaustive();

export function TaskCard({ task: input, onOpen, compact = false }: TaskCardProps) {
  const parsed = TaskSchema.safeParse(input);
  if (!parsed.success) return <div className="lm-task is-invalid">Invalid task: {parsed.error.issues[0]?.message}</div>;
  const task = parsed.data;
  const status = taskStatusMeta(task.status);

  return (
    <motion.article
      layout
      layoutId={`task-${task.id}`}
      transition={MotionPreset.smooth}
      whileTap={onOpen ? MotionPreset.press : undefined}
      className={cx('lm-task', onOpen && 'is-interactive', compact && 'is-compact')}
      onClick={onOpen ? () => onOpen(task) : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      <div className="lm-task__top">
        <span className="lm-task__id">{task.id}</span>
        <span className={cx('lm-prio', `lm-prio--${task.priority}`)} title={`Priority: ${priorityLabel(task.priority)}`}>
          {priorityLabel(task.priority)}
        </span>
      </div>
      <p className="lm-task__title">{task.title}</p>
      {!compact && task.tags.length > 0 && (
        <div className="lm-task__tags">{task.tags.map((tag) => <span key={tag} className="lm-tag">{tag}</span>)}</div>
      )}
      {task.progress != null && (
        <div className="lm-task__bar" aria-label={`${task.progress}% done`}>
          <motion.span initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} transition={MotionPreset.gentle} />
        </div>
      )}
      <div className="lm-task__foot">
        <Badge tone={status.tone} icon={<StatusIcon status={task.status} />}>{status.label}</Badge>
        <span className="lm-task__meta">
          {task.due && <span className="lm-task__due"><Calendar size={12} aria-hidden />{task.due}</span>}
          {task.assignee && <Avatar name={task.assignee.name} kind={task.assignee.kind} size="sm" />}
        </span>
      </div>
    </motion.article>
  );
}
