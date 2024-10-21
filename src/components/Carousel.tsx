import useMeasure from 'react-use-measure'
import { useIsomorphicLayoutEffect, useSpring } from '@react-spring/web'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Image from './Image'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Bottombar from './Bottombar'
import useCallbackRef from '../hooks/useCallbackRef'
import { CarouselContext } from '../context/Carousel'
import { ContainedImage, Images, Rect } from '../types/types'
import {
  calcActualWidth,
  calcResponsiveWidth,
  calcZoomPercent,
  getSlideIndex,
  measureContainedSize,
  resizeImage,
} from '../utils'

export default function Carousel({ images, index }: { images: Images; index: number }) {
  const imgRef = useRef<{ resize: () => void }>(null)
  const [bodyRef, bodyRect] = useMeasure()
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
  const [currentIndex, setIndex] = useState<number>(index)
  const [image, setImage] = useState<ContainedImage>({
    src: '',
    aspectRatio: 1,
    containedWidth: 0,
    maxWidth: 0,
    springValues: {
      x: 0,
      y: 0,
      scale: 0,
    },
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [spring, api] = useSpring(() => {
    return image ? image.springValues : { x: 0, y: 0, scale: 1 }
  }, [image])

  const setZoomLevel = useCallbackRef((zoom: number) => setZoom(zoom))
  const setCurrentIndex = useCallbackRef((index: number) => setIndex(index))

  const keyboardNavHandler = useCallbackRef((event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowRight':
        setCurrentIndex(getSlideIndex(currentIndex, 1, images.length))
        break
      case 'ArrowUp':
        setCurrentIndex(getSlideIndex(currentIndex, 1, images.length))
        break
      case 'ArrowLeft':
        setCurrentIndex(getSlideIndex(currentIndex, -1, images.length))
        break
      case 'ArrowDown':
        setCurrentIndex(getSlideIndex(currentIndex, -1, images.length))
        break
      default:
        break
    }
  })

  useIsomorphicLayoutEffect(() => {
    const imgViewport = { width: bodyRect.width, height: bodyRect.height - topbarRect.height - bottombarRect.height }

    if (imgViewport.height > 0) {
      const img = images[currentIndex]
      const aspectRatio = img.width / img.height

      const [width, height] = measureContainedSize(imgViewport, aspectRatio)

      const config: ContainedImage = {
        springValues: {
          scale: 1,
          y: (imgViewport.height - height) / 2 + topbarRect.height,
          x: (imgViewport.width - width) / 2,
          config: {
            precision: 0.001,
            duration: 0,
          },
        },
        aspectRatio,
        maxWidth: img.width,
        containedWidth: width,
        src: resizeImage(img.src, width),
      }

      setZoomLevel(calcZoomPercent(width, img.width))
      setImage(config)
    }
  }, [bodyRect, topbarRect, bottombarRect, images, currentIndex, setZoomLevel])

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
        totalImages: images.length,
        springApi: api,
        zoom,
        setZoom: setZoomLevel,
        currentIndex,
        setCurrentIndex,
        image: {
          src: image.src,
          aspectRatio: image.aspectRatio,
          maxWidth: image.maxWidth,
          containedWidth: image.containedWidth,
        },
      }}>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="flex-1 bg-slate-900 relative h-full w-full">
            <Topbar setIsOpen={setIsSidebarOpen} setRect={topbarCallback} />
            <div ref={bodyRef} className="w-full h-full relative">
              <Image style={spring} ref={imgRef} />
            </div>
            <Bottombar setRect={bottombarCallback} resizeImg={imgRef.current?.resize} />
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}
