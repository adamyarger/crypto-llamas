import { Box, Image } from '@chakra-ui/react'

interface Props {
    id?: number
    coolDownTime?: number
    dna?: string
    onClick?: MouseEvent
    selectable?: boolean
}

export default function LlamaCard({ selectable }: Props) {
    return (
        <Box
            className=".llama-card"
            border="2px solid"
            borderColor="gray.300"
            borderRadius="md"
            padding="6"
            cursor={selectable ? 'pointer' : 'default'}
            sx={{
                ':hover': {
                    borderColor: 'purple.500',
                    transition: 'border-color 300ms ease'
                }
            }}
        >
            <Image
                htmlWidth="100%"
                objectFit="cover"
                src="https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1980694.svg"
                alt="Segun Adebayo"
            />

            <Box>
                <Box fontWeight="bold">
                    # 234332
                </Box>
                <Box display="flex" color="gray.500">
                    Cooldown (1d)
                </Box>
            </Box>
        </Box>
    )
}