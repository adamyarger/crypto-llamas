import { Box, Container, Button, Heading, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function MyLlamas() {
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

            <Box mt="12">
                llamas go here
            </Box>
        </Container>
    )
}