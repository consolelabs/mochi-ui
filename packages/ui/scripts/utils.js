const path = require('node:path')
const fsPromise = require('node:fs/promises')
const fs = require('node:fs')
const glob = require('glob')
const prettier = require('prettier')

const prettierConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.prettierrc')).toString(),
)

const formatCode = (code) =>
  prettier.format(code, { parser: 'babel-ts', ...prettierConfig })

const generateIconComponentContent = (componentName, path) => {
  return formatCode(
    `
// This file is generated using scripts/generate-icon-components/utils.js
// Don't edit it manually
import ${componentName} from '../${path.replace('src/icons/', '')}'

export { ${componentName} };
`,
  )
}

const kebab2Pascal = (inputStr) =>
  inputStr
    .split('-')
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
    .join('')

const getSvgInfos = () => {
  const svgFilePaths = glob.sync('./src/icons/svg/*.svg')

  //assets/icons/setting-bar.svg
  return Promise.all(
    svgFilePaths.map(async (svgFilePath) => {
      //setting-bar
      const baseNameWithoutExtension = path.basename(svgFilePath, '.svg')
      //IconSettingBar
      const componentName = `Icon${kebab2Pascal(baseNameWithoutExtension)}`

      return {
        componentContent: await generateIconComponentContent(
          componentName,
          svgFilePath,
        ),
        componentName,
        componentFilename: `icon-${baseNameWithoutExtension}`,
      }
    }),
  )
}

const generateFileBasedOnSvgInfo = (svgInfo) => {
  const filePath = path.resolve(
    __dirname,
    '../src/icons/components/',
    `${svgInfo.componentFilename}.tsx`,
  )

  return fsPromise.writeFile(filePath, svgInfo.componentContent)
}

const generateIndexFileContent = (svgInfos) =>
  `// This file is generated using scripts/generate-icon-components/utils.js
// Don't edit it manually
${svgInfos
  .map(
    ({ componentName, componentFilename }) =>
      `export { default as ${componentName} } from './components/${componentFilename}';`,
  )
  .join('\n')
  .trim()}`

const generateStoryBookContent = (svgInfos) => {
  const importStatements = svgInfos
    .map(
      ({ componentName, componentFilename }) =>
        `import {${componentName}} from './components/${componentFilename}';`,
    )
    .join('\n')
    .trim()

  const iconInitializer = svgInfos
    .map(({ componentName }) => `[${componentName}, '${componentName}']`)
    .join(',')
    .trim()

  const tpl = formatCode(`
// This file is generated using scripts/generate-icon-components/utils.js
// Don't edit it manually
import React from 'react';
${importStatements}

const icons: [React.FC<React.SVGProps<SVGSVGElement>>, string][] = [${iconInitializer}];

export default {
  title: 'components/icons',
}

export const AllIcons = () => (
  <div className="flex flex-wrap">
    {icons.map(([Icon, displayName], index) => (
      <div
        key={index}
        className="flex flex-col items-center py-4 w-1/6 border border-gray-100"
      >
        <Icon className="w-5 h-5" />
        <code className="inline-block py-1 px-2 mt-3 text-sm bg-gray-100 rounded">
          {displayName}
        </code>
      </div>
    ))}
  </div>
)

AllIcons.story = {
  name: 'all icons',
}
  `)

  return tpl
}

module.exports = {
  getSvgInfos,
  generateFileBasedOnSvgInfo,
  generateIndexFileContent,
  generateStoryBookContent,
}
