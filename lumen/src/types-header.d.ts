/** Lumen — props reference. Load React 18, then bundle.js; components live on window.Lumen. */
import type { ReactNode, ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export type TaskStatus = 'todo' | 'doing' | 'review' | 'done' | 'blocked';
export type StepStatus = 'pending' | 'running' | 'success' | 'error' | 'skipped';

export interface Task {
  id: string;
  title: string;
  status?: TaskStatus;
  priority?: 'p0' | 'p1' | 'p2' | 'p3';
  assignee?: { name: string; kind?: 'human' | 'agent' };
  tags?: string[];
  due?: string;
  progress?: number;
}
export type ParsedTask = Required<Omit<Task, 'assignee' | 'due' | 'progress'>> & Pick<Task, 'assignee' | 'due' | 'progress'>;
export interface RunStep { id: string; label: string; status: StepStatus; detail?: string; duration?: string }
export interface Datum { label: string; value: number }
export interface Series { name: string; values: number[] }
export interface FlowNode { id: string; label: string; caption?: string; kind?: 'human' | 'agent' | 'tool' | 'store' | 'gate'; x: number; y: number }
export interface FlowEdge { from: string; to: string; label?: string; active?: boolean }
