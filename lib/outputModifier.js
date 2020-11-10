const modifier = (text) => {
  return global.outputModifier(text, state, info, worldEntries)
}

// Don't modify this part
modifier(text)
