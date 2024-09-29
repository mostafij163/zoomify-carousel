import { useLayoutEffect } from 'react'
import useMeasure from 'react-use-measure'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { setRect } from '../types/types'
import useCarousel from '../context/Carousel'
import ToolbarIcnBtn from './ToolbarIcnBtn'
import { getSlideIndex } from '../utils'

export default function Bottombar({ setRect }: { setRect: setRect }) {
  const [bottombarRef, bottombarRect] = useMeasure()
  const { springApi, totalImages, currentIndex, setCurrentIndex } = useCarousel()

  useLayoutEffect(() => setRect(bottombarRect), [bottombarRect])

  function onSwipe(dir: 1 | -1) {
    const nextSlideIdx = getSlideIndex(currentIndex, dir, totalImages)

    springApi.start(i => {
      const nextSpringIdx = getSlideIndex(currentIndex, i + dir, totalImages)

      setCurrentIndex(nextSlideIdx)

      console.log(i, nextSpringIdx, nextSlideIdx)

      if (nextSlideIdx === nextSpringIdx) {
        // console.log(i)
      }

      return {}
      // if (i === currentIndex) {
      //   return { x: -5000 * dir, y: 0 }
      // } else if (i === nextImage) {
      //   setCurrentIndex(nextImage)
      //   return { x: 0, y: 0 }
      // } else return
    })
  }

  return (
    <div
      ref={bottombarRef}
      className="p-4 flex gap-8 bg-inherit absolute bottom-0 left-0 z-40 w-full text-slate-100 justify-end items-center text-lg">
      <div className="flex gap-1">
        <span>{currentIndex + 1}</span>/<span className="text-slate-300">{totalImages}</span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <ToolbarIcnBtn>
          <ChevronLeft className="w-[1.5em] h-[1.5em]" onClick={() => onSwipe(-1)} />
        </ToolbarIcnBtn>
        <ToolbarIcnBtn>
          <ChevronRight className="w-[1.5em] h-[1.5em]" onClick={() => onSwipe(1)} />
        </ToolbarIcnBtn>
      </div>
    </div>
  )
}
