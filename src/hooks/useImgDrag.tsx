import { useCallback } from 'react'
import { Handler } from '@use-gesture/react'

import { Rect } from '../types/types'
import { getSlideIndex } from '../utils'
import { springConfig1 } from '../constants'
import useCarousel from '../context/Carousel'

export default function useImgDrag({ containerRect }: { containerRect: Rect }) {
  const { springApi, totalImages, currentIndex, setCurrentIndex, image } = useCarousel()

  return useCallback<Handler<'drag'>>(
    function onDrag({ type, down, cancel, pinching, offset: [x, y], velocity: [xVel], direction: [xDir] }) {
      //type: pointerdown, pointermove, touchstart, touchmove
      const { width } = containerRect

      const trigger = xVel > 0.5 && !down
      const dir = xDir < 0 ? 1 : -1

      if (pinching) return cancel()

      if (Math.floor(width) <= Math.floor(image.containedWidth) && type === 'pointerdown') return cancel()

      if (trigger) {
        const nextSlideIdx = getSlideIndex(currentIndex, dir, totalImages)

        setCurrentIndex(nextSlideIdx)
        return cancel()
      }

      springApi.start(() => ({
        x,
        y,
        config: springConfig1,
      }))
    },
    [containerRect]
  )
}
