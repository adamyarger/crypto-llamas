import { ReactNode } from 'react'
import { Flex, Stack, Box } from "@chakra-ui/react";
import ConnectWallet from './ConnectWallet'

export default function Layout({ children }: { children: ReactNode }) {
    const connectWallet = () => {
        console.log('connect')
    }

    return (
        <>
            <Flex p="6" alignItems="center">
                <Box fontSize="lg" fontWeight="bold">
                    crypto llamas
                </Box>
                <Box ml="auto">
                    <ConnectWallet
                        networkError={false}
                        connectWallet={connectWallet}
                    />
                </Box>
            </Flex>

            <Flex flexGrow={1} direction="column">
                {children}
            </Flex>
        </>
    )
}