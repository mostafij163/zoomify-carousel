import { useRef } from 'react'
import { animated } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction, UserGestureConfig, wheelAction } from '@use-gesture/react'

import { ImageProps, PinchMemo } from '../types/types'
import { measureContainedImgWidth, resizeImageWidth, useImageDrag } from '../utils'
import useMeasure from 'react-use-measure'
import { mergeRefs } from 'react-merge-refs'

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

export default function Image({
  id,
  heightOffset,
  src,
  bodyRect,
  style,
  springApi,
  totalImgCount,
  setIndex,
}: ImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, rect] = useMeasure({ offsetSize: true })

  const onDrag = useImageDrag({ id, containerRef, springApi, totalImgCount, bodyWidth: bodyRect.width, setIndex })

  const config: UserGestureConfig = {
    target: containerRef,
    eventOptions: { passive: false },
    pinch: {
      modifierKey: null,
      rubberband: false,
      scaleBounds: { min: 1, max: 10 },
    },
    drag: {
      pointer: {
        capture: false,
        keys: true,
        lock: true,
      },
      rubberband: false,
      preventDefault: true,
      from: () => [style.x.get(), style.y.get()],
    },
  }

  useGesture(
    {
      onPinch: ({ down, origin: [ox, oy], first, movement: [ms], offset: [s], memo }) => {
        const { width, top, left } = rect

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
          const initialWidth = measureContainedImgWidth(
            { width: bodyRect.width, height: bodyRect.height - heightOffset },
            style.aspectRatio.get()
          )
          const newWidth = initialWidth * s

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
      onPinchEnd: () => {
        if (imgRef.current) {
          const { width } = containerRef.current!.getBoundingClientRect()

          const newSrc = resizeImageWidth(imgRef.current.src, width)

          imgRef.current.src = newSrc
        }
      },
      onDrag,
    },
    config
  )

  return (
    <animated.div
      style={style}
      className="absolute cursor-grab select-none will-change-transform touch-none"
      ref={mergeRefs([containerRef, ref])}>
      <animated.img style={{ width: style.width }} ref={imgRef} alt="Zoomable" src={src} />
    </animated.div>
  )
}
