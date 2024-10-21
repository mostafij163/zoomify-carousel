import { useLayoutEffect } from 'react'
import useMeasure from 'react-use-measure'
import { ChevronLeft, ChevronRight, CloudDownload, ZoomIn } from 'lucide-react'

import { Slider } from './Slider'
import { setRect } from '../types/types'
import ToolbarIcnBtn from './ToolbarIcnBtn'
import useCarousel from '../context/Carousel'
import { calcActualWidth, getSlideIndex } from '../utils'

export default function Bottombar({ setRect, resizeImg }: { setRect: setRect; resizeImg?: () => void }) {
  const [bottombarRef, bottombarRect] = useMeasure()
  const { springApi, bodyRect, topbarRect, totalImages, image, currentIndex, setCurrentIndex, zoom, setZoom } =
    useCarousel()

  useLayoutEffect(() => setRect(bottombarRect), [bottombarRect])

  function onSwipe(dir: 1 | -1) {
    setCurrentIndex(getSlideIndex(currentIndex, dir, totalImages))
  }

  function onZoomChange([zoomPercent]: number[]) {
    const maxWidth = calcActualWidth(image.maxWidth)
    const minZoomPercent = (image.containedWidth / maxWidth) * 100
    const scale = zoomPercent / minZoomPercent

    if (zoomPercent <= minZoomPercent - 1) return
    else {
      const width = image.containedWidth * scale

      const x = (bodyRect.width - width) / 2,
        y =
          (bodyRect.height - bottombarRect.height - topbarRect.height - width / image.aspectRatio) / 2 +
          topbarRect.height

      setZoom(zoomPercent)
      springApi.start(() => ({ x, y, scale }))
    }
  }

  return (
    <div
      ref={bottombarRef}
      className="p-4 bg-inherit absolute bottom-0 left-0 z-40 w-full text-slate-100 flex justify-between items-center flex-wrap gap-2">
      <div className="text-lg flex justify-start items-center gap-4 basis-3/4 flex-row flex-wrap">
        <ToolbarIcnBtn>
          <div className="flex justify-start items-center gap-1">
            <CloudDownload size="1.5em" />
            <span className="hidden md:inline-block">Download</span>
          </div>
        </ToolbarIcnBtn>
        <div className="flex justify-start items-center gap-1  basis-full min-w-36 max-w-48 text-lg">
          <ZoomIn size="2.3em" />
          <Slider min={1} max={100} value={[zoom]} step={1} onValueChange={onZoomChange} onValueCommit={resizeImg} />
          <span>{Math.min(100, Math.round(zoom))}%</span>
        </div>
      </div>
      <div className="flex justify-end gap-6 text-lg">
        <div className="flex gap-1">
          <span>{currentIndex + 1}</span>/<span className="text-slate-300">{totalImages}</span>
        </div>
        <div className="hidden md:flex justify-center items-center gap-2">
          <ToolbarIcnBtn>
            <ChevronLeft size="1.8em" onClick={() => onSwipe(-1)} />
          </ToolbarIcnBtn>
          <ToolbarIcnBtn>
            <ChevronRight size="1.8em" onClick={() => onSwipe(1)} />
          </ToolbarIcnBtn>
        </div>
      </div>
    </div>
  )
}
