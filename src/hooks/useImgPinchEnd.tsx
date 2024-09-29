import { Handler } from '@use-gesture/react'
import { resizeImage } from '../utils'
import { RefObject, useCallback } from 'react'
import { Rect } from '../types/types'

export default function useImgPinchEnd({
  imgRef,
  containerRect,
}: {
  imgRef: RefObject<HTMLImageElement>
  containerRect: Rect
}) {
  return useCallback<Handler<'pinch'>>(
    function onPinchEnd() {
      if (imgRef.current) {
        const { width } = containerRect
        const newSrc = resizeImage(imgRef.current.src, width)
        imgRef.current.src = newSrc
      }
    },
    [containerRect]
  )
}
