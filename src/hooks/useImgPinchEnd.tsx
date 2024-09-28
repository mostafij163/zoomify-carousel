import { Handler } from '@use-gesture/react'
import { resizeImage } from '../utils'
import { RefObject, useCallback } from 'react'

export default function useImgPinchEnd({
  imgRef,
  containerRef,
}: {
  imgRef: RefObject<HTMLImageElement>
  containerRef: RefObject<HTMLDivElement>
}) {
  return useCallback<Handler<'pinch'>>(function onPinchEnd() {
    if (imgRef.current) {
      const { width } = containerRef.current!.getBoundingClientRect()

      const newSrc = resizeImage(imgRef.current.src, width)

      imgRef.current.src = newSrc
    }
  }, [])
}
