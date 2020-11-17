#!/usr/bin/env node

const args = process.argv.slice(2)
if (args.length !== 1) {
  console.log('Usage: aid-bundler <main-script-path>')
  process.exit(1)
}

const browserify = require('browserify')
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

const fileStream = fs.createWriteStream(sharedFile)
fileStream.on('finish', zip)

const b = browserify(args[0]).bundle()
b.on('error', errorExit)
b.pipe(fileStream)

function errorExit (err) {
  if (err.stack) {
    console.error(err.stack)
  } else {
    console.error(String(err))
  }
  process.exit(1)
}

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
    if (err) console.log(err)
  })
}
