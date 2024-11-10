import { Handler } from '@use-gesture/react'
import { RefObject, useCallback } from 'react'

import { Rect } from '../types/types'
import { resizeImage } from '../utils'
import useCarousel from '../context/Carousel'

export default function useImgPinchEnd({
  imgRef,
  containerRect,
}: {
  imgRef: RefObject<HTMLImageElement>
  containerRect: Rect
}) {
  const {
    image: { maxWidth, thumbnails },
  } = useCarousel()
  return useCallback<Handler<'pinch'>>(
    function onPinchEnd() {
      if (imgRef.current) {
        const { width } = containerRect
        const newSrc = resizeImage(thumbnails, width, maxWidth)
        imgRef.current.src = newSrc
      }
    },
    [containerRect]
  )
}
