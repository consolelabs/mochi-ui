import path from 'node:path'

const componentsPath = path.resolve(__dirname, '../src/components')
const indexPath = path.resolve(__dirname, '../src/components/index.ts')
const rootIndexPath = path.resolve(__dirname, '../src/index.ts')
const svgPath = path.resolve(__dirname, '../src/svg')

const cleanPackageJsonPath = path.resolve(
  __dirname,
  '../clean-package.config.json',
)

export {
  componentsPath,
  indexPath,
  svgPath,
  cleanPackageJsonPath,
  rootIndexPath,
}
