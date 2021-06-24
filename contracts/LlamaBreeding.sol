//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./LlamaFactory.sol";

contract LlamaBreeding is LlamaFactory {
    /// Pregnant event fired when 2 llamas succesfully breed and
    /// the pregnancy timer begins for the female
    event Pregnant(address owner, uint256 femaleId, uint256 maleId);

    function _isReadyToGiveBirth(Llama storage _female)
        private
        view
        returns (bool)
    {
        return
            (_female.pregnentWithId != 0) &&
            (_female.cooldownTime <= block.timestamp);
    }

    // does the size of the variables your passin matter?
    // how does that effect gas prices?
    function _mixGenes(uint256 _femaleDna, uint256 _maleDna)
        private
        view
        returns (uint256)
    {
        return uint256(_femaleDna + _maleDna * 3) % dnaModulus;
    }

    function breedWith(uint256 _femaleId, uint256 _maleId) public {
        // make sure the caller owns the female, since their the ones who get the new llama
        require(llamaToOwner[_femaleId] == msg.sender);

        // TODO: require permitted beeding
        // require is ready to breed guy
        // require is ready to breed male
        // Llama storage male = llamas[_maleId];
        Llama storage female = llamas[_femaleId];
        female.pregnentWithId = uint32(_maleId);

        // start pregnancy timer.. gestation period
        // gestation is cooldown timer

        emit Pregnant(llamaToOwner[_femaleId], _femaleId, _maleId);
    }

    function giveBirth(uint256 _femaleId) public returns (uint256) {
        Llama storage female = llamas[_femaleId];

        // need to set the gestation period
        // would be cool if this got larger over time, like blocks in bitcoin
        require(_isReadyToGiveBirth(female));

        uint256 maleId = female.pregnentWithId;
        // Llama storage male = llamas[maleId];

        // mix genes
        uint256 criasDna = _mixGenes(_femaleId, maleId);

        // Make new llama, crias is a baby llama
        // how are names chosen? user input would be easiest
        _createLlama("dilbert", criasDna);

        // remove pregnent with id
        delete female.pregnentWithId;

        return llamas.length - 1;
    }
}
