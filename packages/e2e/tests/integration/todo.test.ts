import { describe, expect, it } from 'vitest';
import { assertValidReport } from '../helpers/report-schema.ts';
import { listProject, resultByTitle, runProject } from '../helpers/run-project.ts';

const TODO_TEST = `import { test } from 'e2e';

test.describe('checkout', () => {
  test.describe('purchase flow', () => {
    test.todo('add checkout coverage');
  });
});
`;

describe('test.todo', () => {
  it('reports a nested todo without running it and exits successfully', async () => {
    const { outcome, project } = await runProject({ 'tests/checkout.e2e.ts': TODO_TEST }, {});
    try {
      const result = resultByTitle(outcome, 'add checkout coverage');
      expect(outcome.exitCode).toBe(0);
      expect(result).toMatchObject({ status: 'todo', selected: true, attempts: [] });
      expect(result.test.titlePath).toEqual(['checkout', 'purchase flow', 'add checkout coverage']);
      expect(outcome.report.run.summary).toMatchObject({
        discovered: 1,
        selected: 1,
        executed: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        todo: 1,
      });
      assertValidReport(outcome.report);
    } finally {
      project.cleanup();
    }
  });

  it('keeps todo visible in list selection', async () => {
    const { pairs, project } = await listProject({ 'tests/checkout.e2e.ts': TODO_TEST }, {});
    try {
      expect(pairs).toHaveLength(1);
      expect(pairs[0]).toMatchObject({
        titlePath: ['checkout', 'purchase flow', 'add checkout coverage'],
        disposition: 'todo',
      });
    } finally {
      project.cleanup();
    }
  });
});
