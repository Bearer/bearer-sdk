const inquirer = require('inquirer')
const serviceClient = require('../serviceClient')

const signup = (emitter, config) => async ({ email }) => {
  const { IntegrationServiceUrl } = config
  const client = serviceClient(IntegrationServiceUrl)
  try {
    const answers = await inquirer.prompt([
      {
        message: 'Setup a new password: ',
        type: 'password',
        name: 'Password'
      }
    ])

    const res = await client.signup({ Username: email, ...answers })

    if (res.statusCode == 200) {
      config.storeBearerConfig(res.body)
      emitter.emit('signup:success', res.body)
    } else emitter.emit('signup:failure', res.body)
  } catch (e) {
    emitter.emit('signup:error', e)
  }
}
module.exports = {
  useWith: (program, emitter, config) => {
    program
      .command('signup')
      .description(
        `Signup a new user.
    $ bearer signup --email alice@vendors.inc
`
      )
      .option('-e, --email <email>', 'User email.')
      .action(signup(emitter, config))
  }
}
