import fs from 'node:fs'

/**
 * Retrieves the names of all directories within a given source directory.
 *
 * @param source - The path to the source directory.
 * @returns An array of directory names.
 */
const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

/**
 * Checks if a folder exists at the specified path.
 * @param folderPath - The path of the folder to check.
 * @returns True if the folder exists, false otherwise.
 * @throws Error if the folder path is not provided.
 */
const checkFolder = (folderPath: string) => {
  // Throw error if folder path doesn't exist
  if (!folderPath) {
    throw Error('Folder path is required')
  }

  // Check folder exists in the path using `fs.existsSync`
  const isFolderExist = fs.existsSync(folderPath)
  return isFolderExist
}

/**
 * Converts a kebab-case string to PascalCase.
 *
 * @param inputStr - The kebab-case string to convert.
 * @returns The PascalCase version of the input string.
 */
const kebab2Pascal = (inputStr: string) =>
  inputStr
    .split('-')
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
    .join('')

export { getDirectories, checkFolder, kebab2Pascal }
