import { useRef } from 'react'
import { animated } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction, UserGestureConfig, wheelAction } from '@use-gesture/react'

import { ImageProps } from '../types/types'
import useImgDrag from '../hooks/useImgDrag'
import useCarousel from '../context/Carousel'
import useImgPinch from '../hooks/useImgPinch'
import { measureContainedImgWidth } from '../utils'
import useImgPinchEnd from '../hooks/useImgPinchEnd'

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

export default function Image({ id, src, style }: ImageProps) {
  // const { bodyRect } = useCarousel()
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // console.log('style: ', style.width.get())

  // const containedImgWidth = useRef<number>(
  //   measureContainedImgWidth({ width: bodyRect!.width, height: bodyRect!.height }, style.aspectRatio.get())
  // )

  // const onDrag = useImgDrag({ id, containerRef })
  // const onPinch = useImgPinch({ id, containerRef, containedImgWidth: containedImgWidth.current, style })

  // const onPinchEnd = useImgPinchEnd({ imgRef, containerRef })

  // const config: UserGestureConfig = {
  //   target: containerRef,
  //   eventOptions: { passive: false },
  //   pinch: {
  //     modifierKey: null,
  //     rubberband: false,
  //     scaleBounds: { min: 1, max: 10 },
  //   },
  //   drag: {
  //     pointer: {
  //       capture: false,
  //       keys: true,
  //       lock: true,
  //     },
  //     rubberband: false,
  //     preventDefault: true,
  //     from: () => [style.x.get(), style.y.get()],
  //   },
  // }

  // useGesture(
  //   {
  //     onPinch,
  //     onPinchEnd,
  //     onDrag,
  //   },
  //   config
  // )

  return (
    <animated.div
      style={style}
      ref={containerRef}
      className="absolute cursor-grab select-none will-change-transform touch-none conten">
      <animated.img
        src={src}
        ref={imgRef}
        alt="Zoomable"
        style={{ width: style.width }}
        className="max-w-full max-h-full object-contain pointer-events-none image-rendering-auto"
      />
    </animated.div>
  )
}
