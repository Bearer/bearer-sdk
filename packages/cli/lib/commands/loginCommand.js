const inquirer = require('inquirer')
const serviceClient = require('../serviceClient')

const login = (emitter, config) => async ({ email }) => {
  let {
    bearerConfig: { Username }
  } = config
  if (!Username && !email) {
    emitter.emit('username:missing')
    process.exit(1)
  }

  if (!!email) Username = email

  emitter.emit('login:userFound', Username)
  try {
    const { IntegrationServiceUrl } = config
    const client = serviceClient(IntegrationServiceUrl)
    const { Password } = await inquirer.prompt([
      {
        message: `Please enter password:`,
        type: 'password',
        name: 'Password'
      }
    ])

    const res = await client.login({ Username, Password })

    if (res.statusCode == 200) {
      config.storeBearerConfig({
        ...res.body.user,
        authorization: res.body.authorization
      })
      emitter.emit('login:success', res.body)
    } else emitter.emit('login:failure', res.body)
  } catch (e) {
    emitter.emit('login:error', e)
  }
}
module.exports = {
  useWith: (program, emitter, config) => {
    program
      .command('login')
      .description(
        `Login to Bearer.
    $ bearer login
`
      )
      .option('-e, --email <email>', 'User email.')
      .action(login(emitter, config))
  }
}
