'use strict';
// this is only for jcc compatibility use

class KeyPairs {
	constructor(token = 'swt') {
		if (token.toLowerCase() === 'swt') {
			this._KEYPAIRS = require('swtc-keypairs')
		} else if (token.toLowerCase() === 'bwt') {
			this._KEYPAIRS = require('bwt-keypairs')
		} else {
			//throw new Error(`no implementation for ${token} alliance chain yet`);
			throw new Error(`config of ${token.toLowerCase()} is empty`);
		}
	}

	/**
	 * generate random bytes and encode it to secret
	 * @returns {string}
	 */
	generateSeed() {
		return this._KEYPAIRS.generateSeed()
	}

	/**
	 * derive keypair from secret
	 * @param {string} secret
	 * @returns {{privateKey: string, publicKey: *}}
	 */
	deriveKeyPair(secret) {
		return this._KEYPAIRS.deriveKeyPair(secret)
	}

	/**
	 * derive wallet address from publickey
	 * @param {string} publicKey
	 * @returns {string}
	 */
	deriveAddress(publicKey) {
		return this._KEYPAIRS.deriveAddress(publicKey)
	}

	/**
	 * check is address is valid
	 * @param address
	 * @returns {boolean}
	 */
	checkAddress(address) {
		return this._KEYPAIRS.checkAddress(address)
	}

	/**
	 * convert the given address to byte array
	 * @param address
	 * @returns byte array
	 */
	convertAddressToBytes(address) {
		if (this.checkAddress(address)) {
			return this._KEYPAIRS.addressCodec.decode(address)
		} else {
			throw new Error('convert address to bytes in error')
		}
	}

	/*
	 * convert the byte array to wallet address
	 */
	convertBytesToAddress(bytes) {
		if ((typeof bytes) !== 'object')  throw new Error('convert bytes to address in error')
		return this._KEYPAIRS.addressCodec.encode(bytes)
	}

}

module.exports = KeyPairs;
