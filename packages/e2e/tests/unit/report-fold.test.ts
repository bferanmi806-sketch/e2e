import { describe, expect, it } from 'vitest';
import { foldLastRun } from '../../src/report/fold.ts';
import type { ReportResult } from '../../src/report/build.ts';
import { reportAttempt, reportDocument, reportResult } from '../helpers/report.ts';

describe('foldLastRun', () => {
  it('does not carry attempts from before a test became TODO', () => {
    const previousResult = reportResult({
      id: 'result-1',
      testId: 'test-1',
      status: 'failed',
      attempts: [reportAttempt({ status: 'failed' })],
    });
    const { serialGroupId: _serialGroupId, expectedFailure: _expectedFailure, ...ordinary } = previousResult;
    const currentTodo = {
      ...ordinary,
      kind: 'test',
      status: 'skipped',
      skip: { cause: 'todo', reason: 'todo' },
      attempts: [],
    } satisfies ReportResult;
    const previous = reportDocument({ id: 'run-previous', status: 'failed', exitCode: 1, results: [previousResult] });
    const current = reportDocument({ id: 'run-current', results: [currentTodo] });

    const folded = foldLastRun(current, previous);

    expect(folded.run.results).toHaveLength(1);
    expect(folded.run.results[0]).toMatchObject({ status: 'skipped', skip: { cause: 'todo', reason: 'todo' }, attempts: [] });
  });
});
