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

export default function Carousel({
  images,
  index,
  onClose,
}: {
  images: Images
  index: number
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}) {
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
    thumbnails: [],
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
      case 'Escape':
        onClose(false)
        break
      default:
        break
    }
  })

  useIsomorphicLayoutEffect(() => {
    const imgViewport = { width: bodyRect.width, height: bodyRect.height - topbarRect.height - bottombarRect.height }

    if (imgViewport.height > 0) {
      const img = images[currentIndex]
      const aspectRatio = img.dimension.width / img.dimension.height

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
        maxWidth: img.thumbnails[img.thumbnails.length - 1].width,
        containedWidth: width,
        src: resizeImage(img.thumbnails, width, img.thumbnails[img.thumbnails.length - 1].width),
        thumbnails: img.thumbnails,
      }

      setZoomLevel(calcZoomPercent(width, config.maxWidth))
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
          thumbnails: image.thumbnails,
        },
      }}>
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="flex-1 bg-slate-900 relative h-full w-full">
            <Topbar setIsOpen={setIsSidebarOpen} setRect={topbarCallback} onClose={onClose} />
            <div ref={bodyRef} className="w-full h-full relative">
              <Image style={spring} ref={imgRef} thumbnails={image.thumbnails} />
            </div>
            <Bottombar setRect={bottombarCallback} resizeImg={imgRef.current?.resize} />
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}
