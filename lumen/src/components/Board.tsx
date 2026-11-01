import { LayoutGroup } from 'framer-motion';
import type { ParsedTask, Task } from '../lib/schemas';
import { TaskCard } from './TaskCard';

export interface BoardColumn {
  id: string;
  title: string;
  tasks: Task[];
  limit?: number;
}

export interface BoardProps {
  columns: BoardColumn[];
  onOpenTask?: (task: ParsedTask) => void;
}

export function Board({ columns, onOpenTask }: BoardProps) {
  return (
    <LayoutGroup>
      <div className="lm-board">
        {columns.map((column) => {
          const over = column.limit != null && column.tasks.length > column.limit;
          return (
            <section key={column.id} className="lm-board__col" aria-label={column.title}>
              <header className="lm-board__head">
                <span className="lm-board__title">{column.title}</span>
                <span className={over ? 'lm-board__count is-over' : 'lm-board__count'}>
                  {column.tasks.length}{column.limit != null && ` / ${column.limit}`}
                </span>
              </header>
              <div className="lm-board__list">
                {column.tasks.map((task) => <TaskCard key={task.id} task={task} onOpen={onOpenTask} />)}
                {column.tasks.length === 0 && <p className="lm-board__empty">No tasks</p>}
              </div>
            </section>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
