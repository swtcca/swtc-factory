const Wallet = require("../src/wallet")
const KeyPair = require("../src/keypairs")
const expect = require("chai").expect
const { chains, data } = require("./config")
const seeds = []
describe("Wallet", function() {
  describe("seeding", function() {
    it("generate a ed25519 seed successfully", function() {
      for (let chain of chains) {
        let Keypair = new KeyPair(chain)
        let seed = Keypair.generateSeed({ algorithm: "ed25519" })
        seeds.push(seed)
        let ed = seed.substr(1, 2)
        expect(ed).to.equal("Ed")
      }
    })
  })

  describe("walleting", function() {
    it("generate a wallet from ed25519 seed successfully", function() {
      for (let chain of chains) {
        let Keypair = new KeyPair(chain)
        let seed = seeds.shift()
        let wallet = new Wallet(seed, chain)
        expect(Wallet.isValidAddress(wallet.address(), chain)).to.be.true
      }
    })
  })
})
