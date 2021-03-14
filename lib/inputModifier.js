const modifier = (text) => {
  return global.inputModifier(text, state, info, worldEntries, history, memory)
}

// Don't modify this part
modifier(text)
