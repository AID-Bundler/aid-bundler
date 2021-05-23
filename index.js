#!/usr/bin/env node

const { AIDData } = require('./src/aidData')
const { CommandHandler, Command } = require('./src/commandHandler')

class Pipeline {
  constructor () {
    this.plugins = []
    this.commandHandler = new CommandHandler()
  }

  addPlugin (plugin) {
    this.plugins.push(plugin)
  }

  build () {
    global.inputModifier = (text, state, info, worldEntries, history, memory) => {
      const data = new AIDData(text, state, info, worldEntries, history, memory, 'input')
      const command = this.commandHandler.checkCommand(data)

      if (!command?.stopsPlugins) {
        for (const plugin of this.plugins) {
          plugin.inputModifier(data)
        }
      }

      return data.finalizeOutput()
    }

    global.contextModifier = (text, state, info, worldEntries, history, memory) => {
      const data = new AIDData(text, state, info, worldEntries, history, memory, 'context')

      for (const plugin of this.plugins) {
        plugin.contextModifier(data)
      }

      return data.finalizeOutput()
    }

    global.outputModifier = (text, state, info, worldEntries, history, memory) => {
      const data = new AIDData(text, state, info, worldEntries, history, memory, 'output')

      for (const plugin of this.plugins) {
        plugin.outputModifier(data)
      }

      return data.finalizeOutput()
    }
  }
}

class Plugin {
  constructor (name, inputModifier = () => {}, contextModifier = () => {}, outputModifier = () => {}) {
    this.name = name
    this.inputModifier = inputModifier
    this.contextModifier = contextModifier
    this.outputModifier = outputModifier
  }
}

module.exports = {
  Pipeline,
  Plugin,
  Command
}
