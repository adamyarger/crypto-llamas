import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps
} from "@chakra-ui/react"
import LlamaCard from 'components/LlamaCard'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function LlamaSelectModal({ isOpen, onClose }: Props) {
  // extract get llamas call to a reusable function
  // make it a hook

  return (
    <Modal
      isCentered
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxW="760px">
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          select here
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}