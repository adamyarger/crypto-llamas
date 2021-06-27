import React, { useEffect, useState } from 'react'
import { useLlamaBreedingContract, useLlamaFactoryContract } from 'hooks/useContract'
import LlamaSelectModal from 'components/LlamaSelectModal'
import LlamaCard from 'components/LlamaCard'
import {
  Box,
  Flex,
  Grid,
  Container,
  Button,
  Heading,
  background,
  useDisclosure
} from '@chakra-ui/react'

function BreedCard({ title, subtitle, onClick, activeId }: { title: string, subtitle: string, onClick: () => void, activeId?: number }) {
  return (
    <Box onClick={() => onClick()}>
      <Box textAlign="center">
        <Box fontSize="lg" fontWeight="bold" mb="1">{title}</Box>
        <Box mb="4">{subtitle}</Box>
      </Box>

      {activeId !== undefined
        ? <LlamaCard selectable />
        : <Box
          className="breed-select"
          border="2px dotted"
          borderColor="gray.300"
          backgroundColor="gray.100"
          borderRadius="md"
          py="32"
          cursor="pointer"
          transition="border .2s"
          _hover={{
            borderColor: "purple.500"
          }}
        ><Box
          color="gray.600"
          fontWeight="bold"
          sx={{
            '.breed-select:hover &': {
              color: "purple.500"
            }
          }}
        >
            Select your llama
          </Box>
        </Box>}
    </Box>
  )
}

export default function Breed() {
  // cant get count from breeding contract since the state is in the factory contract??
  const llamaBreeding = useLlamaBreedingContract()
  const llamaFactory = useLlamaFactoryContract()
  const [count, setCount] = useState(0)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [maleId, setMaleId] = useState<number | undefined>()
  const [femaleId, setFemaleId] = useState<number | undefined>()
  const [activeSex, setActiveSex] = useState('')

  // TODO: get llamas in this component, then we can use a computer property to get the selected llams
  // pass in the list as a prop, this is like a select component in element ui, you pass in the options

  const allowBreeding = () => {
    return maleId !== undefined && femaleId !== undefined
  }

  const breed = async () => {
    console.log('breeding...')

    try {
      await llamaBreeding?.breedWith(maleId, femaleId)
    } catch (error) {
      console.error(error)
    }
  }

  const openSelectModal = (sex: string) => {
    setActiveSex(sex)
    onOpen()
  }

  const onLlamaSelect = (id: number | undefined) => {
    console.log('SELECT', id)

    if (activeSex === 'MALE') {
      setMaleId(id)
    } else {
      setFemaleId(id)
    }
    onClose()
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
    <>
      <Container maxW="container.md" mt="32">
        <Box>
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb="4">Breed Llamas</Heading>
            <Box fontSize="xl" color="gray.500">
              Stand back, these llamas are about to get frisky
            </Box>
          </Box>

          <Grid templateColumns="repeat(2, 1fr)" gap={12} mt="16">
            <BreedCard
              title="Female"
              subtitle="This llama is about to be preggers"
              activeId={femaleId}
              onClick={() => openSelectModal('FEMALE')}
            />
            <BreedCard
              title="Male"
              subtitle="This llama will be the steer"
              activeId={maleId}
              onClick={() => openSelectModal('MALE')}
            />
          </Grid>

          <Box mt="8" display="flex" justifyContent="center">
            <Button colorScheme="purple" disabled={!allowBreeding()} onClick={breed}>
              Ok, give them some privacy
            </Button>
          </Box>
        </Box>
      </Container>

      <LlamaSelectModal
        isOpen={isOpen}
        onClose={onClose}
        onSelect={onLlamaSelect}
      />
    </>
  )
}