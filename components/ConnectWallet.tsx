import React from 'react'
import NetworkErrorMessage from './NetworkErrorMessage'
import { Box, Button } from '@chakra-ui/react'

interface Props {
    connectWallet: React.MouseEventHandler
    networkError: string
    dismiss?: React.MouseEventHandler<HTMLButtonElement>
}

export default function ConnectWallet({ connectWallet, networkError, dismiss }: Props) {
    return (
        <Box>
            {networkError &&
                <NetworkErrorMessage
                    message={networkError}
                    dismiss={dismiss}
                />}
            <Button onClick={connectWallet} colorScheme="purple">
                Connect Wallet
            </Button>
        </Box>
    )
}