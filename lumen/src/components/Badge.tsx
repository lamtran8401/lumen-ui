import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import type { Tone } from '../lib/status';

export interface BadgeProps {
  tone?: Tone;
  dot?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function Badge({ tone = 'neutral', dot = false, icon, children }: BadgeProps) {
  return (
    <span className={cx('lm-badge', `lm-tone--${tone}`)}>
      {dot && <span className="lm-badge__dot" aria-hidden />}
      {icon}
      {children}
    </span>
  );
}
