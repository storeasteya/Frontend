const { execSync } = require('child_process');
const fs = require('fs');

const logFile = 'e:\\Project in industry\\asteya code main\\push_log.txt';
fs.writeFileSync(logFile, 'Starting push script with 30s timeout...\n');

function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

function run(cmd, cwd) {
  log(`\nExecuting: ${cmd} in ${cwd}`);
  try {
    const out = execSync(cmd, { 
      cwd, 
      encoding: 'utf8', 
      timeout: 30000, 
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } 
    });
    log(`SUCCESS: ${out}`);
    return out;
  } catch (err) {
    log(`ERROR: ${err.message}\nSTDOUT: ${err.stdout || ''}\nSTDERR: ${err.stderr || ''}`);
    return err.message;
  }
}

const frontendPath = 'e:\\Project in industry\\asteya code main\\animeverse-frontend';
const backendPath = 'e:\\Project in industry\\asteya code main\\animeverse-backend';

log('=== FRONTEND PUSH ===');
run('git add .', frontendPath);
run('git commit -m "style: Complete UI refinement - 599 pricing, cyan AuthModal icons, responsive watermark, standard cursor"', frontendPath);
run('git push https://github.com/storeasteya/Frontend.git main --force', frontendPath);

log('\n=== BACKEND PUSH ===');
run('git add .', backendPath);
run('git commit -m "feat: Backend 599 pricing updates and Razorpay integration"', backendPath);
run('git push https://github.com/storeasteya/Backend.git main --force', backendPath);

log('\nPush script finished.');
