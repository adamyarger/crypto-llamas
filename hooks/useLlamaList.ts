import { useState } from 'react'
import { useLlamaBreedingContract } from 'hooks/useContract'

export function useLlamaList() {
  const [llamas, setLlamas] = useState<any[]>([])
  const llamaBreeding = useLlamaBreedingContract()

  const getLlamasByOwner = async (address?: string) => {
    // TODO: only show llamas belonging to the current owner
    // this will be naive by getting all llamas then filtering by id
    const count = await llamaBreeding?.llamaCount()
    if (count.gt(0)) {
      for (let i = 0; i < count; i++) {
        llamaBreeding?.llamas(i).then((res: any) => {
          const obj = {
            name: res.name,
            dna: res.dna,
            id: i
          }
          setLlamas((prev) => [...prev, obj])
        })
      }
    }
  }

  return { llamas, setLlamas, getLlamasByOwner }
}