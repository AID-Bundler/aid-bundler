const { Pipeline, Plugin } = require('aid-bundler')

function inputMod (data) {
  data.text += '\nInput Text.'

  if (!data.state.actionCount) data.state.actionCount = 0
  data.state.actionCount++
}

function contextMod (data) {
  data.text += '\nContext text.'
}

function outputMod (data) {
  data.text += '\nOutput text.'
}

const pipeline = new Pipeline()
const pluginA = new Plugin('Plugin A', inputMod, contextMod, outputMod)

pipeline.addPlugin(pluginA)
pipeline.build()