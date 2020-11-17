const { Pipeline, Command } = require('aid-bundler')

function jumpHandler (data, args) {
  if (data.state.jumpCount == null) {
    data.state.jumpCount = 0
  }

  const count = parseInt(args[0])
  data.state.jumpCount += count

  data.text = `You have jumped ${data.state.jumpCount} times in total!\n`
}

const pipeline = new Pipeline()

const jumpCmd = new Command('jump', jumpHandler)
pipeline.commandHandler.addCommand(jumpCmd)

pipeline.build()

// Now try running `/jump 3` inside the game!
// Works on story, do, and say mode.