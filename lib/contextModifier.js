const modifier = (text) => {
  return global.contextModifier(text, state, info, worldEntries, history, memory)
}

// Don't modify this part
modifier(text)
