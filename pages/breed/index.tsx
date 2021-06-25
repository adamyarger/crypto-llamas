import React, { useEffect, useState } from 'react'
import { Box, Container, Button, Heading } from '@chakra-ui/react'
import { useWeb3 } from 'context/AppContext'
import { ethers } from 'ethers'
import LlamaFactory from 'artifacts/contracts/LlamaFactory.sol/LlamaFactory.json'
import LlamaBreeding from 'artifacts/contracts/LlamaBreeding.sol/LlamaBreeding.json'
import contractAddresses from 'contract-addresses.json'

export default function Breed() {
    const addresses: any = contractAddresses
    const { provider } = useWeb3()
    const [count, setCount] = useState(0)

    const disableBreeding = () => {
        return count < 2
    }

    // create hook for getting specific contract objects
    const llamaFactory = new ethers.Contract(
        addresses.LlamaFactory,
        LlamaFactory.abi,
        provider
    );

    const llamaBreeding = new ethers.Contract(
        addresses.LlamaBreeding,
        LlamaBreeding.abi,
        provider
    )

    const getBreedingContract = (provider: any) => {
        const signer = provider.getSigner()
        return llamaBreeding.connect(signer)
    }

    const breed = async () => {
        const contract = getBreedingContract(provider)
        console.log('breeding...')

        try {
            await contract.breedWith(0, 1)
        } catch (error) {
            console.error(error)
        }
    }

    const getCount = async () => {
        const _count = await llamaFactory.llamaCount()
        setCount(_count.toNumber())
    }

    useEffect(() => {
        if (provider) {
            getCount()
        }
    }, [provider])

    return (
        <Container maxW="container.lg" mt="32">
            <Heading as="h1" size="2xl" mb="16">Breed</Heading>
            <Box>
                {/* Count: {count} */}
                <Button colorScheme="purple" disabled={disableBreeding()} onClick={breed}>
                    Breed Me
                </Button>
            </Box>
        </Container>
    )
}