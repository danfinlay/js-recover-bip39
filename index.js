var Keyring = require('eth-hd-keyring')

var first = new Keyring()

let firstAccount

first.addAccounts()
.then((accounts) => {
  firstAccount = accounts[0]
  console.log('generated account ' + firstAccount)
  return first.serialize()
})
.then((serialized) => {
  var mnemonic = serialized.mnemonic
  var words = mnemonic.split(' ')
  var truncated = words.map(word => word.substr(0, 4))
  var truncatedMnemonic = truncated.join(' ')

  var second = new Keyring({
    mnemonic: truncatedMnemonic,
    numberOfAccounts: 2,
  })
  return second.addAccounts()
})
.then((accounts) => {
  console.log('generated account ' + accounts[0])

  if (accounts[0] !== firstAccount) {
    throw new Error('Did not generate same accounts, you just lost your savings.')
  }
})
.catch((reason) => {
  console.log('failed because',reason)
})

