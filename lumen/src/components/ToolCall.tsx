import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Wrench } from 'lucide-react';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';
import type { StepStatus } from '../lib/schemas';
import { stepStatusMeta } from '../lib/status';
import { Badge } from './Badge';
import { StatusIcon } from './StatusIcon';

export interface ToolCallProps {
  name: string;
  status: StepStatus;
  summary?: string;
  input?: string;
  output?: ReactNode;
  duration?: string;
  defaultOpen?: boolean;
}

export function ToolCall({ name, status, summary, input, output, duration, defaultOpen = false }: ToolCallProps) {
  const [open, setOpen] = useState(defaultOpen);
  const meta = stepStatusMeta(status);
  const expandable = input != null || output != null;

  return (
    <div className={cx('lm-tool', open && 'is-open', `is-${status}`)}>
      <button type="button" className="lm-tool__head" aria-expanded={expandable ? open : undefined} disabled={!expandable} onClick={() => setOpen(!open)}>
        <span className="lm-tool__icon"><Wrench size={14} aria-hidden /></span>
        <span className="lm-tool__name">{name}</span>
        {summary && <span className="lm-tool__summary">{summary}</span>}
        <span className="lm-tool__end">
          {duration && <span className="lm-tool__dur lm-num">{duration}</span>}
          <Badge tone={meta.tone} icon={<StatusIcon status={status} />}>{meta.label}</Badge>
          {expandable && (
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={MotionPreset.snappy} className="lm-tool__chev">
              <ChevronDown size={16} aria-hidden />
            </motion.span>
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && expandable && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={MotionPreset.smooth}
            className="lm-tool__body"
          >
            <div className="lm-tool__inner">
              {input != null && (<><p className="lm-tool__label">Input</p><pre className="lm-tool__pre">{input}</pre></>)}
              {output != null && (<><p className="lm-tool__label">Output</p><div className="lm-tool__pre">{output}</div></>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
