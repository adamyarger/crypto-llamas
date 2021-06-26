import { useState } from 'react'
import { useLlamaFactoryContract } from 'hooks/useContract'

export function useLlamaList() {
  const [llamas, setLlamas] = useState<any[]>([])
  const llamaFactory = useLlamaFactoryContract()

  const getLlamasByOwner = async (address?: string) => {
    // TODO: only show llamas belonging to the current owner
    // this will be naive by getting all llamas then filtering by id
    const count = await llamaFactory?.llamaCount()
    if (count.gt(0)) {
      for (let i = 0; i < count; i++) {
        llamaFactory?.llamas(i).then((res: any) => {
          const obj = {
            name: res.name,
            dna: res.dna
          }
          setLlamas((prev) => [...prev, obj])
        })
      }
    }
  }

  return { llamas, setLlamas, getLlamasByOwner }
}