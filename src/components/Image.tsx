import { useRef } from 'react'
import useMeasure from 'react-use-measure'
import { mergeRefs } from 'react-merge-refs'
import { animated, to } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction, UserGestureConfig, wheelAction } from '@use-gesture/react'

import { ImageProps, ImageSpring } from '../types/types'
import useImgDrag from '../hooks/useImgDrag'
import useImgPinch from '../hooks/useImgPinch'
import useImgPinchEnd from '../hooks/useImgPinchEnd'
import useCarousel from '../context/Carousel'
import { calcActualWidth } from '../utils'

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

export default function Image({ style }: { style: ImageSpring }) {
  const {
    image: { src, maxWidth, containedWidth, aspectRatio },
  } = useCarousel()

  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [measureRef, containerRect] = useMeasure()

  const onDrag = useImgDrag({ containerRect })
  const onPinch = useImgPinch({ containerRect })
  const onPinchEnd = useImgPinchEnd({ imgRef, containerRect })

  const maxScale = isNaN(maxWidth / containedWidth) ? 0 : calcActualWidth(maxWidth) / containedWidth

  const config: UserGestureConfig = {
    target: containerRef,
    eventOptions: { passive: false },
    pinch: {
      modifierKey: null,
      rubberband: false,
      scaleBounds: { min: 1, max: maxScale },
      from: () => [style.scale.get(), 0],
    },
    drag: {
      pointer: {
        touch: true,
        keys: false,
        capture: false,
      },
      rubberband: false,
      preventDefault: true,
      from: () => [style.x.get(), style.y.get()],
    },
  }

  useGesture(
    {
      onPinch,
      onPinchEnd,
      onDrag,
    },
    config
  )

  return (
    <animated.div
      style={{
        width: style.scale.to(scale => scale * containedWidth),
        height: to([style.scale, aspectRatio], (scale, aspectRatio) => (scale * containedWidth) / aspectRatio),
        transform: to([style.x, style.y], (x, y) => `translate(${x}px,${y}px)`),
      }}
      ref={mergeRefs([containerRef, measureRef])}
      className="absolute cursor-grab select-none will-change-transform touch-none">
      <animated.img
        src={src}
        ref={imgRef}
        alt="Zoomable"
        style={{ width: style.scale.to(scale => scale * containedWidth) }}
        className="h-auto object-contain pointer-events-none image-rendering-auto block"
      />
    </animated.div>
  )
}
