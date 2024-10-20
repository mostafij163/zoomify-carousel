import { Handler } from '@use-gesture/react'

import { calcZoomPercent } from '../utils'
import { springConfig1 } from '../constants'
import useCallbackRef from './useCallbackRef'
import useCarousel from '../context/Carousel'
import { PinchMemo, Rect } from '../types/types'

export default function useImgPinch({ containerRect }: { containerRect: Rect }) {
  const { springApi, bodyRect, topbarRect, bottombarRect, image, setZoom } = useCarousel()

  return useCallbackRef<Handler<'pinch'>>(function onPinch({
    memo,
    first,
    offset: [s],
    movement: [ms],
    origin: [ox, oy],
  }) {
    const { top, left } = containerRect

    if (first) {
      memo = {
        x: left,
        y: top,
        tx: ox - left,
        ty: oy - top,
      } as PinchMemo
    }

    if (memo) {
      /*new width is calculated by multiplying with the cumulative scale*/
      let newWidth = image.containedWidth * s

      setZoom(calcZoomPercent(newWidth, image.maxWidth))
      /*delta x and delta y are calculated by multiplying with the change in scale from the initial scale. the initial scale is 1*/
      const dx = memo.tx * (ms - 1),
        dy = memo.ty * (ms - 1)

      let x = memo.x - dx,
        y = memo.y - dy

      if (s <= 1) {
        x = (bodyRect.width - image.containedWidth) / 2
        y =
          (bodyRect.height - topbarRect.height - bottombarRect.height - image.containedWidth / image.aspectRatio) / 2 +
          topbarRect.height
      }

      springApi.start(() => ({
        x,
        y,
        scale: s,
        config: springConfig1,
      }))
    }

    return memo
  })
}
