import fs from 'fs'

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const checkFolder = (folderPath: string) => {
  // Throw error if folder path doesn't exist
  if (!folderPath) {
    throw Error('Folder path is required')
  }

  // Check folder exists in the path using `fs.existsSync`
  const isFolderExist = fs.existsSync(folderPath)
  return isFolderExist
}

const kebab2Pascal = (inputStr: string) =>
  inputStr
    .split('-')
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
    .join('')

export { getDirectories, checkFolder, kebab2Pascal }
