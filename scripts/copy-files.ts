import fs from 'fs'
import path from 'path'
import { checkFolder } from './script-utils'

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
