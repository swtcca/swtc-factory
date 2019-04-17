"use strict"

const KeyPairs = require("./keypairs")

class Wallet {
  constructor(secret, token = "swt") {
    try {
      this._kp = new KeyPairs(token)
      this._keypairs = this._kp.deriveKeyPair(secret)
      this._secret = secret
    } catch (err) {
      this._keypairs = null
      this._secret = null
    }
  }

  static generate(token = "swt", options = {}) {
    let kp = new KeyPairs(token)
    let secret = kp.generateSeed(options)
    let keypair = kp.deriveKeyPair(secret)
    let address = kp.deriveAddress(keypair.publicKey)
    return {
      secret,
      address
    }
  }

  static fromSecret(secret, token = "swt") {
    try {
      let kp = new KeyPairs(token)
      let keypair = kp.deriveKeyPair(secret)
      let address = kp.deriveAddress(keypair.publicKey)
      return {
        secret,
        address
      }
    } catch (err) {
      return null
    }
  }

  static isValidAddress(address, token = "swt") {
    let kp = new KeyPairs(token)
    return kp.checkAddress(address)
  }

  static isValidSecret(secret, token = "swt") {
    try {
      let kp = new KeyPairs(token)
      kp.deriveKeyPair(secret)
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * get wallet address
   * @returns {*}
   */
  address() {
    if (!this._keypairs) return null
    let address = this._kp.deriveAddress(this._keypairs.publicKey)
    return address
  }

  /**
   * get wallet secret
   * @returns {*}
   */
  secret() {
    if (!this._keypairs) return null
    return this._secret
  }

  toJson() {
    if (!this._keypairs) return null
    return {
      secret: this.secret(),
      address: this.address()
    }
  }

  /*
   * Get the public key from key pair
   * used for local signing operation.
   */
  getPublicKey() {
    if (!this._keypairs) return null
    return this._keypairs.publicKey
  }

  /**
   * sign message with wallet privatekey
   * @param message
   * @returns {*}
   */
  sign(message) {
    if (!message) return null
    if (!this._keypairs) return null
    let privateKey = this._keypairs.privateKey
    // Export DER encoded signature in Array
    return this._kp.keyPairs().signHash(message, privateKey)
  }

  /**
   * verify signature with wallet publickey
   * @param message
   * @param signature
   * @returns {*}
   */
  verify(message, signature) {
    if (!this._keypairs) return null
    var publicKey = this.getPublicKey()
    return this._kp.keyPairs().verifyHash(message, signature, publicKey)
  }

  /**
   * sign message with wallet privatekey
   * Export DER encoded signature in Array
   * @param message
   * @returns {*}
   */
  signTx(message) {
    if (!message) return null
    if (!this._keypairs) return null
    let privateKey = this._keypairs.privateKey
    // Export DER encoded signature in Array
    return this._kp.keyPairs().signTx(message, privateKey)
  }

  /**
   * verify signature with wallet publickey
   * @param message
   * @param signature
   * @returns {*}
   */
  verifyTx(message, signature) {
    if (!this._keypairs) return null
    let publicKey = this.getPublicKey()
    return this._kp.keyPairs().verifyTx(message, signature, publicKey)
  }
}

module.exports = Wallet
