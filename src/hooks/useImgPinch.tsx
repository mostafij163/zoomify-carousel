import { useCallback } from 'react'
import { Handler } from '@use-gesture/react'

import { springConfig1 } from '../constants'
import useCarousel from '../context/Carousel'
import { ImageSpring, PinchMemo, Rect } from '../types/types'

//highlight: when zoom in too high and zoom out from corner the translation adjustment is not right

export default function useImgPinch({
  index,
  style,
  containerRect,
  containedWidth,
}: {
  index: number
  style: ImageSpring
  containedWidth: number
  containerRect: Rect
}) {
  const { springApi } = useCarousel()

  return useCallback<Handler<'pinch'>>(
    function onPinch({ down, origin: [ox, oy], first, movement: [ms], offset: [s], memo }) {
      const { width, top, left } = containerRect

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
        const newWidth = containedWidth * s
        const newHeight = newWidth / style.aspectRatio.get()

        const deltaX = pinchMemo.tx * (ms - style.scale?.get())
        const deltaY = pinchMemo.ty * (ms - style.scale?.get())

        let x = pinchMemo.x - deltaX,
          y = pinchMemo.y - deltaY

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
      return pinchMemo
    },
    [index, containerRect]
  )
}
