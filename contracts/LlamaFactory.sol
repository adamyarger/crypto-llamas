//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract LlamaFactory {
    uint256 dnaDigits = 16;
    uint256 dnaModulus = dnaDigits**6;

    struct Llama {
        string name;
        uint256 dna;
    }

    Llama[] public llamas;

    function _createLlama(string memory _name, uint256 _dna) private {
        llamas.push(Llama(_name, _dna));
    }

    function _generateRandomDna(string memory _str)
        private
        view
        returns (uint256)
    {
        // code goes here
    }
}
