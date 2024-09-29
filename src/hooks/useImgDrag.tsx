import { config } from '@react-spring/web'
import { Handler } from '@use-gesture/react'
import { useCallback } from 'react'

import { Rect } from '../types/types'
import useCarousel from '../context/Carousel'
import { getNextSlideIndex } from '../utils'

export default function useImgDrag({ index, containerRect }: { index: number; containerRect: Rect }) {
  const { springApi, totalImages, currentIndex, setCurrentIndex } = useCarousel()

  return useCallback<Handler<'drag'>>(
    function onDrag({ pinching, down, cancel, offset: [x, y], velocity: [xVel], direction: [xDir] }) {
      if (pinching) return cancel()

      const { width } = containerRect

      const trigger = xVel > 0.5
      const dir = xDir < 0 ? 1 : -1

      const nextSlideIdx = getNextSlideIndex(currentIndex, dir, totalImages)

      console.log(nextSlideIdx, dir, index)

      springApi.start(i => {
        console.log(index + dir, i)

        // if (trigger && !down) {
        //   const nextImage = dir === -1 ? prevId : nextId
        //   if (i === index) {
        //     return { x: width * dir, y: 0 }
        //   } else if (i === nextImage) {
        //     setCurrentIndex(nextImage)
        //     return { x: 0, y: 0 }
        //   } else return
        // } else {
        if (i !== index) return
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
        // }
      })
    },
    [index, containerRect]
  )
}
