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
import { useLlamaList } from 'hooks/useLlamaList'

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
          textAlign="center"
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
  const llamaBreeding = useLlamaBreedingContract()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [maleId, setMaleId] = useState<number | undefined>()
  const [femaleId, setFemaleId] = useState<number | undefined>()
  const [activeSex, setActiveSex] = useState('')
  const { llamas, getLlamasByOwner, setLlamas } = useLlamaList()

  const allowBreeding = () => {
    return maleId !== undefined && femaleId !== undefined
  }

  const llamaOptions = llamas.filter(item => {
    return item.id !== maleId && item.id !== femaleId
  })

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

  useEffect(() => {
    if (llamaBreeding) {
      getLlamasByOwner()
    }

    return () => {
      setLlamas([])
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
        llamas={llamaOptions}
      />
    </>
  )
}