import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { MotionPreset } from '../lib/motion';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure className="lm-code">
      <figcaption className="lm-code__head">
        <span className="lm-code__name">{filename ?? language ?? 'code'}</span>
        <button type="button" className="lm-code__copy" onClick={copy} aria-label={copied ? 'Copied' : 'Copy code'}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={copied ? 'done' : 'copy'} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={MotionPreset.fade}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </figcaption>
      <pre className="lm-code__pre"><code>{code}</code></pre>
    </figure>
  );
}
