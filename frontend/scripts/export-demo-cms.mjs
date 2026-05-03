import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pythonScript = resolve(scriptDir, 'export-demo-cms.py');

const candidates = [
  process.env.PYTHON,
  process.env.PYTHON_EXECUTABLE,
  process.platform === 'win32'
    ? 'C:/Users/buechnerh/AppData/Local/Programs/Python/Python314/python.exe'
    : null,
  'python',
  'python3',
  'py',
].filter(Boolean);

for (const executable of candidates) {
  const result = spawnSync(executable, [pythonScript], {
    stdio: 'inherit',
  });

  if (result.error && result.error.code === 'ENOENT') {
    continue;
  }

  if (result.status === 0) {
    process.exit(0);
  }

  if (result.error) {
    console.error(result.error.message);
    process.exit(result.status ?? 1);
  }

  process.exit(result.status ?? 1);
}

console.error('No usable Python executable found for demo export.');
process.exit(1);
