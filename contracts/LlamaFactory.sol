//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract LlamaFactory {
    event NewLlama(uint256 llamaId, string name, uint256 dna);

    uint256 dnaDigits = 16;
    uint256 dnaModulus = dnaDigits**6;

    struct Llama {
        string name;
        uint256 dna;
        // 32-bit limits us to 4 billion llamas
        // ethereum only allows 500 million transactions per year, we should be good
        uint32 pregnentWithId;
        // add parents
        // timestamp take up 64 bits
        // uint64 birthTime;

        uint64 cooldownTime;
    }

    Llama[] public llamas;

    mapping(uint256 => address) public llamaToOwner;
    mapping(address => uint256) ownerLlamaCount;

    function llamaCount() public view returns (uint256) {
        return llamas.length;
    }

    function _createLlama(string memory _name, uint256 _dna) internal {
        Llama memory _llama = Llama(_name, _dna, 0, 0);
        llamas.push(_llama);

        uint256 id = llamas.length - 1;
        llamaToOwner[id] = msg.sender;
        ownerLlamaCount[msg.sender]++;
        emit NewLlama(id, _name, _dna);
        console.log("CREATE LLAMA");
    }

    function _generateRandomDna(string memory _str)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomLlama(string memory _name) public {
        // only allow llama creation when you dont have one
        // should change this to airdrop
        // require goes in the public function to throw an error ASAP
        require(ownerLlamaCount[msg.sender] == 0);
        uint256 randDna = _generateRandomDna(_name);
        _createLlama(_name, randDna);
    }
}
