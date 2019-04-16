"use strict"
// this is only for jcc compatibility use
const SWTC_CHAINS = require("swtc-chains")
const SwtcKeypairs = require("swtc-keypairs")

let KEYPAIRS = {}
SWTC_CHAINS.forEach(chain => {
  KEYPAIRS[chain.code.toLowerCase()] = SwtcKeypairs(chain.code.toLowerCase())
  KEYPAIRS[chain.currency.toLowerCase()] = SwtcKeypairs(
    chain.currency.toLowerCase()
  )
})

class KeyPairs {
  constructor(token = "swt") {
    this._token = token.toLowerCase()
    if (KEYPAIRS[this._token] === undefined) {
      throw new Error(`config of ${token.toLowerCase()} is empty`)
    }
  }

  /**
   * get corresponding Keypair for its _token
   */
  keyPairs() {
    return KEYPAIRS[this._token]
  }
  /**
   * generate random bytes and encode it to secret
   * @returns {string}
   */
  generateSeed() {
    return this.keyPairs().generateSeed()
  }

  /**
   * derive keypair from secret
   * @param {string} secret
   * @returns {{privateKey: string, publicKey: *}}
   */
  deriveKeyPair(secret) {
    return this.keyPairs().deriveKeyPair(secret)
  }

  /**
   * derive wallet address from publickey
   * @param {string} publicKey
   * @returns {string}
   */
  deriveAddress(publicKey) {
    return this.keyPairs().deriveAddress(publicKey)
  }

  /**
   * check is address is valid
   * @param address
   * @returns {boolean}
   */
  checkAddress(address) {
    return this.keyPairs().checkAddress(address)
  }

  /**
   * convert the given address to byte array
   * @param address
   * @returns byte array
   */
  convertAddressToBytes(address) {
    if (this.checkAddress(address)) {
      return this.keyPairs().convertAddressToBytes(address)
    } else {
      throw new Error("convert address to bytes in error")
    }
  }

  /*
   * convert the byte array to wallet address
   */
  convertBytesToAddress(bytes) {
    if (typeof bytes !== "object")
      throw new Error("convert bytes to address in error")
    return this.keyPairs().convertBytesToAddress(bytes)
  }
}

KeyPairs.KEYPAIRS = KEYPAIRS

module.exports = KeyPairs
