import { Handler } from '@use-gesture/react'
import { RefObject, useCallback } from 'react'

import useCarousel from '../context/Carousel'
import { ImageSpring, PinchMemo } from '../types/types'

export default function useImgPinch({
  id,
  style,
  containerRef,
  containedImgWidth,
}: {
  id: number
  style: ImageSpring
  containedImgWidth: number
  containerRef: RefObject<HTMLDivElement>
}) {
  const { springApi } = useCarousel()

  return useCallback<Handler<'pinch'>>(
    function onPinch({ down, origin: [ox, oy], first, movement: [ms], offset: [s], memo }) {
      const { width, top, left } = containerRef.current!.getBoundingClientRect()

      let pinchMemo = memo as PinchMemo

      if (first) {
        pinchMemo = {
          width,
          x: style.x.get(),
          y: style.y.get(),
          tx: ox - left,
          ty: oy - top,
        }
      }

      if (pinchMemo) {
        const newWidth = containedImgWidth * s

        const deltaX = pinchMemo.tx * (ms - 1)
        const deltaY = pinchMemo.ty * (ms - 1)

        let x = pinchMemo.x - deltaX,
          y = pinchMemo.y - deltaY

        springApi.start(i => {
          if (i !== id) return

          return {
            x,
            y,
            width: newWidth,
            immediate: down,
          }
        })
      }
      return pinchMemo
    },
    [id]
  )
}
