/* eslint-disable no-console -- to enable the console log statements when generating icons */
const fs = require('node:fs')
const path = require('node:path')
const rimraf = require('rimraf')
const { generateSvgs, exportSvgs } = require('./utils')

const iconsPath = path.resolve(__dirname, '../src/icons/components/')
// recreate icon folder, clear possible stale file
rimraf.sync(iconsPath)
fs.mkdirSync(iconsPath)

generateSvgs().then(() => {
  console.log('generate svg components successfully')
  exportSvgs().then(() => {
    console.log('export svg components successfully')
  })
})
