import React, { useState, useEffect } from 'react'
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
  const { provider } = useWeb3()
  const [name, setName] = useState('')
  const [llamas, setLlamas] = useState([])

  const llamaFactory = new ethers.Contract(contractAddresses.LlamaFactory, LlamaFactory.abi, provider);

  const createRandomLlama = async (name: string) => {
    // were changing the state with this so we need to use a signer
    // and connect them to the contract
    const signer = provider.getSigner()
    const llamaFactorySigner = llamaFactory.connect(signer)
    await llamaFactorySigner.createRandomLlama(name)
  }

  const handleLlamaForm = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(e)
    if (name) {
      await createRandomLlama(name)
    }
  }

  const getLlamas = async () => {
    const llamas = await llamaFactory.llamas(0)
    console.log(llamas)
    setLlamas(llamas)
  }

  useEffect(() => {
    if (provider) {
      // getLlamas()
    }
  }, [provider])


  // display llamas
  // create new llama on form submit with name
  // listen to llama created event to add a new llama
  // show llama color changing on input change


  // event
  // llamaFactory.on('NewLLama', (name, dna) => {
  //   console.log(name, dna)
  //   // add it to the js list
  // });

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
      </Container>
    </div>
  )
}
