module.exports = ({ intents }) => {
  return intents
    .map(Object.keys)
    .map(
      intent => `
const ${intent} = require("./${intent}");
module.exports[${intent}.intentName] = ${intent}.intentType.intent(${intent}.action);
`
    )
    .join('\n')
}
