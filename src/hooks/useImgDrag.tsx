import { useCallback } from 'react'
import { Handler } from '@use-gesture/react'

import { Rect } from '../types/types'
import useCarousel from '../context/Carousel'
import { getNextSlideIndex } from '../utils'
import { springConfig1 } from '../constants'

export default function useImgDrag({
  index,
  containerRect,
  containedWidth,
}: {
  index: number
  containedWidth: number
  containerRect: Rect
}) {
  const { springApi, totalImages, currentIndex, setCurrentIndex } = useCarousel()

  return useCallback<Handler<'drag'>>(
    function onDrag({ pinching, down, distance: [dx], cancel, offset: [x, y], velocity: [xVel], direction: [xDir] }) {
      if (pinching) return cancel()

      const { width } = containerRect

      const trigger = xVel > 1 && dx > width - 100 && !down
      const dir = xDir < 0 ? 1 : -1

      const nextSlideIdx = getNextSlideIndex(currentIndex, dir, totalImages)

      if (trigger) {
        setCurrentIndex(nextSlideIdx)
        return cancel()
      }

      springApi.start(i => {
        if (i !== index) return
        return {
          x,
          y,
          config: springConfig1,
        }
      })
    },
    [index, containerRect]
  )
}
