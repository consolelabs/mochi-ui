const execSync = require('node:child_process').execSync

const getCommitMsg = `git log -1 --pretty=%B`
const getBranchName = `git rev-parse --abbrev-ref HEAD`

function checkIsProceedBuildApplications() {
  const commitMsg = execSync(getCommitMsg).toString().trim()
  const branchName = execSync(getBranchName).toString().trim()

  const skipCIRegex = /\[(skip[-\s]?ci|ci[-\s]?skip|skip ci|ci skip)\]/gi
  // Is changeset-release branch
  if (branchName.startsWith('changeset-release/')) {
    console.log(
      `Branch name matches pattern changeset-release/*: ${branchName}\nSkipping Vercel Build CI`,
    )
    process.exit(0)
  }

  if (skipCIRegex.test(commitMsg)) {
    console.log('Skipping Vercel Build CI')
    process.exit(0)
  }

  console.log('Continue to build on Vercel')
  process.exit(1)
}

checkIsProceedBuildApplications()
