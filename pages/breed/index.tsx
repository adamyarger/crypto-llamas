import React, { useEffect, useState } from 'react'
import { Box, Container, Button, Heading } from '@chakra-ui/react'

import { useLlamaBreedingContract, useLlamaFactoryContract } from 'hooks/useContract'

export default function Breed() {
    // cant get counr from breeding contract since the state is in the factory contract??
    const llamaBreeding = useLlamaBreedingContract()
    const llamaFactory = useLlamaFactoryContract()
    const [count, setCount] = useState(0)

    const disableBreeding = () => {
        return count < 2
    }

    const breed = async () => {
        console.log('breeding...')

        try {
            await llamaBreeding?.breedWith(0, 1)
        } catch (error) {
            console.error(error)
        }
    }

    const getCount = async () => {
        const _count = await llamaFactory?.llamaCount()
        console.log(llamaBreeding)
        setCount(_count.toNumber())
    }

    useEffect(() => {
        if (llamaBreeding) {
            getCount()
        }
    }, [llamaBreeding])

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