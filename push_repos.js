const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd, cwd) {
  console.log(`Running in ${cwd}: ${cmd}`);
  try {
    const out = execSync(cmd, { cwd, encoding: 'utf8', stdio: 'pipe' });
    console.log(out);
    return out;
  } catch (err) {
    console.error(`Error in ${cwd}: ${err.stdout || ''} ${err.stderr || err.message}`);
    return err.stderr || err.message;
  }
}

const frontendPath = 'e:\\Project in industry\\asteya code main\\animeverse-frontend';
const backendPath = 'e:\\Project in industry\\asteya code main\\animeverse-backend';

// 1. FRONTEND REPO PUSH
console.log('=== FRONTEND PUSH ===');
if (!fs.existsSync(frontendPath + '\\.git')) {
  run('git init', frontendPath);
}
run('git remote remove origin', frontendPath);
run('git remote add origin https://github.com/storeasteya/Frontend.git', frontendPath);
run('git branch -M main', frontendPath);
run('git add .', frontendPath);
run('git commit -m "fix: Unify Cart checkout button to solid white theme"', frontendPath);
run('git push -u origin main --force', frontendPath);

// 2. BACKEND REPO PUSH
console.log('=== BACKEND PUSH ===');
if (!fs.existsSync(backendPath + '\\.git')) {
  run('git init', backendPath);
}
run('git remote remove origin', backendPath);
run('git remote add origin https://github.com/storeasteya/Backend.git', backendPath);
run('git branch -M main', backendPath);
run('git add .', backendPath);
run('git commit -m "feat: ASTEYA backend with Razorpay integration and updated 599 pricing"', backendPath);
run('git push -u origin main --force', backendPath);
