import { ReactNode, useState, useEffect } from 'react'
import { Flex, Box, chakra } from "@chakra-ui/react";
import ConnectWallet from './ConnectWallet'
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers'
import NetworkErrorMessage from './NetworkErrorMessage'
import { useWeb3 } from 'context/AppContext'

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
    // const [provider, setProvider] = useState<Web3Provider>()
    const { provider, setProvider } = useWeb3()
    const [balance, setBalance] = useState<string>()

    const checkNetwork = () => {
        if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
            return true
        }
        setNetworkError('Please connect Metamask to Localhost:8545')
        return false
    }

    const initWallet = async (userAddress: string) => {
        setSelectedAddress(userAddress)
        const prov = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(prov)
        const balance = await prov.getBalance(userAddress)
        setBalance(ethers.utils.formatEther(balance))
    }

    const connectWallet = async () => {
        const [selectedAddress] = await window.ethereum.enable()
        if (!checkNetwork()) return
        await initWallet(selectedAddress)
    }

    useEffect(() => {
        connectWallet()
    }, [])

    return (
        <>
            <Flex p="6" alignItems="center">
                <Box fontSize="lg" fontWeight="bold">
                    crypto llamas
                </Box>
                <Box ml="auto">
                    {provider ?
                        <Box
                            fontSize="lg"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            px="2"
                            py="1"
                        >
                            <chakra.span>{selectedAddress.split('').splice(0, 8).join('')}... </chakra.span>
                            <chakra.span fontWeight="bold">{balance} ETH</chakra.span>
                        </Box>
                        : <ConnectWallet
                            connectWallet={connectWallet}
                        />}
                </Box>
            </Flex>

            {
                networkError &&
                <NetworkErrorMessage
                    message={networkError}
                />
            }

            <Flex flexGrow={1} direction="column">
                {children}
            </Flex>
        </>
    )
}