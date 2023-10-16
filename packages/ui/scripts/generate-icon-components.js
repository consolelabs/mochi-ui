/* eslint-disable no-console -- to enable the console log statements when generating icons */
const fs = require('node:fs')
const path = require('node:path')
const rimraf = require('rimraf')
const {
  getSvgInfos,
  generateFileBasedOnSvgInfo,
  generateStoryBookContent,
} = require('./utils')

const iconsPath = path.resolve(__dirname, '../src/icons/components/')
// recreate icon folder, clear possible stale file
rimraf.sync(iconsPath)
fs.mkdirSync(iconsPath)

getSvgInfos().then((svgInfos) => {
  // generate icons in parallel
  Promise.all(svgInfos.map(generateFileBasedOnSvgInfo))
    .then(() => generateStoryBookContent(svgInfos))
    .then((sbContent) => {
      fs.writeFileSync(
        path.resolve(__dirname, '../src/icons/Icons.stories.tsx'),
        sbContent,
      )

      console.log('generate svg components successfully')
    })
    .catch((err) =>
      console.error('error happened during generate svg components', err),
    )
})
