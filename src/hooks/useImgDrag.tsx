import { useCallback } from 'react'
import { Handler } from '@use-gesture/react'

import { Rect } from '../types/types'
import { getSlideIndex } from '../utils'
import useCarousel from '../context/Carousel'
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
    function onDrag({ type, down, cancel, pinching, offset: [x, y], velocity: [xVel], direction: [xDir] }) {
      //type: pointerdown, pointermove, touchstart, touchmove
      const { width } = containerRect
      const trigger = xVel > 0.5 && !down
      const dir = xDir < 0 ? 1 : -1

      if (pinching) return cancel()
      if (Math.floor(width) <= Math.floor(containedWidth) && type === 'pointerdown') return cancel()

      if (trigger) {
        const nextSlideIdx = getSlideIndex(currentIndex, dir, totalImages)

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
