import { Handler } from '@use-gesture/react'

import useCallbackRef from './useCallbackRef'
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
  const { springApi, setZoom, bodyRect } = useCarousel()

  return useCallbackRef<Handler<'pinch'>>(function onPinch({
    down,
    memo,
    first,
    offset: [s],
    movement: [ms],
    origin: [ox, oy],
  }) {
    const { width, top, left } = containerRect

    if (first) {
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
      let newWidth = containedWidth * s,
        newHeight = newWidth / style.aspectRatio.get()

      setZoom(Math.round((newWidth / style.maxWidth.get()) * 100))

      /*delta x and delta y are calculated by multiplying with the change in scale from the initial scale. the initial scale is 1*/
      const dx = memo.tx * (ms - 1),
        dy = memo.ty * (ms - 1)

      let x = memo.x - dx,
        y = memo.y - dy

      if (s <= 1) {
        newWidth = containedWidth
        newHeight = containedWidth / style.aspectRatio.get()

        x = (bodyRect.width - newWidth) / 2
        y = (bodyRect.height - newHeight) / 2
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
  })
}
