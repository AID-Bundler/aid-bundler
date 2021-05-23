#!/usr/bin/env node

const args = process.argv.slice(2)
if (args.length !== 1) {
  console.log('Usage: aid-bundler <main-script-path>')
  process.exit(1)
}

const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')

const buildDir = path.dirname('.') + '/build'
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir)
}

const inputModFile = './build/inputModifier.js'
const contextModFile = './build/contextModifier.js'
const outputModFile = './build/outputModifier.js'
const sharedFile = './build/shared.js'

webpack(
  {
    entry: args[0],
    output: {
      path: path.resolve(path.dirname(sharedFile)),
      filename: path.basename(sharedFile)
    },
    module: {
      rules: [
        {
          test: /.[mc]?js$/,
          use: [
            require.resolve('shebang-loader'),
            require.resolve('stripcomment-loader')
          ]
        }
      ]
    },
    mode: 'production',
    optimization: {
      nodeEnv: false,
      moduleIds: 'named',
      mangleExports: false,
      minimize: false
    }
  },
  (err, stats) => {
    let didError = false

    if (err) {
      console.error(err.stack || err)
      didError = true
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      for (const wpError of info.errors) {
        console.error(wpError.stack || wpError)
      }
      didError = true
    }

    if (stats.hasWarnings()) {
      for (const wpWarning of info.warnings) {
        console.warn(wpWarning)
      }
    }

    if (!didError) return zip()

    process.exit(1)
  }
)

function zip () {
  fs.copyFileSync(require.resolve('./lib/inputModifier.js'), inputModFile)
  fs.copyFileSync(require.resolve('./lib/contextModifier.js'), contextModFile)
  fs.copyFileSync(require.resolve('./lib/outputModifier.js'), outputModFile)

  const zip = new AdmZip()
  zip.addLocalFile(inputModFile)
  zip.addLocalFile(contextModFile)
  zip.addLocalFile(outputModFile)
  zip.addLocalFile(sharedFile)
  zip.writeZip(buildDir + '/script.zip', (err) => {
    if (err) console.error(err)
  })
}
