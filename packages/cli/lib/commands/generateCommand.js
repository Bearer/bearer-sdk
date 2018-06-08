const copy = require('copy-template-dir')
const path = require('path')
const inquirer = require('inquirer')
const Case = require('case')

const INTENT = 'intent'
const SCREEN = 'screen'
const COLLECTION = 'GetCollection'
const SINGLE_RESOURCE = 'GetObject'

const generate = (emitter, { rootPathRc }) => async () => {
  if (!rootPathRc) {
    emitter.emit('rootPath:doesntExist')
    process.exit(1)
  }

  const { template, name } = await inquirer.prompt([
    {
      message: 'What do you want to generate',
      type: 'list',
      name: 'template',
      choices: [
        {
          name: 'Intent',
          value: INTENT
        },
        {
          name: 'Screen',
          value: SCREEN
        }
      ]
    },
    {
      message: 'Give it a name',
      type: 'input',
      name: 'name'
    }
  ])

  const params = { emitter, rootPathRc, name }
  switch (template) {
    case INTENT:
      generateIntent(params)
      break
    case SCREEN:
      await generateScreen(params)
      break
    default:
  }
}

function generateScreen({ emitter, rootPathRc, name }) {
  const componentName = Case.pascal(name)
  const vars = {
    screenName: componentName,
    componentTagName: Case.kebab(componentName)
  }
  const inDir = path.join(__dirname, 'templates/generate/screen')
  const outDir = path.join(path.dirname(rootPathRc), 'screens/src/components')

  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err
    createdFiles.forEach(filePath =>
      emitter.emit('generateIntent:fileGenerated', filePath)
    )
  })
}

async function generateIntent({ emitter, rootPathRc, name }) {
  const { intentType } = await inquirer.prompt([
    {
      message: 'What type of intent do you wan to generate',
      type: 'list',
      name: 'intentType',
      choices: [
        {
          name: 'Collection',
          value: COLLECTION
        },
        {
          name: 'Single resource',
          value: SINGLE_RESOURCE
        }
      ]
    }
  ])
  const vars = { intentName: name, intentType }
  const inDir = path.join(__dirname, 'templates/generate/intent')
  const outDir = path.join(path.dirname(rootPathRc), 'intents')
  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err
    createdFiles.forEach(filePath =>
      emitter.emit('generateIntent:fileGenerated', filePath)
    )
  })
}

module.exports = {
  useWith: (program, emitter, config) => {
    program
      .command('generate')
      .alias('g')
      .description(
        `Generate intent or screen.
    $ bearer generate
`
      )
      // .option('-t, --type <intentType>', 'Intent type.')
      .action(generate(emitter, config))
  }
}
