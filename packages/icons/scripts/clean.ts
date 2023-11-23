import fs from 'node:fs'
import { rimraf } from 'rimraf'
import * as paths from './paths'

function doCleanUp() {
  // Clear components
  rimraf.sync(paths.componentsPath)

  // Clear index file
  rimraf.sync(paths.indexPath)

  rimraf.sync(paths.rootIndexPath)

  // recreate icon folder
  fs.mkdirSync(paths.componentsPath)
}

export default doCleanUp
