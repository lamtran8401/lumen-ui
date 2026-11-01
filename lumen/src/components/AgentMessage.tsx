import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { match } from 'ts-pattern';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';
import { Avatar } from './Avatar';

export type MessageRole = 'user' | 'agent' | 'system';

export interface AgentMessageProps {
  role: MessageRole;
  author?: string;
  time?: string;
  streaming?: boolean;
  children: ReactNode;
}

export function AgentMessage({ role, author, time, streaming = false, children }: AgentMessageProps) {
  const name = author ?? match(role).with('user', () => 'You').with('agent', () => 'Agent').with('system', () => 'System').exhaustive();

  if (role === 'system') {
    return <motion.div {...MotionPreset.enter(4)} className="lm-msg lm-msg--system" role="status">{children}</motion.div>;
  }

  return (
    <motion.div {...MotionPreset.enter()} className={cx('lm-msg', `lm-msg--${role}`)}>
      {role === 'agent' && <Avatar name={name} kind="agent" />}
      <div className="lm-msg__col">
        <div className="lm-msg__meta">
          <span className="lm-msg__author">{name}</span>
          {time && <time className="lm-msg__time">{time}</time>}
        </div>
        <div className="lm-msg__bubble" aria-live={streaming ? 'polite' : undefined}>
          {children}
          {streaming && <span className="lm-caret" aria-hidden />}
        </div>
      </div>
    </motion.div>
  );
}
