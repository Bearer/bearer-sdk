const inquirer = require('inquirer')
const request = require('request')
const PATH = 'signup'

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

const signup = (emitter, config) => async ({ email }) => {
  try {
    const { ApiRouterUrl } = config
    const answers = await inquirer.prompt([
      {
        message: 'Setup a new password: ',
        type: 'password',
        name: 'Password'
      }
    ])

    const body = { Username: email, ...answers }

    const res = await post(ApiRouterUrl, body)

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
