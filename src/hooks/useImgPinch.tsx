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
  containedWidth: number
  containerRect: Rect
}) {
  const { springApi, bodyRect, setZoom } = useCarousel()

  return useCallback<Handler<'pinch'>>(
    function onPinch({ down, cancel, origin: [ox, oy], first, movement: [ms], offset: [s], memo }) {
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

        setZoom(Math.round((newWidth / style.maxWidth.get()) * 100))

        if (Math.floor(newWidth) <= Math.floor(containedWidth) && !down) {
          springApi.start(i => {
            if (i !== index) return
            return {
              width: containedWidth,
              x: (bodyRect.width - containedWidth) / 2,
              y: (bodyRect.height - containedWidth / style.aspectRatio.get()) / 2,
            }
          })
          return cancel()
        }
        const newHeight = newWidth / style.aspectRatio.get()

        const deltaX = pinchMemo.tx * (ms - 1)
        const deltaY = pinchMemo.ty * (ms - 1)

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
