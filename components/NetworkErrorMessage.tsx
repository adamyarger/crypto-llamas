import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react"

interface Props {
    message: string
    dismiss?: React.MouseEventHandler<HTMLButtonElement>
}

export default function NetworkErrorMessage({ message, dismiss }: Props) {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Warning!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}