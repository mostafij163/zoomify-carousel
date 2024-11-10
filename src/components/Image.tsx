import useMeasure from 'react-use-measure'
import { mergeRefs } from 'react-merge-refs'
import { animated, to } from '@react-spring/web'
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react'
import { createUseGesture, dragAction, pinchAction, UserGestureConfig } from '@use-gesture/react'

import { ImageSpring, Thumbnail } from '../types/types'
import useImgDrag from '../hooks/useImgDrag'
import useCarousel from '../context/Carousel'
import useImgPinch from '../hooks/useImgPinch'
import useImgPinchEnd from '../hooks/useImgPinchEnd'
import { calcActualWidth, resizeImage } from '../utils'

const useGesture = createUseGesture([dragAction, pinchAction])

const Image = forwardRef(
  ({ style, thumbnails }: { style: ImageSpring; thumbnails: Thumbnail[] }, ref: Ref<{ resize: () => void }>) => {
    const {
      image: { src, maxWidth, containedWidth, aspectRatio },
    } = useCarousel()

    const imgRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [measureRef, containerRect] = useMeasure()

    useImperativeHandle(
      ref,
      () => {
        return {
          resize() {
            if (imgRef.current) {
              const newSrc = resizeImage(thumbnails, containerRect.width, maxWidth)

              imgRef.current.src = newSrc
            }
          },
        }
      },
      [containerRect]
    )

    const onDrag = useImgDrag({ containerRect })
    const onPinch = useImgPinch({ containerRect })
    const onPinchEnd = useImgPinchEnd({ imgRef, containerRect })

    const maxScale = isNaN(maxWidth / containedWidth) ? 0 : calcActualWidth(maxWidth) / containedWidth

    const config: UserGestureConfig = {
      target: containerRef,
      eventOptions: { passive: false },
      pinch: {
        axis: 'lock',
        modifierKey: null,
        rubberband: false,
        pointer: { touch: true },
        from: () => [style.scale.get(), 0],
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
)

export default Image
