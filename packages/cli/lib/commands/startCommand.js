const start = (emitter, config) => () => {
  try {
    emitter.emit('start:generate:buildFolder')
    // Create hidden folder
    emitter.emit('start:generate:stencilConfig')
    // Copy stencil.config.json
    emitter.emit('start:symlinkNodeModules')
    // symlink node_modules
    emitter.emit('start:symlinkPackage')
    // symlink package.json
    emitter.emit('start:watchers')
    // Launch in ||
    //    bearer-tsc
    //    stencil-dev-server
  } catch (e) {
    emitter.emit('start:failed', { error: e })
  }
}

module.exports = {
  useWith: (program, emitter, config) => {
    program
      .command('start')
      .description(
        `Start local development server.
    $ bearer start
`
      )
      .action(start(emitter, config))
  }
}
