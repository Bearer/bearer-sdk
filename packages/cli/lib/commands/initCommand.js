const copy = require('copy-template-dir')
const path = require('path')
const Case = require('case')

const init = emitter => scenarioTitle => {
  const vars = {
    scenarioTitle,
    componentTagName: Case.kebab(Case.camel(scenarioTitle))
  }
  const inDir = path.join(__dirname, 'templates', 'init')
  const outDir = process.cwd()

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
      .command('new <scenarioTitle>')
      .description(
        `Start a new scenario.
    $ bearer new myScenario
`
      )
      .action(init(emitter, config))
  }
}
