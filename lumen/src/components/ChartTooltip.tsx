import { AnimatePresence, motion } from 'framer-motion';
import { MotionPreset } from '../lib/motion';

export interface TooltipRow {
  name: string;
  value: string;
  color?: string;
}

export interface ChartTooltipProps {
  x: number;
  y: number;
  title: string;
  rows: TooltipRow[];
  visible: boolean;
  containerWidth: number;
}

export function ChartTooltip({ x, y, title, rows, visible, containerWidth }: ChartTooltipProps) {
  const flip = x > containerWidth - 180;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="lm-tip"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1, left: x, top: y }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ ...MotionPreset.snappy, opacity: MotionPreset.fade }}
          style={{ translateX: flip ? 'calc(-100% - 12px)' : '12px', translateY: '-50%' }}
          role="presentation"
        >
          <p className="lm-tip__title">{title}</p>
          {rows.map((row) => (
            <p key={row.name} className="lm-tip__row">
              {row.color && <span className="lm-tip__swatch" style={{ background: row.color }} />}
              <span className="lm-tip__name">{row.name}</span>
              <span className="lm-tip__value lm-num">{row.value}</span>
            </p>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
