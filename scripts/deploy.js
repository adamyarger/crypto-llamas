const hre = require("hardhat");

async function main() {
    const LlamaFactory = await hre.ethers.getContractFactory('LlamaFactory')
    const llamaFactory = await LlamaFactory.deploy()

    await llamaFactory.deployed()

    // should make this copy to a file
    console.log('LlamaFactory deployed to:', llamaFactory.address)
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