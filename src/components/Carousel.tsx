import useMeasure from 'react-use-measure'
import { animated, SpringConfig, useSprings } from '@react-spring/web'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import Image from './Image'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Bottombar from './Bottombar'
import { Images, ImageSpringProps, Rect } from '../types/types'
import { CarouselContext } from '../context/Carousel'
import { getNextSlideIndex, measureContainedImgWidth, resizeImage } from '../utils'
import useCallbackRef from '../hooks/useCallbackRef'

const config: SpringConfig = {
  precision: 0.001,
  duration: 0,
}

const bgColors = ['red', 'green', 'blue']

export default function Carousel({ images }: { images: Images }) {
  const [bodyRef, bodyRect] = useMeasure()
  const containedImages = useRef<Images>([])
  const currentIndex = useRef<number>(1)
  const offset = useRef<{ top: number; bottom: number }>()
  const [topbarRect, setTopbarRect] = useState<Rect>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
  })
  const [bottombarRect, setBottombarRect] = useState<Rect>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [springs, api] = useSprings(
    3,
    i => {
      const imgIdx = i + currentIndex.current - 1
      const dir = imgIdx - currentIndex.current
      const nextSlideIdx = getNextSlideIndex(currentIndex.current, dir, images.length)

      const img = images[nextSlideIdx]

      const heightOffset = topbarRect.height + bottombarRect.height

      const width = measureContainedImgWidth(
        { width: bodyRect.width, height: bodyRect.height - heightOffset },
        img['aspect-ratio']
      )

      const resizedSrc = resizeImage(img.src, width)

      containedImages.current.push({ src: resizedSrc, 'aspect-ratio': img['aspect-ratio'] })

      const values: ImageSpringProps = {
        width,
        height: width * img['aspect-ratio'],
        y: 0,
        x: bodyRect.width * dir,
        aspectRatio: img['aspect-ratio'],
        config,
      }

      if (i === currentIndex.current) {
        values.x = (bodyRect.width - width) / 2
        values.y = (bodyRect.height - width * img['aspect-ratio']) / 2
      }

      return values
    },
    [bodyRect, topbarRect, bottombarRect]
  )

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

  const closeSidebar = useCallbackRef(function closeSidebar() {
    setIsSidebarOpen(false)
  })

  const setCurrentIndex = useCallbackRef(function setCurrentIndex(index: number) {
    currentIndex.current = index
  })

  const topbarCallback = useCallbackRef((rect: Rect) => {
    setTopbarRect(rect)
  })

  const bottombarCallback = useCallbackRef((rect: Rect) => {
    setBottombarRect(rect)
  })

  return (
    <CarouselContext.Provider
      value={{
        bodyRect,
        offset: offset.current,
        totalImages: images.length,
        currentIndex: currentIndex.current,
        setCurrentIndex,
        springApi: api,
      }}>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="flex-1 bg-slate-900 relative h-full w-full">
            <Topbar setIsOpen={setIsSidebarOpen} setRect={topbarCallback} />
            <div ref={bodyRef} className="w-full h-full relative">
              {springs.map((spring, i) => (
                <animated.div
                  key={i}
                  style={{ ...spring, backgroundColor: bgColors[i] }}
                  className="h-full text-3xl bg-red-500 absolute cursor-grab select-none will-change-transform touch-none conten">
                  Box {i}
                </animated.div>
                // <Image key={i} id={i} src={containedImages.current[i].src} style={{ ...spring }} />
              ))}
            </div>
            <Bottombar setRect={bottombarCallback} />
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}
