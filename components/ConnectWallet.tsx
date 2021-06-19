import React from 'react'
import { Box, Button } from '@chakra-ui/react'

interface Props {
    connectWallet: React.MouseEventHandler
}

export default function ConnectWallet({ connectWallet }: Props) {
    return (
        <Box>
            <Button onClick={connectWallet} colorScheme="purple">
                Connect Wallet
            </Button>
        </Box>
    )
}