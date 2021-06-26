import { useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Grid
} from "@chakra-ui/react"
import LlamaCard from 'components/LlamaCard'
import { useLlamaList } from 'hooks/useLlamaList'

interface Props {
  isOpen: boolean
  onClose: () => void,
  excludeId?: boolean // exlude a llama if its already been selected
  onSelect: (id: number | undefined) => {}
}

export default function LlamaSelectModal({ isOpen, onClose, onSelect }: Props) {
  // extract get llamas call to a reusable function
  // make it a hook
  const { llamas, getLlamasByOwner, setLlamas } = useLlamaList()

  const onOpen = () => {
    console.log('open')
    getLlamasByOwner()
  }

  useEffect(() => {
    if (isOpen) {
      onOpen()
    }

    return () => {
      setLlamas([])
    }
  }, [isOpen])

  return (
    <Modal
      isCentered
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxW="760px">
        <ModalHeader>Select a llama</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mb="6">
            {llamas.map((_, index) => (
              <LlamaCard
                selectable
                id={index}
                key={index}
                onClick={onSelect}
              />
            ))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}