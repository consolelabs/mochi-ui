/* eslint-disable import/no-relative-packages */
/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import fsPromise from 'node:fs/promises'
import { glob } from 'glob'
import { transform } from '@svgr/core'
import chalk from 'chalk'
import * as paths from './paths'
import doCleanUp from './clean'
import { getDirectories, kebab2Pascal } from '../../../scripts/script-utils'

function deleteFirstLine(str: string) {
  const lines = str.split('\n')
  lines?.shift() // Remove the first line
  return lines.join('\n')
}

const supportedDirNamesType = ['line', 'outlined', 'solid', 'two-tone']

/**
 * Generates icon components from SVG files in the specified directory.
 * The generated components are exported and organized in a directory structure based on the SVG file's parent folder.
 * Each SVG file is transformed into a TypeScript component using SVGR.
 * The generated components are saved as individual files and an index file is created for each directory.
 * The generated components and index files are exported for easy import.
 */
const generateSvgs = async () => {
  const dirList = getDirectories(paths.svgPath)
  let exportContent = ''
  console.log(
    chalk.bgBlue.yellow(
      `Generate icon naming with folder only support named folders are: ${supportedDirNamesType.join(
        ', ',
      )}`,
    ),
  )
  console.log(chalk.green(`Found svg dirs: ${dirList.join(', ')}`))

  const promiseCreateComponents = dirList.map(async (dir) => {
    const dirFiles = fs.readdirSync(`${paths.svgPath}/${dir}`, {
      withFileTypes: true,
    })
    const files = dirFiles.filter((d) => d.isFile())
    if (!files.length) {
      console.log(
        chalk.redBright(`Detected: "${dir}" directory is empty files!`),
      )
      return
    }

    let dirIndexContent = ''
    const dirPath = `${paths.componentsPath}/${dir}`
    fs.mkdirSync(dirPath)
    const srcPath = `${paths.svgPath}/${dir}/*.svg`
    const svgFilePaths = glob.sync(srcPath)

    await Promise.all(
      svgFilePaths.map(async (svgFilePath) => {
        const content = await fsPromise.readFile(svgFilePath, {
          encoding: 'utf8',
        })
        //setting-bar
        const baseNameWithoutExtension = path.basename(svgFilePath, '.svg')

        /**
         * The suffix to be added to the icon component name based on the directory name.
         * If the directory name is included in the supported directory names, a hyphen followed by the directory name will be added.
         * Otherwise, an empty string will be added.
         */
        const dirType = supportedDirNamesType.includes(dir) ? `-${dir}` : ''

        //SettingBar
        const componentName = `${kebab2Pascal(
          `${baseNameWithoutExtension}${dirType}`,
        )}`

        const code = await transform(
          content,
          {
            typescript: true,
            icon: true,
            plugins: ['@svgr/plugin-jsx'],
          },
          { componentName },
        )

        await fsPromise.writeFile(
          `${dirPath}/${baseNameWithoutExtension}.tsx`,
          deleteFirstLine(code),
        )
        dirIndexContent += `export { default as ${componentName} } from './${baseNameWithoutExtension}'\n`
      }),
    )

    const dirIndexFile = `${dirPath}/index.ts`
    await fsPromise.writeFile(dirIndexFile, dirIndexContent)

    exportContent += `export * from './${dir}'\n`
  })

  // Create all components
  await Promise.all(promiseCreateComponents)

  // Create components root index
  await fsPromise.writeFile(paths.indexPath, exportContent)

  // Create source root index
  await fsPromise.writeFile(
    paths.rootIndexPath,
    `export * from './components'\n`,
  )
}

//------------- Main execution
doCleanUp()

generateSvgs().then(() => {
  console.log(
    chalk.green('Generate svg components to JSX components successfully!'),
  )
})
