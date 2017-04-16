var words = require('bip39/wordlists/english.json')

function recoverMnemonicFromTruncated (truncatedMnemonic) {
  var restored = truncatedMnemonic.split(' ').map((shortWord) => {
    if (shortWord.length < 4) {
      return shortWord
    }
    let found
    words.forEach((word) => {
      if (word.indexOf(shortWord) === 0) {
        found = word
        return word
      }
    })
    return found
  })
  return restored.join(' ')
}

module.exports = recoverMnemonicFromTruncated
