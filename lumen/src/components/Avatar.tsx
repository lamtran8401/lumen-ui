import { Bot } from 'lucide-react';
import { cx } from '../lib/cx';

export interface AvatarProps {
  name: string;
  kind?: 'human' | 'agent';
  size?: 'sm' | 'md';
}

const initials = (name: string) =>
  name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]!.toUpperCase()).join('');

export function Avatar({ name, kind = 'human', size = 'md' }: AvatarProps) {
  return (
    <span className={cx('lm-avatar', `lm-avatar--${kind}`, `lm-avatar--${size}`)} title={name} aria-label={name} role="img">
      {kind === 'agent' ? <Bot size={size === 'sm' ? 12 : 15} aria-hidden /> : initials(name)}
    </span>
  );
}
