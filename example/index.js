var recoverMnemonicFromTruncated = require('../')

recoverButton.addEventListener('click', function() {

  var old = truncated.value
  var result = recoverMnemonicFromTruncated(old)
  output.innerText = result

})
