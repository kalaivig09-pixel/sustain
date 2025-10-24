#!/usr/bin/env node
/* Small helper to open the default browser to the app URL. */
try {
  const open = require('open');
  open('http://localhost:5000').catch(() => {
    // Best-effort: don't crash the process if opening fails
    // the server will still be running and the user can open the browser manually
    // eslint-disable-next-line no-console
    console.error('Failed to open browser automatically.');
  });
} catch (e) {
  // If require fails, silently ignore — the server is the primary concern.
  // eslint-disable-next-line no-console
  console.error('open package not available to open browser.');
}
