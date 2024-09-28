import { createContext, useContext } from 'react'
import { CarouselContextType } from '../types/types'

export const CarouselContext = createContext<CarouselContextType | null>(null)

export default function useCarousel() {
  const ctx = useContext(CarouselContext)

  if (!ctx) throw new Error('useCarousel can not be used outside CarouselContext.Provider')

  return ctx
}
