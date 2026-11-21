const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

const frontendPath = path.resolve(__dirname, 'animeverse-frontend');
const backendPath = path.resolve(__dirname, 'animeverse-backend');

// 1. FRONTEND REPO PUSH
console.log('=== FRONTEND PUSH ===');
if (!fs.existsSync(path.join(frontendPath, '.git'))) {
  run('git init', frontendPath);
}
run('git remote remove origin', frontendPath);
run('git remote add origin https://github.com/storeasteya/Frontend.git', frontendPath);
run('git branch -M main', frontendPath);
run('git add .', frontendPath);
run('git commit -m "update: sync frontend code"', frontendPath);
run('git push -u origin main', frontendPath);

// 2. BACKEND REPO PUSH
console.log('=== BACKEND PUSH ===');
if (!fs.existsSync(path.join(backendPath, '.git'))) {
  run('git init', backendPath);
}
run('git remote remove origin', backendPath);
run('git remote add origin https://github.com/storeasteya/Backend.git', backendPath);
run('git branch -M main', backendPath);
run('git add .', backendPath);
run('git commit -m "update: sync backend code"', backendPath);
run('git push -u origin main', backendPath);
