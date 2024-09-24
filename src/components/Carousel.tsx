import { Menu } from 'lucide-react'
import useMeasure from 'react-use-measure'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SpringConfig, useSprings } from '@react-spring/web'

import Image from './Image'
import Sidebar from './Sidebar'
import { images } from '../images'
import { measureContainedImgWidth } from '../utils'
import Toolbar from './Toolbar'
import { Rect } from '../types/types'

export default function Carousel() {
  const [bodyRef, bodyRect] = useMeasure()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toolbarRef = useRef<{ rect: Rect }>(null)
  const [heightOffset, setHeightOffset] = useState(0)

  const [springs, api] = useSprings(
    images.length,
    i => {
      const config: SpringConfig = {
        precision: 0.0001,
      }

      const img = images[i]

      const containerWidth = measureContainedImgWidth(
        { width: bodyRect.width, height: bodyRect.height - heightOffset },
        img['aspect-ratio']
      )

      const values = {
        y: 0,
        x: -bodyRect.x - bodyRect.width,
        width: containerWidth,
        aspectRatio: img['aspect-ratio'],
        config,
      }

      if (i === 0) {
        values.x = (bodyRect.width - containerWidth) / 2
      }

      return values
    },
    [bodyRect, heightOffset]
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

  useLayoutEffect(() => {
    if (toolbarRef.current) {
      setHeightOffset(toolbarRef.current.rect.height)
    }

    return () => {
      setHeightOffset(0)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 relative">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-40 text-slate-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 lg:hidden">
            <Menu size={24} />
          </button>
          <div className="h-full w-full">
            <div ref={bodyRef} className="bg-slate-900 w-full h-full relative">
              {springs.map((spring, i) => (
                <Image
                  key={i}
                  id={i}
                  springApi={api}
                  bodyRect={bodyRect}
                  src={images[i].src}
                  style={{ ...spring }}
                  totalImgCount={images.length}
                  setIndex={setCurrentIndex}
                  heightOffset={heightOffset}
                />
              ))}
            </div>
            <Toolbar
              currentIndex={currentIndex}
              total={images.length}
              springApi={api}
              ref={toolbarRef}
              setIndex={setCurrentIndex}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
