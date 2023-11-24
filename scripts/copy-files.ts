import fs from 'fs'
import path from 'path'
import { checkFolder } from './script-utils'

/**
 * Copies a file to the build directory within the specified package path.
 * @param file - The file to be included in the build.
 * @param packagePath - The path to the package directory.
 */
const includeFileInBuild = (file: string, packagePath: string) => {
  try {
    const sourcePath = path.resolve(packagePath, file)
    const targetPath = path.resolve(packagePath, 'dist', path.basename(file))
    fs.copyFileSync(sourcePath, targetPath)
    console.log(`Copied ${sourcePath} to ${targetPath}`)
  } catch (error) {
    console.log(`File ${file} not founded in ${packagePath}`)
  }
}

/**
 * Creates a new package.json file in the specified package path.
 * Removes unnecessary properties such as scripts, devDependencies, files, and publishConfig.
 * @param packagePath - The path to the package directory.
 * @returns The updated package.json data.
 */
function createPackageFile(packagePath: string) {
  let packageData = fs.readFileSync(
    path.resolve(packagePath, './package.json'),
    'utf8',
  )

  packageData = packageData.replace(/dist\//g, '')

  const newPackageData = JSON.parse(packageData)
  delete newPackageData.scripts
  delete newPackageData.devDependencies
  delete newPackageData.files
  delete newPackageData.publishConfig

  const targetPath = path.resolve(packagePath, 'dist', './package.json')

  fs.writeFileSync(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8')
  console.log(`Created package.json in ${targetPath}`)

  return newPackageData
}

/**
 * Copies the necessary files from the 'dist' folder to the build directory.
 * If the 'dist' folder does not exist, the function returns early.
 * It also creates a package file and includes additional local files in the build.
 */
function copyDistFiles() {
  const basePath = '.'
  const isDistExist = checkFolder(`${basePath}/dist`)

  if (!isDistExist) {
    return
  }

  createPackageFile(basePath)

  // Overrides with local files
  ;['./README.md', './CHANGELOG.md'].map((file) =>
    includeFileInBuild(file, basePath),
  )
}

copyDistFiles()
