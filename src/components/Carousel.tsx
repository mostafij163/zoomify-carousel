import { Menu } from 'lucide-react'
import useMeasure from 'react-use-measure'
import { useEffect, useState } from 'react'
import { SpringConfig, useSprings } from '@react-spring/web'

import Image from './Image'
import Sidebar from './Sidebar'
import { images } from '../images'
import { measureContainedImgWidth } from '../utils'

export default function Carousel() {
  const [bodyRef, bodyRect] = useMeasure()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [springs, api] = useSprings(
    images.length,
    i => {
      const config: SpringConfig = {
        precision: 0.0001,
      }

      const img = images[i]

      const values = {
        y: 0,
        x: -bodyRect.x - bodyRect.width,
        width: measureContainedImgWidth({ width: bodyRect.width, height: bodyRect.height }, img['aspect-ratio']),
        aspectRatio: img['aspect-ratio'],
        config,
      }

      if (i === 0) {
        values.x = 0
      }

      return values
    },
    [bodyRect]
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
            className="absolute top-4 left-4 z-40 text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 lg:hidden">
            <Menu size={24} />
          </button>
          <div ref={bodyRef} className="h-full w-full relative">
            {springs.map((spring, i) => (
              <Image
                key={i}
                id={i}
                api={api}
                bodyRect={bodyRect}
                src={images[i].src}
                style={{ ...spring }}
                totalImgCount={images.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
