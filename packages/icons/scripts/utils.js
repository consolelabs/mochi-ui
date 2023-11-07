const path = require('node:path')
const fsPromise = require('node:fs/promises')
const fs = require('node:fs')
const glob = require('glob')
const prettier = require('prettier')
const { transform } = require('@svgr/core')

const prettierConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc')).toString(),
)

const reactJsxCode = `import React from 'react'\n`

const formatCode = (code) =>
  prettier.format(code, { parser: 'babel-ts', ...prettierConfig })

const kebab2Pascal = (inputStr) =>
  inputStr
    .split('-')
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
    .join('')

function deleteFirstLine(str) {
  const lines = str.split('\n')
  lines.shift() // Remove the first line
  return lines.join('\n')
}

const generateSvgs = async () => {
  const svgFilePaths = glob.sync('./src/svg/*.svg')

  let exportContent = ''

  await Promise.all(
    svgFilePaths.map(async (svgFilePath) => {
      const content = await fsPromise.readFile(svgFilePath, {
        encoding: 'utf8',
      })
      //setting-bar
      const baseNameWithoutExtension = path.basename(svgFilePath, '.svg')
      //IconSettingBar
      const componentName = `Icon${kebab2Pascal(baseNameWithoutExtension)}`

      const code =
        reactJsxCode +
        (await transform(
          content,
          {
            typescript: true,
            icon: true,
            plugins: ['@svgr/plugin-jsx'],
          },
          { componentName },
        ))

      exportContent += `export { default as ${componentName} } from './components/icon-${baseNameWithoutExtension}'\n`

      await fsPromise.writeFile(
        path.resolve(
          __dirname,
          '../src/components/',
          `icon-${baseNameWithoutExtension}.tsx`,
        ),
        await formatCode(deleteFirstLine(code)),
      )
    }),
  )

  await fsPromise.writeFile(
    path.resolve(__dirname, '../src/index.ts'),
    exportContent,
  )
}

module.exports = {
  generateSvgs,
}
