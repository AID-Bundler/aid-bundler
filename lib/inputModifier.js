const modifier = (text) => {
  return global.inputModifier(text, state, info, worldEntries, history)
}

// Don't modify this part
modifier(text)
