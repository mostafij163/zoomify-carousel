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

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 700,
    rotateZ: 0,
    transformOrigin: 'center',
    config: config.stiff,
  }))

  // useLayoutEffect(() => {
  //   const imgWidth = Math.ceil(bounds.width * DPR)

  //   if (imgRef.current) {
  //     imgRef.current.src = `https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=100&w=${imgWidth}&auto=format`
  //   }
  // }, [imgRef, bounds])

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
        const rect = contRef.current?.getBoundingClientRect()

        if (first && rect) {
          const tx = ox - rect.left
          const ty = oy - rect.top

          memo = {
            tx,
            ty,
            x: style.x.get(),
            y: style.y.get(),
            width: rect.width,
          }
        }

        if (memo) {
          const newWidth = memo.width * s

          const deltaX = memo.tx * (s - 1)
          const deltaY = memo.ty * (s - 1)

          api.start({ width: newWidth, x: memo.x - deltaX, y: memo.y - deltaY })
        }

        return memo
      },
      onPinchEnd: ({ offset: [s] }) => {
        const rect = contRef.current!.getBoundingClientRect()
        const imgWidth = Math.ceil(rect.width * DPR)

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
    <animated.div {...gestures()} className={`flex center ${styles.container}`} ref={contRef} style={{ ...style }}>
      <animated.img
        ref={imgRef}
        alt="Zoomable"
        className={styles.image}
        src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=100&w=825&auto=format"
        onDragStart={e => e.preventDefault()}
      />
    </animated.div>
  )
}
