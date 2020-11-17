const name = require('./subfolder/utils').name

module.exports = function (text, state, info, worldEntries, history) {
  text += '\nThis was the output text.'
  text += '\nHello ' + name + '.'
  return { text: text }
}
