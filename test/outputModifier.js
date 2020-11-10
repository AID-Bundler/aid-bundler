module.exports = function (text, state, info, worldEntries) {
  text += '\nThis was the output text.'
  return { text: text }
}