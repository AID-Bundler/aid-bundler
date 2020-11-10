module.exports = function (text, state, info, worldEntries) {
  text += '\nThis was the context text.'
  return { text: text }
}