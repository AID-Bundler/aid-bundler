const modifier = (text) => {
  return global.contextModifier(text, state, info, worldEntries, history)
}

// Don't modify this part
modifier(text)
