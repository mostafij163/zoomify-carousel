import { useCallback } from 'react'
import { Handler } from '@use-gesture/react'

import { springConfig1 } from '../constants'
import useCarousel from '../context/Carousel'
import { ImageSpring, PinchMemo, Rect } from '../types/types'

export default function useImgPinch({
  index,
  style,
  containerRect,
  containedWidth,
}: {
  index: number
  style: ImageSpring
  containerRect: Rect
  containedWidth: number
}) {
  const { springApi, setZoom, bodyRect, topbarRect, bottombarRect } = useCarousel()

  return useCallback<Handler<'pinch'>>(
    function onPinch({ down, active, cancel, origin: [ox, oy], first, movement: [ms], offset: [s], memo }) {
      const { width, top, left } = containerRect

      if (first && !down) {
        memo = {
          width,
          x: left,
          y: top,
          tx: ox - left,
          ty: oy - top,
        } as PinchMemo
      }

      if (memo) {
        /*new width is calculated by multiplying with the cumulative scale*/
        const newWidth = containedWidth * s,
          newHeight = newWidth / style.aspectRatio.get()

        setZoom(Math.round((newWidth / style.maxWidth.get()) * 100))

        /*delta x and delta y are calculated by multiplying with the change in scale from the initial scale. the initial scale is 1*/
        const dx = memo.tx * (ms - 1),
          dy = memo.ty * (ms - 1)

        let x = memo.x - dx,
          y = memo.y - dy

        if (!active && newWidth <= containedWidth) {
          x = (bodyRect.width - containedWidth) / 2
          y = (bodyRect.height - newHeight) / 2

          console.log('x, y: ', x, y)
          // translate3d(130.437px, 43.75px, 0px) scale(1)

          cancel()
        }

        springApi.start(i => {
          if (i !== index) return

          return {
            x,
            y,
            width: newWidth,
            height: newHeight,
            immediate: down,
            config: springConfig1,
          }
        })
      }

      return memo
    },
    [index, containerRect]
  )
}
