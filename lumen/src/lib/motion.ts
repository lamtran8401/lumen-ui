import type { Transition } from 'framer-motion';

export class MotionPreset {
  static readonly snappy: Transition = { type: 'spring', stiffness: 520, damping: 38, mass: 0.7 };
  static readonly smooth: Transition = { type: 'spring', stiffness: 260, damping: 30 };
  static readonly gentle: Transition = { type: 'spring', stiffness: 160, damping: 24 };
  static readonly fade: Transition = { duration: 0.18, ease: [0.2, 0, 0, 1] };

  static readonly press = { scale: 0.97 } as const;

  static enter(offset = 6) {
    return {
      initial: { opacity: 0, y: offset, filter: 'blur(2px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: -offset / 2, filter: 'blur(2px)' },
      transition: MotionPreset.smooth,
    };
  }
}
