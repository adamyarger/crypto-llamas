import { useEffect, useState } from 'react'
import { Box, Container, Button, Heading, Flex, Grid } from '@chakra-ui/react'
import NextLink from 'next/link'
import LlamaCard from 'components/LlamaCard'
import { useLlamaBreedingContract } from 'hooks/useContract'
import { useWeb3 } from 'context/AppContext'

export default function MyLlamas() {
  const { address } = useWeb3()
  const [llamas, setLlamas] = useState<any[]>([])
  const llamaBreeding = useLlamaBreedingContract()

  const getLlamasByOwner = async (address: string) => {
    // TODO: only show llamas belonging to the current owner
    // this will be naive by getting all llamas then filtering by id
    const count = await llamaBreeding?.llamaCount()
    if (count.gt(0)) {
      for (let i = 0; i < count; i++) {
        llamaBreeding?.llamas(i).then((res: any) => {
          const obj = {
            name: res.name,
            dna: res.dna
          }
          setLlamas((prev) => [...prev, obj])
        })
      }
    }
  }

  useEffect(() => {
    if (llamaBreeding) {
      getLlamasByOwner(address)
    }

    return (() => {
      setLlamas([])
    })
  }, [llamaBreeding])

  return (
    <Container maxW="container.lg" mt="32">
      <Flex alignItems="center">
        <Heading as="h1" size="2xl">My Llamas</Heading>

        <Box ml="auto">
          <NextLink href="/breed">
            <Button colorScheme="purple">
              Breed
            </Button>
          </NextLink>
        </Box>
      </Flex>

      <Grid mt="12" templateColumns="repeat(4, 1fr)" gap={6}>
        {llamas.map((item, index) => (
          <LlamaCard key={index}></LlamaCard>
        ))}
      </Grid>
    </Container>
  )
}