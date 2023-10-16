/* eslint-disable no-console -- to enable the console log statements when generating icons */
const fs = require('node:fs')
const path = require('node:path')
const rimraf = require('rimraf')
const { generateSvgs } = require('./utils')

const iconsPath = path.resolve(__dirname, '../src/icons/components/')
// recreate icon folder, clear possible stale file
rimraf.sync(iconsPath)
fs.mkdirSync(iconsPath)

generateSvgs().then(() => {
  console.log('generate svg components successfully')
})
