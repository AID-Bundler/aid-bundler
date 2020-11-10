module.exports = function (text, state, info, worldEntries) {
  text += '\nThis was the input text.'
  return { text: text }
}