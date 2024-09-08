import useMeasure from 'react-use-measure'
import { mergeRefs } from 'react-merge-refs'
import { useSpring, animated, config } from '@react-spring/web'
import React, { useEffect, useLayoutEffect } from 'react'
import { createUseGesture, dragAction, pinchAction, wheelAction } from '@use-gesture/react'

import styles from './styles.module.css'

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

const DPR = devicePixelRatio || 1

export default function App() {
  const contRef = React.useRef<HTMLDivElement>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [measureRef, bounds] = useMeasure()

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
    transformOrigin: 'center',
    config: config.stiff,
  }))

  useLayoutEffect(() => {
    const imgWidth = Math.ceil(bounds.width * DPR)

    if (imgRef.current) {
      imgRef.current.src = `https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=100&w=${imgWidth}&auto=format`
    }
  }, [imgRef, bounds])

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  const gestures = useGesture(
    {
      onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
        if (first) {
          const { width, x, y } = bounds

          const tx = ox - (x + width / 2)
          const ty = oy - (y + width / 2)

          memo = [style.x.get(), style.y.get(), tx, ty]
        }

        const xoffset = memo[0] - (ms - 1) * memo[2]
        const yoffset = memo[1] - (ms - 1) * memo[3]

        api.start({ scale: s, rotateZ: a, x: xoffset, y: yoffset })
        return memo
      },
      onPinchEnd: ({ offset: [s] }) => {
        const imgWidth = Math.ceil(bounds.width * s * DPR)

        imgRef.current!.src = `https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=100&w=${imgWidth}&auto=format`
      },
      onDrag: ({ pinching, cancel, offset: [x, y] }) => {
        if (pinching) return cancel()

        api.start({ x, y })
      },
    },
    {
      pinch: {
        rubberband: false,
        pinchOnWheel: true,
        scaleBounds: { min: 1, max: 3 },
      },
      drag: {
        rubberband: false,
        from: () => [style.x.get(), style.y.get()],
      },
    }
  )

  return (
    <animated.div
      {...gestures()}
      className={`flex center ${styles.container}`}
      ref={mergeRefs([contRef, measureRef])}
      style={{ ...style }}>
      <animated.img
        ref={imgRef}
        alt="Zoomable"
        className={styles.image}
        src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=100&w=749&auto=format"
        onDragStart={e => e.preventDefault()}
      />
    </animated.div>
  )
}
