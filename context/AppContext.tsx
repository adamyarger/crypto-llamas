import React, { createContext, useContext, useState, useMemo } from 'react'
import { Web3Provider as Web3ProviderType } from '@ethersproject/providers'

// state will be kept track of in here
// need to expose a function to update the contexts state
// should we useMemo?
// does uniswap save your provider info in localStorage

// export function createWeb3ReactRoot(key: string) {
//     // check if the context already exists KENT DODDS
// }

const Web3Context = createContext<
    { provider: Web3ProviderType, setProvider: Function } | undefined
>(undefined)

export function Web3Provider(props: any) {
    const [provider, setProvider] = useState<Web3ProviderType>()
    const value = { provider, setProvider }
    return <Web3Context.Provider value={value} {...props} />
}

export function useWeb3() {
    const context = useContext(Web3Context)
    if (context === undefined) {
        throw new Error('useWeb3 must be used within a Web3Provider')
    }
    return context
}