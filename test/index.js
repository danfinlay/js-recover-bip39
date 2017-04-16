var Keyring = require('eth-hd-keyring')
var bip39 = require('bip39')
var words = require('bip39/wordlists/english.json')
var recoverMnemonicFromTruncated = require('../')

var test = require('tape')

test('mnemonic recovery in a loop', function (t) {
  runTests(t)
})

async function runTests (t) {
  for (var i = 0; i < 1000; i++) {
    await runTest(t)
  }
  t.end()
}

async function runTest(t) {
  var first = new Keyring()
  var second

  let firstAccount

  first.addAccounts()
  .then((accounts) => {
    firstAccount = accounts[0]
    return first.serialize()
  })
  .then((serialized) => {
    var mnemonic = serialized.mnemonic
    var words = mnemonic.split(' ')
    var truncated = words.map(word => word.substr(0, 4))
    var truncatedMnemonic = truncated.join(' ')
    var recovered = recoverMnemonicFromTruncated(truncatedMnemonic)

    t.equal(recovered, mnemonic, 'should generate same mnemonic')
    var valid = bip39.validateMnemonic(truncatedMnemonic)

    second = new Keyring({
      mnemonic: recovered,
      numberOfAccounts: 0,
    })
    return second.addAccounts()
  })
  .then(() => { return second.getAccounts() })
  .then((accounts) => {
    t.equal(accounts[0], firstAccount, 'generate same first account')
    return
  })
  .catch((reason) => {
    t.notOk(reason, 'should not fail')
  })
}

