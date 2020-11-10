module.exports = function (text, state, info, worldEntries, history) {
  text += '\nThis was the context text.'
  return { text: text }
}