const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const cwd = path.resolve(__dirname, '..');
  
  // Get git status
  const status = execSync('git status', { cwd, encoding: 'utf-8' });
  
  // Get git log
  const log = execSync('git log -n 5 --oneline', { cwd, encoding: 'utf-8' });
  
  fs.writeFileSync(path.join(__dirname, 'git_info.txt'), `STATUS:\n${status}\n\nLOG:\n${log}`);
  console.log('Successfully wrote git info to git_info.txt');
} catch (e) {
  console.error('Error:', e.message);
}
