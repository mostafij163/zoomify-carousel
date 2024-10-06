import { useRef } from 'react'
import useMeasure from 'react-use-measure'
import { mergeRefs } from 'react-merge-refs'
import { animated } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction, UserGestureConfig, wheelAction } from '@use-gesture/react'

import { ImageProps } from '../types/types'
import useImgDrag from '../hooks/useImgDrag'
import useImgPinch from '../hooks/useImgPinch'
import useImgPinchEnd from '../hooks/useImgPinchEnd'

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

export default function Image({ index, src, containedWidth, style }: ImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [measureRef, containerRect] = useMeasure()

  const onDrag = useImgDrag({ index, containedWidth, containerRect })
  const onPinch = useImgPinch({ index, containerRect, containedWidth, style })
  const onPinchEnd = useImgPinchEnd({ imgRef, containerRect })

  const maxScale = style.maxWidth.get() / containedWidth

  const config: UserGestureConfig = {
    target: containerRef,
    eventOptions: { passive: false },
    pinch: {
      modifierKey: null,
      rubberband: false,
      scaleBounds: { min: 1, max: maxScale },
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
      style={style}
      ref={mergeRefs([containerRef, measureRef])}
      className="absolute cursor-grab select-none will-change-transform touch-none">
      <animated.img
        src={src}
        ref={imgRef}
        alt="Zoomable"
        style={{ width: style.width }}
        className="h-auto object-contain pointer-events-none image-rendering-auto block"
      />
    </animated.div>
  )
}
