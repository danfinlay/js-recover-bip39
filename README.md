# Bip39 Mnemonic Recovery

Allows the recovery of mnemonics using only the first four letters of each word.

Designed for use with the CryptoSteel wallet, which only stores four letters per word.

While hardware wallets like Ledger and Trezor already have built-in this functionality, here I've made it a JS module for reuse.

## Usage

```javascript
var recoverMnemonicFromTruncated = require('recover-bip39')
var truncated = 'cart tong pref impr sell dete alte enac virt long join ice'

var recovered = recoverMnemonicFromTruncated(truncated)
assert.equal(recovered, 'cart tongue prefer improve sell detect alter enact virtual long join ice<Paste>')
```

