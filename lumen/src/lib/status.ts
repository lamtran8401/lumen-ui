import { match } from 'ts-pattern';
import type { StepStatus, TaskStatus } from './schemas';

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export const taskStatusMeta = (status: TaskStatus): { label: string; tone: Tone } =>
  match(status)
    .with('todo', () => ({ label: 'To do', tone: 'neutral' as const }))
    .with('doing', () => ({ label: 'In progress', tone: 'accent' as const }))
    .with('review', () => ({ label: 'In review', tone: 'warning' as const }))
    .with('done', () => ({ label: 'Done', tone: 'success' as const }))
    .with('blocked', () => ({ label: 'Blocked', tone: 'danger' as const }))
    .exhaustive();

export const stepStatusMeta = (status: StepStatus): { label: string; tone: Tone } =>
  match(status)
    .with('pending', () => ({ label: 'Queued', tone: 'neutral' as const }))
    .with('running', () => ({ label: 'Running', tone: 'accent' as const }))
    .with('success', () => ({ label: 'Passed', tone: 'success' as const }))
    .with('error', () => ({ label: 'Failed', tone: 'danger' as const }))
    .with('skipped', () => ({ label: 'Skipped', tone: 'neutral' as const }))
    .exhaustive();
