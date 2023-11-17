const path = require('path')
const getPackagesSync = require('@manypkg/get-packages').getPackagesSync
const execSync = require('node:child_process').execSync

function getApplicationsChanged() {
  const appsDir = path.resolve(process.cwd())
  const packagesSync = getPackagesSync(appsDir)

  function getApps() {
    return packagesSync.packages.filter((package) => {
      const isApp = /^apps\/*/gi.test(package.relativeDir)
      const isHasNameAndVersion =
        package.packageJson.name && package.packageJson.version
      return isApp && isHasNameAndVersion
    })
  }

  const appsPackages = getApps()
  if (!appsPackages.length) {
    console.info(
      'Not found any application packages in the',
      '\x1b[31m"/apps"\x1b[0m',
      'folder !',
    )
    return null
  }

  const fromCommit = process.env.FROM_COMMIT || ''
  const toCommit = process.env.TO_COMMIT || 'HEAD^'
  const commandGetChanged = `npx -y turbo build --dry-run=json --filter={./apps/*}[${fromCommit}...${toCommit}]`
  const output = execSync(commandGetChanged, {
    encoding: 'utf-8',
  })
  const parsedOutput = JSON.parse(output)
  const packages = parsedOutput.packages

  if (!packages || !packages.length) {
    return null
  }

  const applications = appsPackages.filter((p) => {
    return packages.some((package) => p.packageJson.name === package)
  })

  if (!applications.length) {
    return null
  }

  return applications.map((p) => p.relativeDir)
}

module.exports = getApplicationsChanged
