import fs from 'node:fs'
import { rimraf } from 'rimraf'
import * as paths from './paths'

rimraf.sync(paths.cleanPackageJsonPath)

const cleanPackageJson = {
  remove: ['devDependencies', 'scripts.postinstall', 'publishConfig'],
  replace: {
    main: './index.js',
    module: './index.mjs',
    types: './index.d.ts',
    exports: {
      '.': {
        types: './index.d.ts',
        import: './index.mjs',
        require: './index.js',
      },
      './package.json': './package.json',
    },
  },
}

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const componentsDir = getDirectories(paths.componentsPath)

const packageExports = componentsDir.reduce((acc, dir) => {
  return {
    ...acc,
    [`./${dir}/*`]: {
      types: `./${dir}/*.d.ts`,
      import: `./${dir}/*.mjs`,
      require: `./${dir}/*.js`,
    },
  }
}, cleanPackageJson.replace.exports)

cleanPackageJson.replace.exports = packageExports
fs.writeFileSync(
  paths.cleanPackageJsonPath,
  `${JSON.stringify(cleanPackageJson, null, 2)}\n`,
)
