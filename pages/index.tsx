import React, { useState, useEffect, useMemo, EffectCallback, useCallback } from 'react'
import Head from 'next/head'
import LlamaFactory from 'artifacts/contracts/LlamaFactory.sol/LlamaFactory.json'
import { ethers, providers } from 'ethers';
import { useWeb3 } from 'context/AppContext'
import {
  Container,
  chakra,
  Button,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import contractAddresses from 'contract-addresses.json'

// const LLAMA_FACTORY_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

export default function Home() {
  // add a onProvider event for when its ready
  const { provider } = useWeb3()
  // const [llamaFactorySigner, setLlamaFactorySigner] = useState<ethers.Contract | undefined>()
  const [name, setName] = useState('')
  const [llamas, setLlamas] = useState<any[]>([])

  // const factory = new ethers.Contract(
  //   contractAddresses.LlamaFactory,
  //   LlamaFactory.abi,
  //   provider
  // );

  const llamaFactory = new ethers.Contract(
    contractAddresses.LlamaFactory,
    LlamaFactory.abi,
    provider
  );

  const getFactoryContract = (provider: any) => {
    const signer = provider.getSigner()
    return llamaFactory.connect(signer)
  }

  const createRandomLlama = async (name: string) => {
    // were changing the state with this so we need to use a signer
    // and connect them to the contract
    // const signer = provider.getSigner()
    const factorySigner = getFactoryContract(provider)
    await factorySigner.createRandomLlama(name)
  }

  const handleLlamaForm = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(e)
    if (name) {
      await createRandomLlama(name)
    }
  }

  const getLlamas = async () => {
    const count = await llamaFactory.llamaCount()
    if (count.gt(0)) {
      for (let i = 0; i < count; i++) {
        llamaFactory.llamas(i).then((res: any) => {
          const obj = {
            name: res.name,
            dna: res.dna
          }
          setLlamas((prev) => [...prev, obj])
        })
      }
    }
  }

  useEffect(() => {
    if (provider) {
      getLlamas()
    }
  }, [provider])

  // count is a hack until we figure out why it gets fired on load
  let count = 0
  const onNewLlama = (id: string, name: string, dna: object) => {
    console.log('llama created ', id, llamas)
    const obj = {
      name: name,
      dna: dna
    }
    if (count) {
      setLlamas((prev) => [...prev, obj])
    }
    count++
  }

  useEffect(() => {
    if (provider) {
      const factorySigner = getFactoryContract(provider)

      // this is being triggered on reload for the most recently created
      factorySigner.on('NewLlama', onNewLlama)
      return () => {
        factorySigner.off('NewLlama', onNewLlama)
      }
    }
  }, [provider])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.lg" mt="32">
        <chakra.h1 fontSize="4xl">Welcome to llama land!</chakra.h1>

        <chakra.form mt="8" onSubmit={handleLlamaForm}>
          <FormControl id="llama-name">
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <Button colorScheme="blue" mt="4" type="submit">
            Create Llama
          </Button>
        </chakra.form>

        <chakra.div marginTop="8">
          <ul>
            {llamas.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </chakra.div>
      </Container>
    </div>
  )
}
