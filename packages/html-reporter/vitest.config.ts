import { defineConfig } from 'vitest/config';

/** Unit tests for report data and the page components. */
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'app/**/*.test.tsx'],
    testTimeout: 30_000,
    pool: 'forks',
  },
});
