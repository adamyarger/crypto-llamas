const hre = require("hardhat");

async function main() {
  const LlamaFactory = await hre.ethers.getContractFactory('LlamaFactory')
  // in order to pass params to the contract contructor we pass them through deploy
  const llamaFactory = await LlamaFactory.deploy()
  await llamaFactory.deployed()
  console.log('LlamaFactory deployed to:', llamaFactory.address)
  saveContractAddress('LlamaFactory', llamaFactory)


  // breeding
  const LlamaBreeding = await hre.ethers.getContractFactory('LlamaBreeding')
  // in order to pass params to the contract contructor we pass them through deploy
  const breeding = await LlamaBreeding.deploy()
  await breeding.deployed()
  console.log('LlamaBreeding deployed to:', breeding.address)
  saveContractAddress('LlamaBreeding', breeding)
}

function saveContractAddress(name, contract) {
  const fs = require('fs')

  const file = fs.readFileSync(
    __dirname + '/../contract-addresses.json',
    'utf8'
  )

  const json = Object.assign(JSON.parse(file), { [name]: contract.address })

  // this should do Object.assign
  fs.writeFileSync(
    __dirname + '/../contract-addresses.json',
    JSON.stringify(json, undefined, 2)
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