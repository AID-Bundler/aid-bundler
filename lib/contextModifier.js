const modifier = (text) => {
  return global.contextModifier(text, state, info, worldEntries)
}

// Don't modify this part
modifier(text)
