import { NodePlopAPI, ActionType } from 'plop'

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const camelCase = (str: string) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
}

function getPrompts(gen: string) {
  const base = [
    {
      type: 'input',
      name: `${gen}Name`,
      message: `Enter ${gen} name in kebab-case:`,

      validate: (value?: string) => {
        if (!value) {
          return `${gen} name is required`
        }

        // check is has a valid hook name "use-something"
        if (gen === 'hook' && !value.startsWith('use-')) {
          return "Hook name must start with 'use-'"
        }

        // check is case is correct
        if (value !== value.toLowerCase()) {
          return `${gen} name must be in lowercase`
        }

        // cannot have spaces
        if (value.includes(' ')) {
          return `${gen} name cannot have spaces`
        }

        return true
      },
    },
    {
      type: 'input',
      name: 'description',
      message: `The description of this ${gen}:`,
    },
  ]

  const outDirPrompt = {
    type: 'list',
    name: 'outDir',
    message: `Where should this ${gen} live?`,
    default: defaultOutDirs[gen as keyof typeof defaultOutDirs],
    choices: workspaces,
    validate: (value?: string) => {
      if (!value) {
        return `outDir is required`
      }

      return true
    },
  }

  if (gen === 'component') {
    return [
      ...base,
      {
        type: 'input',
        name: 'consoleTheme',
        message: `Theme class object from @mochi-ui/theme for import in this ${gen}:`,
        validate: (value?: string) => {
          if (!value) {
            return `Theme class object name is required`
          }

          return true
        },
      },
      outDirPrompt,
      {
        type: 'list',
        name: 'isAppendCore',
        message: `Is this ${gen} need appended to Core package?`,
        default: 'true',
        choices: ['false', 'true'],
      },
    ]
  }
  return [...base, outDirPrompt]
}

function getAppendComponentToCore(): ActionType[] {
  return [
    {
      path: 'packages/core/src/index.ts',
      template: "export * from '@mochi-ui/{{componentName}}'",
      pattern:
        /(\/\/ Plop adding component indicator - do not remove this line)/g,
      type: 'append',
      abortOnFail: true,
    },
    // Append to core packages
    {
      type: 'append',
      path: './packages/core/package.json',
      // With space as intended for matching file format
      template: `    "@mochi-ui/{{componentName}}": "workspace:*",`,
      // Add dependency right below dependencies
      pattern: '"dependencies": {',
      abortOnFail: true,
    },
  ]
}

// Input workspaces for creating components/hooks/utils...
const workspaces = ['components', 'web3']

// Generator input must matching within root plop folders
const generators = ['component']

const defaultOutDirs = {
  //
  component: 'components',
  web3: 'web3',
}

module.exports = function main(plop: NodePlopAPI) {
  plop.setHelper('capitalize', (text) => {
    return capitalize(camelCase(text))
  })
  plop.setHelper('camelCase', (text) => {
    return camelCase(text)
  })

  generators.forEach((gen) => {
    plop.setGenerator(gen, {
      description: `Generates a ${gen}`,
      prompts: getPrompts(gen),
      actions(answers) {
        let actions: ActionType[] = []

        if (!answers) {
          return actions
        }

        const { description, outDir, consoleTheme, isAppendCore } = answers
        const generatorName = answers[`${gen}Name`] ?? ''

        let data = {
          [`${gen}Name`]: generatorName,
          description,
          outDir,
        }

        if (gen === 'component') {
          data = {
            ...data,
            consoleTheme,
          }
          if (isAppendCore === 'true') {
            actions = actions.concat(getAppendComponentToCore())
          }
        }

        actions.push({
          type: 'addMany',
          templateFiles: `plop/${gen}/**`,
          destination: `./packages/{{outDir}}/{{dashCase ${gen}Name}}`,
          globOptions: { dot: true },
          base: `plop/${gen}`,
          data,
          abortOnFail: true,
        })

        return actions
      },
    })
  })
}
