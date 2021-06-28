const { ethers } = require("hardhat")
const contractAddresses = require("../contract-addresses.json")

const llamas = [
  {
    name: 'Mom'
  }, {
    name: 'Dad'
  }
]

function waitFor(p) {
  return p.then((tx) => tx.wait())
}

async function main() {
  for (let i = 0; i < llamas.length; i++) {
    const llamaFactory = await ethers.getContractAt(
      'LlamaFactory',
      contractAddresses.LlamaFactory
    )
    await waitFor(llamaFactory.createRandomLlama(llamas[i].name))
  }
}

module.exports.seed = main

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })