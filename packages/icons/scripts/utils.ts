/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import fsPromise from 'node:fs/promises'
import { glob } from 'glob'
import { transform } from '@svgr/core'
import * as paths from './paths'

const kebab2Pascal = (inputStr: string) =>
  inputStr
    .split('-')
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
    .join('')

function deleteFirstLine(str: string) {
  const lines = str.split('\n')
  lines?.shift() // Remove the first line
  return lines.join('\n')
}

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const generateSvgs = async () => {
  const dirList = getDirectories(paths.svgPath)
  let exportContent = ''
  console.log(`Found svg dirs: ${dirList.join(', ')}`)

  const promiseCreateComponents = dirList.map(async (dir) => {
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
        //IconSettingBar
        const componentName = `Icon${kebab2Pascal(baseNameWithoutExtension)}`

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
          `${dirPath}/icon-${baseNameWithoutExtension}.tsx`,
          deleteFirstLine(code),
        )
        dirIndexContent += `export { default as ${componentName} } from './icon-${baseNameWithoutExtension}'\n`
      }),
    )

    const dirIndexFile = `${dirPath}/index.ts`
    await fsPromise.writeFile(dirIndexFile, dirIndexContent)

    exportContent += `export * from './${dir}'\n`
  })

  await Promise.all(promiseCreateComponents)

  await fsPromise.writeFile(paths.indexPath, exportContent)

  await fsPromise.writeFile(
    paths.rootIndexPath,
    `export * from './components'\n`,
  )
}

export { generateSvgs }
