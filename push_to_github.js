const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'push_log.txt');
fs.writeFileSync(logFile, '=== STARTING GIT PUSH TO GITHUB ===\n');

function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

function runGitCommands(repoPath, repoName, remoteUrl) {
  log(`\n========================================`);
  log(` Processing ${repoName}`);
  log(` Path: ${repoPath}`);
  log(` Target Remote: ${remoteUrl}`);
  log(`========================================`);

  if (!fs.existsSync(repoPath)) {
    log(`ERROR: Directory ${repoPath} does not exist.`);
    return;
  }

  // Ensure git is initialized
  const gitDir = path.join(repoPath, '.git');
  if (!fs.existsSync(gitDir)) {
    log(`Initializing git repo in ${repoPath}...`);
    try {
      execSync('git init', { cwd: repoPath, encoding: 'utf8' });
    } catch (e) {
      log(`Git init failed: ${e.message}`);
    }
  }

  // Set remote origin
  try {
    execSync('git remote remove origin', { cwd: repoPath, encoding: 'utf8', stdio: 'ignore' });
  } catch (e) {
    // Ignore error if origin didn't exist
  }

  try {
    execSync(`git remote add origin ${remoteUrl}`, { cwd: repoPath, encoding: 'utf8' });
    log(`Set remote origin to ${remoteUrl}`);
  } catch (e) {
    log(`Error setting remote: ${e.message}`);
  }

  // Set branch main
  try {
    execSync('git branch -M main', { cwd: repoPath, encoding: 'utf8' });
  } catch (e) {
    log(`Branch rename warning: ${e.message}`);
  }

  // Stage changes
  try {
    const addOut = execSync('git add -A', { cwd: repoPath, encoding: 'utf8' });
    log(`Staged all files.`);
  } catch (e) {
    log(`Git add error: ${e.message}`);
  }

  // Check git status
  try {
    const statusOut = execSync('git status --porcelain', { cwd: repoPath, encoding: 'utf8' });
    if (statusOut.trim().length > 0) {
      log(`Changes detected. Committing...`);
      const commitOut = execSync('git commit -m "update: ASTEYA repository sync"', { cwd: repoPath, encoding: 'utf8' });
      log(`Commit result:\n${commitOut}`);
    } else {
      log(`No uncommitted changes detected.`);
    }
  } catch (e) {
    log(`Git status/commit: ${e.message}`);
  }

  // Push to remote main
  log(`Pushing to ${remoteUrl} main branch...`);
  try {
    const pushOut = execSync('git push -u origin main --force', { 
      cwd: repoPath, 
      encoding: 'utf8', 
      timeout: 60000,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } 
    });
    log(`PUSH SUCCESSFUL!\nOutput:\n${pushOut}`);
  } catch (e) {
    log(`PUSH FAILED:\n${e.stderr || e.stdout || e.message}`);
  }
}

const basePath = __dirname;
const frontendPath = path.join(basePath, 'animeverse-frontend');
const backendPath = path.join(basePath, 'animeverse-backend');

runGitCommands(frontendPath, 'Frontend', 'https://github.com/storeasteya/Frontend.git');
runGitCommands(backendPath, 'Backend', 'https://github.com/storeasteya/Backend.git');

log('\n=== GIT PUSH PROCESS COMPLETED ===');
