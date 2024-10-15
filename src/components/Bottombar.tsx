import { useLayoutEffect } from 'react'
import useMeasure from 'react-use-measure'
import { ArrowBigDownDash, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

import { Slider } from './Slider'
import { setRect } from '../types/types'
import ToolbarIcnBtn from './ToolbarIcnBtn'
import useCarousel from '../context/Carousel'
import { calcResponsiveImgWidth, getSlideIndex, measureContainedSize } from '../utils'

export default function Bottombar({ setRect }: { setRect: setRect }) {
  const [bottombarRef, bottombarRect] = useMeasure()
  const { bodyRect, topbarRect, springApi, totalImages, currentIndex, setCurrentIndex, zoom, setZoom } = useCarousel()

  useLayoutEffect(() => setRect(bottombarRect), [bottombarRect])

  function onSwipe(dir: 1 | -1) {
    const nextSlideIdx = getSlideIndex(currentIndex, dir, totalImages)
    setCurrentIndex(nextSlideIdx)
  }

  function onZoomChange([zoom]: number[]) {
    springApi.start((i, ctrl) => {
      if (totalImages === 1) ++i
      if (--i + currentIndex === currentIndex) {
        const props = ctrl.get()

        const [width, height] = measureContainedSize(
          { width: bodyRect.width, height: bodyRect.height - topbarRect.height - bottombarRect.height },
          props.aspectRatio
        )

        const minZoom = Math.round((width / calcResponsiveImgWidth(props.maxWidth)) * 100)

        if (zoom <= minZoom) {
          setZoom(minZoom)

          return {
            width,
            height,
            x: (bodyRect.width - width) / 2,
            y: (bodyRect.height - height) / 2,
          }
        } else {
          const newWidth = (props.maxWidth * zoom) / 100
          const newHeight = newWidth / props.aspectRatio
          /*highlight: current translation also need to take into account*/
          const x = (bodyRect.width - newWidth) / 2
          const y = (bodyRect.height - newHeight) / 2

          setZoom(zoom)
          return { width: newWidth, height: newHeight, x, y }
        }
      }
      return {}
    })
  }

  return (
    <div
      ref={bottombarRef}
      className="p-4 bg-inherit absolute bottom-0 left-0 z-40 w-full text-slate-100 flex justify-between items-center">
      <div className="text-lg flex justify-start items-center gap-4 basis-3/4 flex-row flex-wrap">
        <ToolbarIcnBtn>
          <div className="flex justify-start items-center gap-1">
            <ArrowBigDownDash size="1.5em" />
            <span className="hidden md:inline-block">Download</span>
          </div>
        </ToolbarIcnBtn>
        <div className="flex justify-start items-center gap-1  basis-full min-w-36 max-w-48 text-lg">
          <ZoomIn size="2em" />
          <Slider min={1} max={100} value={[zoom]} step={1} onValueChange={onZoomChange} />
          <span>{zoom}%</span>
        </div>
      </div>
      <div className="flex justify-end gap-6 text-lg">
        <div className="flex gap-1">
          <span>{currentIndex + 1}</span>/<span className="text-slate-300">{totalImages}</span>
        </div>
        <div className="flex justify-center items-center gap-1  ">
          <ToolbarIcnBtn>
            <ChevronLeft size="1.5em" onClick={() => onSwipe(-1)} />
          </ToolbarIcnBtn>
          <ToolbarIcnBtn>
            <ChevronRight size="1.5em" onClick={() => onSwipe(1)} />
          </ToolbarIcnBtn>
        </div>
      </div>
    </div>
  )
}
