const execSync = require('node:child_process').execSync

const getCommitMsg = `git log -1 --pretty=%B`
const getBranchName = `git rev-parse --abbrev-ref HEAD`

function checkIgnoreProceedBuildApplications() {
  const commitMsg = execSync(getCommitMsg).toString('utf-8').trim()
  const branchName = execSync(getBranchName).toString('utf-8').trim()

  const skipCIRegex =
    /\[(skip[-\s]?apps|apps[-\s]?skip|skip apps|apps skip)\]/gi
  // Is changeset-release branch
  if (branchName.startsWith('changeset-release/')) {
    console.log(
      `Branch name matches pattern changeset-release/*: ${branchName}\nSkipping Vercel Build CI`,
    )
    process.exit(0)
  }

  if (skipCIRegex.test(commitMsg)) {
    console.log(
      'Skip build applications detected in commit message\nSkipping Vercel Build CI',
    )
    process.exit(0)
  }

  console.log('Continue to build on Vercel')
  process.exit(1)
}

checkIgnoreProceedBuildApplications()
