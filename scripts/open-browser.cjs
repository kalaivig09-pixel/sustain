#!/usr/bin/env node
// CommonJS helper so `require('open')` works even when the project is ESM.
try {
  const open = require('open');
  open('http://localhost:5000').catch(() => {
    // Best-effort: don't crash the process if opening fails
    // eslint-disable-next-line no-console
    console.error('Failed to open browser automatically.');
  });
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('open package not available to open browser.');
}
