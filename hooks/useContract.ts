import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3 } from 'context/AppContext'
import { ethers } from 'ethers'
import contractAddresses from 'contract-addresses.json'
import LlamaFactory from 'artifacts/contracts/LlamaFactory.sol/LlamaFactory.json'

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

export function useLlamaFactoryContract() {
  return useContract(contractAddresses.LlamaFactory, LlamaFactory.abi)
}
