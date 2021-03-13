const $$givenPlayerMemory = Symbol("AIDData.givenPlayerMemory")

class AIDData {
  constructor (text, state, info, worldEntries, history, memory) {
    this.text = text
    this.state = state
    this.info = info
    this.worldEntries = worldEntries
    this.history = history
    this.playerMemory = memory
    this[$$givenPlayerMemory] = memory
    this.useAI = true
    delete state.message
  }

  finalizeOutput () {
    return {
      text: this.text,
      stop: !this.useAI
    }
  }

  set message (value) {
    this.state.message = value
  }

  get message () {
    return this.state.message
  }

  get givenPlayerMemory () {
    return this[$$givenPlayerMemory]
  }

  get actionCount () {
    return this.info.actionCount
  }

  get characters () {
    return this.info.characters
  }

  get memoryLength () {
    return this.info.memoryLength
  }

  get maxChars () {
    return this.info.maxChars
  }
}

module.exports = {
  AIDData
}
