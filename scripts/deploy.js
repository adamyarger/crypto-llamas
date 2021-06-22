const hre = require("hardhat");

async function main() {
  const LlamaFactory = await hre.ethers.getContractFactory('LlamaFactory')
  // in order to pass params to the contract contructor we pass them through deploy
  const llamaFactory = await LlamaFactory.deploy()

  await llamaFactory.deployed()

  // should make this copy to a file
  console.log('LlamaFactory deployed to:', llamaFactory.address)
  saveContractAddress('LlamaFactory', llamaFactory)
}

function saveContractAddress(name, contract) {
  const fs = require('fs')

  // this should do Object.assign
  fs.writeFileSync(
    __dirname + '/../contract-addresses.json',
    JSON.stringify({ [name]: contract.address }, undefined, 2)
  )
}


// Break this down
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });