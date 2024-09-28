import { config } from '@react-spring/web'
import { Handler } from '@use-gesture/react'
import { RefObject, useCallback } from 'react'

import useCarousel from '../context/Carousel'

export default function useImgDrag({ id, containerRef }: { id: number; containerRef: RefObject<HTMLDivElement> }) {
  const { springApi, totalImages, setCurrentIndex } = useCarousel()

  return useCallback<Handler<'drag'>>(
    function onDrag({ pinching, down, cancel, offset: [x, y], velocity: [xVel], direction: [xDir] }) {
      if (pinching) return cancel()

      const { width } = containerRef.current!.getBoundingClientRect()

      const trigger = xVel > 0.5
      const dir = xDir < 0 ? -1 : 1

      const prevId = id === 0 ? totalImages - 1 : id - 1
      const nextId = id === totalImages - 1 ? 0 : id + 1

      springApi.start(i => {
        if (trigger && !down) {
          const nextImage = dir === -1 ? prevId : nextId
          if (i === id) {
            return { x: width * dir, y: 0 }
          } else if (i === nextImage) {
            setCurrentIndex(nextImage)
            return { x: 0, y: 0 }
          } else return
        } else {
          if (i !== id) return
          return {
            x,
            y,
            config: {
              bounce: 0,
              mass: 3,
              tension: 350,
              friction: 40,
            },
          }
        }
      })
    },
    [id]
  )
}
