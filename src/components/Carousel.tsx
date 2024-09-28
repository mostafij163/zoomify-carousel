import useMeasure from 'react-use-measure'
import { SpringConfig, useSprings } from '@react-spring/web'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Image from './Image'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Bottombar from './Bottombar'
import useCallbackRef from '../hooks/useCallbackRef'
import { CarouselContext } from '../context/Carousel'
import { Images, ImageSpringProps, Rect } from '../types/types'
import { getNextSlideIndex, measureContainedImgWidth, resizeImage } from '../utils'

const config: SpringConfig = {
  precision: 0.001,
  duration: 0,
}

export default function Carousel({ images }: { images: Images }) {
  const [bodyRef, bodyRect] = useMeasure()
  const currentIndex = useRef<number>(0)
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

  const [containedImages, setContainedImages] = useState<ImageSpringProps[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [springs, api] = useSprings(containedImages.length, i => containedImages[i], [containedImages])

  useLayoutEffect(() => {
    if (bodyRect.width > 0) {
      const renderSlides = []

      for (let i = currentIndex.current - 1; i <= currentIndex.current + 1; i++) {
        const dir = i - currentIndex.current
        const nextSlideIdx = getNextSlideIndex(currentIndex.current, dir, images.length)

        const img = images[nextSlideIdx]

        const heightOffset = topbarRect.height + bottombarRect.height

        const [width, height] = measureContainedImgWidth(
          { width: bodyRect.width, height: bodyRect.height - heightOffset },
          img.aspectRatio
        )

        const values: ImageSpringProps = {
          width,
          height: height,
          aspectRatio: img.aspectRatio,
          src: resizeImage(img.src, width),
          y: 0,
          x: bodyRect.width * dir,
          config,
        }

        if (i === currentIndex.current) {
          values.x = (bodyRect.width - width) / 2
          values.y = (bodyRect.height - height) / 2
        }

        renderSlides.push(values)
      }

      setContainedImages(renderSlides)
    }
  }, [bodyRect, topbarRect, bottombarRect, images])

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

  console.log(bodyRect.height - topbarRect.height - bottombarRect.height)

  return (
    <CarouselContext.Provider
      value={{
        bodyRect,
        offset: offset.current,
        totalImages: images.length,
        springApi: api,
        setCurrentIndex,
        currentIndex: currentIndex.current,
      }}>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="flex-1 bg-slate-900 relative h-full w-full">
            <Topbar setIsOpen={setIsSidebarOpen} setRect={topbarCallback} />
            <div ref={bodyRef} className="w-full h-full relative">
              {springs.map(({ src, ...spring }, i) => (
                <Image key={i} id={i} src={containedImages[i].src} style={{ ...spring }} />
              ))}
            </div>
            <Bottombar setRect={bottombarCallback} />
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}
