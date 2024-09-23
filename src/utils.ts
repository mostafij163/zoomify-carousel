import { Handler } from '@use-gesture/react'
import { SpringRef } from '@react-spring/web'
import { RefObject, useCallback } from 'react'

import { DragGesture, ImageSpringProps } from './types/types'

export const calcImgWidth = (containerWidth: number) => {
  return containerWidth * devicePixelRatio || 1
}

/*calculate container width maintaining image aspect ratio */
export function measureContainedImgWidth(container: { height: number; width: number }, imgAspectRatio: number): number {
  return Math.ceil(imgAspectRatio > 1 ? container.width : container.height * imgAspectRatio)
}

/*resize image width based on container size*/
export function resizeImageWidth(imgUrl: string, containerWidth: number): string {
  const url = new URL(imgUrl)
  url.searchParams.set('w', `${Math.ceil(calcImgWidth(containerWidth))}`)

  return url.toString()
}

export function useImageDrag(
  id: number,
  containerRef: RefObject<HTMLDivElement>,
  springApi: SpringRef<ImageSpringProps>,
  totalImgCount: number,
  initialWidth: number
) {
  const onDrag: Handler<'drag'> = useCallback(
    function onDrag({ pinching, down, cancel, offset: [x, y], velocity: [xVel], direction: [xDir] }: DragGesture) {
      if (pinching) return cancel()

      const { width } = containerRef.current!.getBoundingClientRect()

      const trigger = xVel > 0.3
      const dir = xDir < 0 ? -1 : 1

      const prevId = id === 0 ? totalImgCount - 1 : id - 1
      const nextId = id === totalImgCount - 1 ? 0 : id + 1

      springApi.start(i => {
        if (trigger && !down) {
          if (i === id) {
            console.log(initialWidth, width)
            return { x: width > initialWidth ? (width + 100) * dir : (initialWidth + 100) * dir, y: 0 }
          } else if (i === (dir === -1 ? prevId : nextId)) {
            return { x: 0, y: 0 }
          } else return
        } else {
          if (i !== id) return
          return { x, y }
        }
      })
    },
    [id, containerRef, springApi, totalImgCount, initialWidth]
  )

  return onDrag
}
