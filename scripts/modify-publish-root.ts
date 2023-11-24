import fs from 'fs'
import path from 'path'
import { rimraf } from 'rimraf'

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

function removePackagePublishConfig() {
  const packagePath = path.resolve('./package.json')
  let packageData = fs.readFileSync(packagePath, 'utf8')

  const newPackageData = JSON.parse(packageData)
  delete newPackageData.publishConfig

  rimraf.sync(packagePath)

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
