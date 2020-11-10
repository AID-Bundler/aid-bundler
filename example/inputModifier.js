module.exports = function (text, state, info, worldEntries, history) {
  text += '\nThis was the input text.'
  return { text: text }
}