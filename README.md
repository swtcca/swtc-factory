# The SWTC Base Factory JavaScript Library

swtc-factory == jcc-jingtum-base-lib

## with enhancements

1. supports more wallets for different chains
   > - ripple, bitcoin
   > - call, stream
   > - jingtum, bizain
2. supports `ed25519` algorithm for seed

## usages

```javascript
> .load test.js
const Factory = require('swtc-factory').Wallet
const KeyPair = require('swtc-factory').KeyPair
const SwtcChains = require('swtc-chains')
var seed, secret, keypairs, wallet
SwtcChains.forEach( chain => {
        let token = chain.currency
	let kp = new KeyPair(token)
	console.log(`\t... with secp256k1 ...`)
	seed = kp.generateSeed()
	console.log(`${token} seed:\t${seed}`)
	wallet = new Factory(seed, token)
	console.log(`${token} address:\t${wallet.address()}`)
	console.log(`${token} secret:\t${wallet.secret()}`)
	console.log(`\t... with ed25519 ...`)
	seed = kp.generateSeed({algorithm: 'ed25519'}, 'param2')
	console.log(`${token} seed:\t${seed}`)
	wallet = new Factory(seed, token)
	console.log(`${token} address:\t${wallet.address()}`)
	console.log(`${token} secret:\t${wallet.secret()}`)
})

	... with secp256k1 ...
BTC seed:	33N3pJmWjxfRWrFY1Q3X19wAY6yCQ
BTC address:	1P5MNsEsvn4MpP9jeHAgAFZppYodE7Enjt
BTC secret:	33N3pJmWjxfRWrFY1Q3X19wAY6yCQ
	... with ed25519 ...
BTC seed:	3FdStd99Af5EDmjHNTEhZginWM1KTcP
BTC address:	1FaRNQDdK1ofouU3Ra7LLmCcGfCGtrB6Jk
BTC secret:	3FdStd99Af5EDmjHNTEhZginWM1KTcP
	... with secp256k1 ...
XRP seed:	sspFvWvec7EdWfq9BEbbZ7aJoCEDm
XRP address:	rw2Q8MFdHjrVQoMWzepbznZhn5JXa12e7d
XRP secret:	sspFvWvec7EdWfq9BEbbZ7aJoCEDm
	... with ed25519 ...
XRP seed:	sEdVLF4qRSL5gY91pe9ZkcfD3EZNEMj
XRP address:	rQsinuNQeqE94FdmFmfoNoguf3xm4NCrFp
XRP secret:	sEdVLF4qRSL5gY91pe9ZkcfD3EZNEMj
	... with secp256k1 ...
XLM seed:	phDM3ebCa68FrQ8h8kHupRcNsAu6U
XLM address:	gh4bQruv5cgDpLZEtQhWZwnSkzF2Fmp15k
XLM secret:	phDM3ebCa68FrQ8h8kHupRcNsAu6U
	... with ed25519 ...
XLM seed:	pEdTp6qxLUsckQK5EaxZZS5rDCMiJzy
XLM address:	gnPbJ1QivftmkSKdyLwTHA8G7gAZrGtTXS
XLM secret:	pEdTp6qxLUsckQK5EaxZZS5rDCMiJzy
	... with secp256k1 ...
CALL seed:	shL8xaejGwsCagboL4VbLUvwWuBdV
CALL address:	cPm5WrxV1F1qNP5pMxwodvMqzgtW6mpmWo
CALL secret:	shL8xaejGwsCagboL4VbLUvwWuBdV
	... with ed25519 ...
CALL seed:	sEd7bcufGVwFXXAxjEPNcaw7ebaQn3y
CALL address:	cDdZHCfoRu4T3RgHQHqnXHodDaDK4sTuvF
CALL secret:	sEd7bcufGVwFXXAxjEPNcaw7ebaQn3y
	... with secp256k1 ...
STM seed:	shP27HjhvsfPqEae7Y86EJMAvH4oD
STM address:	vnV2SxUdLtCp9EmHYTF1YEubu7Fq58bjj5
STM secret:	shP27HjhvsfPqEae7Y86EJMAvH4oD
	... with ed25519 ...
STM seed:	sEdTqfaH8CtX6j1xXTtaFT1X2P3FjFr
STM address:	vLhUR8Qon94eQHhoRMt3Xp4YuauoXM9mt1
STM secret:	sEdTqfaH8CtX6j1xXTtaFT1X2P3FjFr
	... with secp256k1 ...
SWT seed:	sssRUkjDFN256xSFMo9JnNRSARuKJ
SWT address:	j95kK4zRi4G2Gb44HTXzKRoLDk7AVHhQm4
SWT secret:	sssRUkjDFN256xSFMo9JnNRSARuKJ
	... with ed25519 ...
SWT seed:	sEdTHzL93dXknpafWS2gDpukxNAhQUE
SWT address:	jhbqxuyeZSrCftHuTLGY5zdgwJkbPWdaCh
SWT secret:	sEdTHzL93dXknpafWS2gDpukxNAhQUE
	... with secp256k1 ...
BWT seed:	shpy12BrDuqbUG4c2cy9hmP4NJmnd
BWT address:	b9KFYEpLr8KGp3AMh6n1qW7iC88MbZdnTe
BWT secret:	shpy12BrDuqbUG4c2cy9hmP4NJmnd
	... with ed25519 ...
BWT seed:	sEdV66spM8n5h2MwRQ5PzSepLu2Q2gG
BWT address:	bEn4ZGNpUGRpThFDY78MXmLHfwvtadu7BK
BWT secret:	sEdV66spM8n5h2MwRQ5PzSepLu2Q2gG
```
