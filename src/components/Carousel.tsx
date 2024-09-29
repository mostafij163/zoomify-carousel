import useMeasure from 'react-use-measure'
import { SpringConfig, useSprings } from '@react-spring/web'
import { useEffect, useLayoutEffect, useState } from 'react'

import Image from './Image'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Bottombar from './Bottombar'
import useCallbackRef from '../hooks/useCallbackRef'
import { CarouselContext } from '../context/Carousel'
import { ContainedImage, Images, Rect } from '../types/types'
import { getNextSlideIndex, measureContainedImgWidth, resizeImage } from '../utils'

const config: SpringConfig = {
  precision: 0.001,
  duration: 0,
}

export default function Carousel({ images, index }: { images: Images; index: number }) {
  const [bodyRef, bodyRect] = useMeasure()
  const [currentIndex, setIndex] = useState<number>(index)
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

  const [containedImages, setContainedImages] = useState<ContainedImage[]>([])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [springs, api] = useSprings(containedImages.length, i => containedImages[i].springValues, [containedImages])

  useLayoutEffect(() => {
    const heightOffset = topbarRect.height + bottombarRect.height

    if (bodyRect.width && heightOffset) {
      const renderSlides = []

      for (let i = currentIndex - 1; i <= currentIndex + 1; i++) {
        const dir = i - currentIndex
        const nextSlideIdx = getNextSlideIndex(currentIndex, dir, images.length) /*adjacent slide index*/

        const img = images[nextSlideIdx]

        const [width, height] = measureContainedImgWidth(
          { width: bodyRect.width, height: bodyRect.height - heightOffset },
          img.aspectRatio
        )

        const values: ContainedImage = {
          springValues: {
            width,
            height,
            scale: 1,
            aspectRatio: img.aspectRatio,
            y: 0,
            x: bodyRect.width * dir,
            config,
          },
          index: nextSlideIdx,
          containedWidth: width,
          src: resizeImage(img.src, width),
        }

        if (i === currentIndex) {
          values.springValues.x = (bodyRect.width - width) / 2
          values.springValues.y = (bodyRect.height - height) / 2
        }

        renderSlides.push(values)
      }

      setContainedImages(renderSlides)
    }
  }, [bodyRect, topbarRect, bottombarRect, images, currentIndex])

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
    setIndex(index)
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
        topbarRect,
        bottombarRect,
        totalImages: images.length,
        springApi: api,
        setCurrentIndex,
        currentIndex: currentIndex,
      }}>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="flex-1 bg-slate-900 relative h-full w-full">
            <Topbar setIsOpen={setIsSidebarOpen} setRect={topbarCallback} />
            <div ref={bodyRef} className="w-full h-full relative">
              {springs.map((spring, i) => (
                <Image
                  key={i}
                  index={i}
                  style={spring}
                  src={containedImages[i].src}
                  containedWidth={containedImages[i].containedWidth}
                />
              ))}
            </div>
            <Bottombar setRect={bottombarCallback} />
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}
