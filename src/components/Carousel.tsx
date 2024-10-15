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
import { calcActualImgWidth, getSlideIndex, measureContainedSize, resizeImage } from '../utils'

const config: SpringConfig = {
  precision: 0.001,
  duration: 0,
}

export default function Carousel({ slides, index }: { slides: Images; index: number }) {
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

  const [zoom, setZoom] = useState<number>(0)
  const [containedImages, setContainedImages] = useState<ContainedImage[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [springs, api] = useSprings(containedImages.length, i => containedImages[i].springValues, [containedImages])

  const setZoomLevel = useCallbackRef((zoom: number) => setZoom(zoom))
  const setCurrentIndex = useCallbackRef((index: number) => setIndex(index))
  const keyboardNavHandler = useCallbackRef((event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowRight':
        setCurrentIndex(getSlideIndex(currentIndex, 1, slides.length))
        break
      case 'ArrowUp':
        setCurrentIndex(getSlideIndex(currentIndex, 1, slides.length))
        break
      case 'ArrowLeft':
        setCurrentIndex(getSlideIndex(currentIndex, -1, slides.length))
        break
      case 'ArrowDown':
        setCurrentIndex(getSlideIndex(currentIndex, -1, slides.length))
        break
      default:
        break
    }
  })

  useLayoutEffect(() => {
    const heightOffset = topbarRect.height + bottombarRect.height

    if (bodyRect.width && heightOffset) {
      const adjacentSlides = []
      const slidesCount = Math.min(3, slides.length)

      for (let i = -1; i < slidesCount - 1; i++) {
        if (slides.length === 1) ++i

        const slideIdx = getSlideIndex(currentIndex, i, slides.length)
        const img = slides[slideIdx]
        const aspectRatio = img.width / img.height

        const [width, height] = measureContainedSize(
          { width: bodyRect.width, height: bodyRect.height - heightOffset },
          aspectRatio
        )

        const values: ContainedImage = {
          springValues: {
            width,
            height,
            scale: 1,
            aspectRatio,
            maxWidth: calcActualImgWidth(img.width),
            y: (bodyRect.height - height) / 2,
            x: bodyRect.width * i,
            config,
          },
          index: slideIdx,
          containedWidth: width,
          src: resizeImage(img.src, width),
        }

        if (i + currentIndex === currentIndex) {
          values.springValues.x = (bodyRect.width - width) / 2
          setZoomLevel(Math.round((width / calcActualImgWidth(img.width)) * 100))
        }

        adjacentSlides.push(values)
      }

      setContainedImages(adjacentSlides)
    }
  }, [bodyRect, topbarRect, bottombarRect, slides, currentIndex, setZoomLevel])

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    document.addEventListener('keydown', keyboardNavHandler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
      document.removeEventListener('keydown', keyboardNavHandler)
    }
  }, [keyboardNavHandler])

  const closeSidebar = useCallbackRef(function closeSidebar() {
    setIsSidebarOpen(false)
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
        totalImages: slides.length,
        springApi: api,
        setCurrentIndex,
        currentIndex: currentIndex,
        zoom,
        setZoom: setZoomLevel,
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
