const { execSync } = require('child_process');
const fs = require('fs');

const logPath = 'e:\\Project in industry\\asteya code main\\push_output.txt';
fs.writeFileSync(logPath, 'Executing immediate git push...\n');

function log(text) {
  console.log(text);
  fs.appendFileSync(logPath, text + '\n');
}

function exec(cmd, cwd) {
  log(`\n[${cwd}] > ${cmd}`);
  try {
    const stdout = execSync(cmd, { cwd, encoding: 'utf8', stdio: 'pipe' });
    log(`[STDOUT]\n${stdout}`);
    return true;
  } catch (err) {
    log(`[STDERR]\n${err.stderr || err.message}`);
    if (err.stdout) log(`[STDOUT]\n${err.stdout}`);
    return false;
  }
}

const frontend = 'e:\\Project in industry\\asteya code main\\animeverse-frontend';
const backend = 'e:\\Project in industry\\asteya code main\\animeverse-backend';

log('--- FRONTEND ---');
exec('git add .', frontend);
exec('git commit -m "fix: Fluid ASTEYA hero watermark scaling, cyan Sign In button, inline Track Order link"', frontend);
exec('git push origin main --force', frontend);

log('--- BACKEND ---');
exec('git add .', backend);
exec('git commit -m "feat: ASTEYA backend with Razorpay integration and 599 pricing"', backend);
exec('git push origin main --force', backend);

log('\nDone pushing repos.');
