const sass = require('@stencil/sass')

exports.config = {
  namespace: 'bearer-demo',
  plugins: [sass({ injectGlobalPaths: ['../src/globals/base.scss'] })],
  copy: [{ src: 'oauth-iframe.html' }],
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ]
}

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
