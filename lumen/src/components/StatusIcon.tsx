import { match } from 'ts-pattern';
import { Circle, CircleCheck, CircleDashed, CircleX, Eye, Loader, SkipForward } from 'lucide-react';
import type { StepStatus, TaskStatus } from '../lib/schemas';

export interface StatusIconProps {
  status: TaskStatus | StepStatus;
  size?: number;
}

export function StatusIcon({ status, size = 12 }: StatusIconProps) {
  const props = { size, 'aria-hidden': true, strokeWidth: 2.25 } as const;
  return match(status)
    .with('todo', 'pending', () => <CircleDashed {...props} />)
    .with('doing', 'running', () => <Loader {...props} className="lm-spin" />)
    .with('review', () => <Eye {...props} />)
    .with('done', 'success', () => <CircleCheck {...props} />)
    .with('blocked', 'error', () => <CircleX {...props} />)
    .with('skipped', () => <SkipForward {...props} />)
    .otherwise(() => <Circle {...props} />);
}
