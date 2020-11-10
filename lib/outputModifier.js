const modifier = (text) => {
  return global.outputModifier(text, state, info, worldEntries, history)
}

// Don't modify this part
modifier(text)
