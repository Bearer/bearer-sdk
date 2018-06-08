const sass = require('@stencil/sass')

exports.config = {
  namespace: 'bearer-ui',
  plugins: [
    sass({
      injectGlobalPaths: ['src/globals/base.scss']
    })
  ],
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
