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
    }

    Llama[] public llamas;

    function llamaCount() public view returns (uint256) {
        return llamas.length;
    }

    function _createLlama(string memory _name, uint256 _dna) private {
        llamas.push(Llama(_name, _dna));
        console.log("CREATE LLAMA");
        emit NewLlama(llamas.length - 1, _name, _dna);
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
        uint256 randDna = _generateRandomDna(_name);
        _createLlama(_name, randDna);
    }
}
