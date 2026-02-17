const { spawn } = require('child_process');
const fs = require('fs');

const log = fs.createWriteStream('start_services_log.txt');

function start(name, cmd, args, cwd) {
  log.write(`Starting ${name} in ${cwd}...\n`);
  const proc = spawn(cmd, args, { cwd, shell: true });
  proc.stdout.on('data', (data) => log.write(`[${name} STDOUT] ${data}`));
  proc.stderr.on('data', (data) => log.write(`[${name} STDERR] ${data}`));
  proc.on('close', (code) => log.write(`[${name}] process exited with code ${code}\n`));
  return proc;
}

// Start backend
start('BACKEND', 'npm', ['run', 'dev'], 'd:/orbit/backend');

// Start hub
start('HUB', 'npm', ['run', 'dev'], 'd:/orbit/templates/orbit_storefront_hub');
