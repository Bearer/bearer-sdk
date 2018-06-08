const path = require('path')
const globby = require('globby')
const fs = require('graceful-fs')

module.exports = (archive, packagePath) => {
  const fullPath = path.resolve(packagePath)
  return globby([
    fullPath,
    `!${fullPath}/**/*.test.js`,
    `!${fullPath}/**/*.zip`,
    `!${fullPath}/**/*.log`,
    `!${fullPath}/**/*readme.md`,
    `!${fullPath}/**/*README.md`,
    `!${fullPath}/**/*.spec.js`
  ])
    .then(files => {
      files.forEach(file => {
        archive.append(fs.createReadStream(file), {
          name: file.replace(path.resolve(packagePath), '')
        })
      })
    })
    .catch(console.error)
}
