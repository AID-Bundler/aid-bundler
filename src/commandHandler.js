class CommandHandler {
  constructor () {
    this.commands = []
    this.commandPrefix = '/'
    this.hideCommand = true
    this.declareCommand = true
  }

  addCommand (command) {
    this.commands.push(command)
  }

  checkCommand (data) {
    const rawText = data.text.trim()
    const elem = new RegExp(`^\\s*(\\>\\s+)?([yY]ou\\s+)?(say\\s+)?(\\")?\\${this.commandPrefix}(\\b\\w+\\b)\\s*(.*?)(\\4)(\\.)?\\s*$`, 'g').exec(rawText)

    if (!elem) return

    const cmd = elem[5].trim().toLowerCase()
    const args = elem[6].trim().match(/(?:[^\s"]+|"[^"]*")+/g) || []

    for (const command of this.commands) {
      if (command.name === cmd) {
        if (this.hideCommand) {
          data.text = ''

          if (!data.message && this.declareCommand) {
            const commandText = this.commandPrefix + command.name + (args.length > 0 ? ' ' + args.join(' ') : '')
            data.message = `Executed ${commandText}`
          }
        }

        command.run(data, args)
        return command
      }
    }
  }
}

class Command {
  constructor (name, handler) {
    this.name = name
    this.handler = handler
    this.stopsPlugins = true
  }

  run (data, args) {
    this.handler(data, args)
  }
}

module.exports = {
  CommandHandler,
  Command
}
