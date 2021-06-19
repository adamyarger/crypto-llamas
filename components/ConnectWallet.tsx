import React from 'react'
import NetworkErrorMessage from './NetworkErrorMessage'
import { Box, Button } from '@chakra-ui/react'

interface Props {
    connectWallet: React.MouseEventHandler
    networkError: boolean
    dismiss?: React.MouseEventHandler<HTMLButtonElement>
}

export default function ConnectWallet({ connectWallet, networkError, dismiss }: Props) {
    return (
        <Box>
            {networkError &&
                <NetworkErrorMessage
                    message="Metamask network should be set to Localhost:8545"
                    dismiss={dismiss}
                />}
            <Button onClick={connectWallet} colorScheme="purple">
                Connect Wallet
            </Button>
        </Box>
    )
}