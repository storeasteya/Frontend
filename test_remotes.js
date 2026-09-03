const { execSync } = require('child_process');
const fs = require('fs');

const logFile = 'e:\\Project in industry\\asteya code main\\push_results.txt';

function run(cmd, cwd) {
  try {
    const out = execSync(cmd, { cwd, encoding: 'utf8', timeout: 15000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
    fs.appendFileSync(logFile, `[OK] ${cmd}: ${out}\n`);
    return out;
  } catch(e) {
    fs.appendFileSync(logFile, `[ERR] ${cmd}: ${e.stderr || e.stdout || e.message}\n`);
    return null;
  }
}

fs.writeFileSync(logFile, 'Testing git remotes...\n');
run('git remote -v', 'e:\\Project in industry\\asteya code main\\animeverse-frontend');
run('git push git@github.com:storeasteya/Frontend.git main --force', 'e:\\Project in industry\\asteya code main\\animeverse-frontend');
run('git push https://github.com/storeasteya/Frontend.git main --force', 'e:\\Project in industry\\asteya code main\\animeverse-frontend');
