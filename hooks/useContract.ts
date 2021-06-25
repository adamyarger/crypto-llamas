import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3 } from 'context/AppContext'
import { ethers } from 'ethers'
import contractAddresses from 'contract-addresses.json'
import LlamaFactory from 'artifacts/contracts/LlamaFactory.sol/LlamaFactory.json'

// T is for type its basically saying T extends the Contract type
// T is a generic so we can pass in any contract type as a type instead of just 1
// whats the = for?
// returns the contract type or null
export function useContract(
  address: string,
  ABI: any,
  withSigner = true
): Contract | null {
  // need an active web 3 hook
  const { provider } = useWeb3()

  // use memo since we dont want to reinitiate the contract constructuor on eveery change
  return useMemo(() => {
    if (!address || !ABI || !provider) return null
    const contract = new ethers.Contract(address, ABI, provider)

    if (withSigner) {
      const signer = provider.getSigner()
      return contract.connect(signer)
    }

    return contract
  }, [provider, address, ABI, withSigner])
}

// useMemo is for memoizing values
// useCallback is for memoizing functions

export function useLlamaFactoryContract() {
  return useContract(contractAddresses.LlamaFactory, LlamaFactory.abi)
}
