import React, { useEffect, useState } from 'react'
import { Box, Container, Button } from '@chakra-ui/react'
import { useWeb3 } from 'context/AppContext'
import { ethers } from 'ethers'
import LlamaFactory from 'artifacts/contracts/LlamaFactory.sol/LlamaFactory.json'
import contractAddresses from 'contract-addresses.json'

export default function Breed() {
    const { provider } = useWeb3()
    const [count, setCount] = useState(0)

    // create hook for getting specific contract objects
    const llamaFactory = new ethers.Contract(
        contractAddresses.LlamaFactory,
        LlamaFactory.abi,
        provider
    );

    const disableBreeding = () => {
        return count < 2
    }

    const breed = () => {
        console.log('breeding...')
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
            <Box>
                {/* Count: {count} */}
                <Button colorScheme="purple" disabled={disableBreeding()} onClick={breed}>
                    Breed Me
                </Button>
            </Box>
        </Container>
    )
}