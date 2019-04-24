import { KeyPairs } from "./keypairs"

class Wallet {
  public static generate(token = "swt", options = {}) {
    const kp = new KeyPairs(token)
    const secret = kp.generateSeed(options)
    const keypair = kp.deriveKeyPair(secret)
    const address = kp.deriveAddress(keypair.publicKey)
    return {
      secret,
      address
    }
  }

  public static fromSecret(secret, token = "swt") {
    try {
      const kp = new KeyPairs(token)
      const keypair = kp.deriveKeyPair(secret)
      const address = kp.deriveAddress(keypair.publicKey)
      return {
        secret,
        address
      }
    } catch (err) {
      return null
    }
  }

  public static isValidAddress(address, token = "swt") {
    const kp = new KeyPairs(token)
    return kp.checkAddress(address)
  }

  public static isValidSecret(secret, token = "swt") {
    try {
      const kp = new KeyPairs(token)
      kp.deriveKeyPair(secret)
      return true
    } catch (err) {
      return false
    }
  }

  protected _kp
  protected _keypairs
  protected _secret
  constructor(secret, token = "swt") {
    try {
      this._kp = new KeyPairs(token)
      this._keypairs = this._kp.deriveKeyPair(secret)
      this._secret = secret
    } catch (err) {
      this._kp = null
      this._keypairs = null
      this._secret = null
    }
  }

  /**
   * get wallet address
   * @returns {*}
   */
  public address() {
    if (!this._keypairs) return null
    const address = this._kp.deriveAddress(this._keypairs.publicKey)
    return address
  }

  /**
   * get wallet secret
   * @returns {*}
   */
  public secret() {
    if (!this._keypairs) return null
    return this._secret
  }

  public toJson() {
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
  public getPublicKey() {
    if (!this._keypairs) return null
    return this._keypairs.publicKey
  }

  /**
   * sign message with wallet privatekey
   * @param message
   * @returns {*}
   */
  public sign(message) {
    if (!message) return null
    if (!this._keypairs) return null
    const privateKey = this._keypairs.privateKey
    // Export DER encoded signature in Array
    return this._kp.keyPairs().signHash(message, privateKey)
  }

  /**
   * verify signature with wallet publickey
   * @param message
   * @param signature
   * @returns {*}
   */
  public verify(message, signature) {
    if (!this._keypairs) return null
    const publicKey = this.getPublicKey()
    return this._kp.keyPairs().verifyHash(message, signature, publicKey)
  }

  /**
   * sign message with wallet privatekey
   * Export DER encoded signature in Array
   * @param message
   * @returns {*}
   */
  public signTx(message) {
    if (!message) return null
    if (!this._keypairs) return null
    const privateKey = this._keypairs.privateKey
    // Export DER encoded signature in Array
    return this._kp.keyPairs().signTx(message, privateKey)
  }

  /**
   * verify signature with wallet publickey
   * @param message
   * @param signature
   * @returns {*}
   */
  public verifyTx(message, signature) {
    if (!this._keypairs) return null
    const publicKey = this.getPublicKey()
    return this._kp.keyPairs().verifyTx(message, signature, publicKey)
  }
}

export { Wallet }
