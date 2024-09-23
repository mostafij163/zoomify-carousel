import { useRef } from 'react'
import { animated } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction, UserGestureConfig, wheelAction } from '@use-gesture/react'

import { measureContainedImgWidth, resizeImageWidth, useImageDrag } from '../utils'
import styles from './../styles.module.css'
import { ImageProps, PinchMemo } from '../types/types'

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

export default function Image({ id, src, bodyRect, style, api, totalImgCount }: ImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const onDrag = useImageDrag(id, containerRef, api, totalImgCount, bodyRect.width)

  const config: UserGestureConfig = {
    target: containerRef,
    eventOptions: { passive: false },
    pinch: {
      modifierKey: null,
      rubberband: false,
      scaleBounds: { min: 1, max: 10 },
    },
    drag: {
      delay: 200,
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
        const { width, top, left } = containerRef.current!.getBoundingClientRect()

        let pinchMemo = memo as PinchMemo

        if (first) {
          pinchMemo = {
            width,
            x: style.x.get(),
            y: style.y.get(),
            tx: ox - left,
            ty: oy - top,
            initialWidth: measureContainedImgWidth(
              { width: bodyRect.width, height: bodyRect.height },
              style.aspectRatio.get()
            ),
          }
        }

        if (pinchMemo) {
          const newWidth = pinchMemo.initialWidth * s

          const deltaX = pinchMemo.tx * (ms - 1)
          const deltaY = pinchMemo.ty * (ms - 1)

          let x = pinchMemo.x - deltaX,
            y = pinchMemo.y - deltaY

          api.start(i => {
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
          const { width, height } = containerRef.current!.getBoundingClientRect()

          const containerWidth = measureContainedImgWidth({ height, width }, style.aspectRatio.get())

          const newSrc = resizeImageWidth(imgRef.current.src, containerWidth)

          imgRef.current.src = newSrc
        }
      },
      onDrag,
    },
    config
  )

  // useEffect(() => {
  //   const url = new URL(src)
  //   url.searchParams.set('w', `${calcImgWidth(viewportWidth)}`)

  //   if (imgRef.current) {
  //     imgRef.current.src = url.toString()
  //   }
  // }, [imgRef, src])

  return (
    <animated.div style={style} className={`flex center ${styles.container}`} ref={containerRef}>
      <animated.img style={{ width: style.width }} ref={imgRef} alt="Zoomable" src={src} />
    </animated.div>
  )
}
