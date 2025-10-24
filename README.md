# ReactClimate (rest-express)

A fullstack React + Express starter for the ReactClimate project.

This README covers how to install, run the app in development (with automatic browser open), build for production, and basic troubleshooting (Windows tips).

## Prerequisites

- Node.js (tested with Node 22.x)
- npm (bundled with Node)

## Install

From the project root (where `package.json` lives):

```powershell
npm install
```

## Run (development)

A cross-platform `dev` script is provided which:
- sets `NODE_ENV=development`
- starts the Node server (`tsx server/index.ts`)
- waits for the server at http://localhost:5000, then automatically opens your default browser

Run in PowerShell:

```powershell
npm run dev
```

You should see a log like:

```
[express] serving on port 5000
```

And your default browser should open to:

http://localhost:5000

If the browser does not open automatically, run:

```powershell
node scripts/open-browser.cjs
```

(or open the URL manually)

## Build (production)

Build the client and bundle the server for production:

```powershell
npm run build
```

Then run the bundle with NODE_ENV=production (the script `start` uses plain Node):

```powershell
npm run start
```

## Important files / scripts added or changed

- `package.json` — `dev` script updated to be cross-platform and open the browser automatically. Added dev dependencies: `cross-env`, `concurrently`, `wait-on`, `open`.
- `scripts/open-browser.cjs` — small helper that uses the `open` package to open the default browser (CommonJS so it works in ESM projects).
- `scripts/open-browser.js` — earlier ESM attempt may be present (safe to remove if you prefer a single file).
- `server/index.ts` — conditionalized `reusePort` for Windows (removed on `win32`) to avoid ENOTSUP on Windows socket listen.

## Certificate download

- The client includes a certificate modal shown after submitting a pledge.
- Use the "Download Certificate" button in the modal to download a PNG of the certificate. The download uses `html2canvas` to render the certificate area and save it as a PNG named `climate-pledge-certificate-<name>.png`.

- A new "Download as PDF" button is also available which uses `html2canvas` + `jspdf` to export the certificate as an A4 PDF named `climate-pledge-certificate-<name>.pdf`.



## Environment variables

- `PORT` — the server listens on `process.env.PORT` (defaults to `5000`).

## Troubleshooting (Windows)

- If you see `'NODE_ENV' is not recognized` when running `npm run dev`, the `dev` script uses `cross-env` to make it cross-platform; ensure your dependencies were installed with `npm install`.

- If port 5000 is already in use and you get `EADDRINUSE`:

```powershell
netstat -ano | findstr ":5000"
# find PID from output, then kill it
taskkill /PID <PID> /F
```

- If the app logs `ENOTSUP` while trying to listen: we changed `server/index.ts` so `reusePort` isn't set on Windows. If you still see socket errors, check that no other process is bound to the port.

- If the browser didn't open automatically, make sure dev dependencies were installed. Run the open helper manually:

```powershell
node scripts/open-browser.cjs
```

## Quick health checks

- Check server reachable:

```powershell
try { $r = Invoke-WebRequest -Uri http://localhost:5000 -UseBasicParsing -TimeoutSec 5; Write-Host "STATUS:$($r.StatusCode)" } catch { Write-Host "ERROR: $($_.Exception.Message)" }
```

- See node processes:

```powershell
tasklist /FI "IMAGENAME eq node.exe"
```

## Warnings you may see (non-blocking)

- `Browserslist: browsers data (caniuse-lite) is 12 months old.` — optional: run `npx update-browserslist-db@latest`.
- `DeprecationWarning: util._extend` — a dependency warning; not fatal.
- PostCSS plugin `from` option warning — informational; may be due to plugin configuration.

## Next steps / suggestions

- Remove the unused `scripts/open-browser.js` if you want to keep only the CommonJS helper (`.cjs`).
- Optionally add a small PowerShell helper `start-dev.ps1` to start the server in a detached process if you prefer a GUI shortcut.

If you'd like, I can:
- start the server detached for you and confirm it's still running, or
- tidy up the extra `scripts/open-browser.js` file, or
- add a `README` section for local development hooks (formatter, tests), or
- add a small `start-dev.ps1` script for one-click Windows start.

---

README created by the helper script. If you'd like edits or additional sections (contributing, license, screenshots), tell me what to add.
