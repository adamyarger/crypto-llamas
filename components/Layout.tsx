import { ReactNode, useState } from 'react'
import { Flex, Stack, Box } from "@chakra-ui/react";
import ConnectWallet from './ConnectWallet'
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers'

// where should this go?
declare global {
    interface Window {
        ethereum: any
    }
}

// This is the Hardhat Network id, you might change it in the hardhat.config.js
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
const HARDHAT_NETWORK_ID = '31337';

export default function Layout({ children }: { children: ReactNode }) {
    const [networkError, setNetworkError] = useState('')
    const [selectedAddress, setSelectedAddress] = useState('')
    const [provider, setProvider] = useState<Web3Provider>()

    const checkNetwork = () => {
        if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
            return true
        }
        setNetworkError('Please connect Metamask to Localhost:8545')
        return false
    }

    const initWallet = (userAddress: string) => {
        setSelectedAddress(userAddress)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log(provider)
        setProvider(provider)
    }

    const connectWallet = async () => {
        const [selectedAddress] = await window.ethereum.enable()
        if (!checkNetwork()) return
        initWallet(selectedAddress)
    }

    return (
        <>
            <Flex p="6" alignItems="center">
                <Box fontSize="lg" fontWeight="bold">
                    crypto llamas
                </Box>
                <Box ml="auto">
                    <ConnectWallet
                        networkError={false}
                        connectWallet={connectWallet}
                    />
                </Box>
            </Flex>

            <Flex flexGrow={1} direction="column">
                {children}
            </Flex>
        </>
    )
}