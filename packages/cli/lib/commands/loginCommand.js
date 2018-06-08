const inquirer = require('inquirer')
const request = require('request')
const PATH = 'login'

const post = (url, body) =>
  new Promise((resolve, reject) => {
    request(
      {
        method: 'POST',
        uri: url + PATH,
        json: true,
        body
      },
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
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
    const { ApiRouterUrl } = config
    const { Password } = await inquirer.prompt([
      {
        message: `Please enter password:`,
        type: 'password',
        name: 'Password'
      }
    ])

    const body = { Username, Password }

    const res = await post(ApiRouterUrl, body)

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
