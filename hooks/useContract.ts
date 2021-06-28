import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3 } from 'context/AppContext'
import { ethers } from 'ethers'
import contractAddresses from 'contract-addresses.json'
import LlamaBreeding from 'artifacts/contracts/LlamaBreeding.sol/LlamaBreeding.json'

export function useContract(
  address: string,
  ABI: any,
  withSigner = true
): Contract | null {
  const { provider } = useWeb3()

  // use memo since we dont want to reinit the contract every time
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

export function useLlamaBreedingContract() {
  return useContract(contractAddresses.LlamaBreeding, LlamaBreeding.abi)
}
