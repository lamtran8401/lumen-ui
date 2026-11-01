import { motion } from 'framer-motion';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';
import { RunStepSchema, parseList, type RunStep } from '../lib/schemas';
import { stepStatusMeta } from '../lib/status';
import { StatusIcon } from './StatusIcon';

export interface RunTimelineProps {
  steps: RunStep[];
  title?: string;
}

export function RunTimeline({ steps: input, title }: RunTimelineProps) {
  const steps = parseList(RunStepSchema, input, 'RunTimeline.steps');
  return (
    <div className="lm-timeline">
      {title && <p className="lm-timeline__title">{title}</p>}
      <ol className="lm-timeline__list">
        {steps.map((step, index) => {
          const meta = stepStatusMeta(step.status);
          return (
            <motion.li
              key={step.id}
              className={cx('lm-step', `lm-tone--${meta.tone}`, `is-${step.status}`)}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...MotionPreset.smooth, delay: index * 0.04 }}
            >
              <span className="lm-step__rail" aria-hidden>
                <span className="lm-step__node"><StatusIcon status={step.status} size={13} /></span>
              </span>
              <div className="lm-step__body">
                <div className="lm-step__row">
                  <span className="lm-step__label">{step.label}</span>
                  <span className="lm-step__status">{meta.label}{step.duration && ` · ${step.duration}`}</span>
                </div>
                {step.detail && <p className="lm-step__detail">{step.detail}</p>}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
