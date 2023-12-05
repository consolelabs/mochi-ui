import fs from 'fs'
import path from 'path'
import { rimraf } from 'rimraf'

/**
 * Updates the publishConfig in the package.json file with the specified root directory.
 * If no root directory is provided, it defaults to './dist'.
 *
 * @param {string} root - The root directory for publishing.
 * @returns {void}
 */
function updatePackagePublishConfig(root = './dist') {
  const packagePath = path.resolve('./package.json')
  let packageData = fs.readFileSync(packagePath, 'utf8')

  const newPackageData = JSON.parse(packageData)
  newPackageData.publishConfig = {
    directory: root,
  }

  rimraf.sync(packagePath)

  // Rewrite file
  fs.writeFileSync(packagePath, JSON.stringify(newPackageData, null, 2), 'utf8')
  console.log(`Updated ${packagePath}`)
}

/**
 * Removes the "publishConfig" property from the package.json file.
 */
function removePackagePublishConfig() {
  const packagePath = path.resolve('./package.json')
  let packageData = fs.readFileSync(packagePath, 'utf8')

  const newPackageData = JSON.parse(packageData)
  delete newPackageData.publishConfig

  const distPackageJson = path.resolve('./dist/package.json')

  rimraf.sync(packagePath)
  rimraf.sync(distPackageJson)

  // Rewrite file
  fs.writeFileSync(packagePath, JSON.stringify(newPackageData, null, 2), 'utf8')
  console.log(`Removed "publishConfig" in ${packagePath}`)
}

const publishRoot = process.env.PUBLISH_ROOT

const main =
  process.env.MODIFY_PACKAGE_JSON === 'UPDATE'
    ? updatePackagePublishConfig
    : removePackagePublishConfig

main(publishRoot)
