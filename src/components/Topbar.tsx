import { useLayoutEffect } from 'react'
import useMeasure from 'react-use-measure'
import { Maximize2, Menu } from 'lucide-react'

import { setRect } from '../types/types'
import useCarousel from '../context/Carousel'
import ToolbarIcnBtn from './ToolbarIcnBtn'

export default function Topbar({
  setIsOpen,
  setRect,
}: {
  isOpen?: boolean
  setRect: setRect
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [topbarRef, topbarRect] = useMeasure()

  const toggleSidebar = () => {
    setIsOpen((isOpen: boolean) => !isOpen)
  }

  useLayoutEffect(() => setRect(topbarRect), [topbarRect])

  return (
    <div
      className="absolute z-40 w-full p-4 bg-inherit flex gap-4 justify-between items-center text-slate-200"
      ref={topbarRef}>
      {/* <ToolbarIcnBtn onClick={toggleSidebar} className="lg:hidden">
        <Menu size={24} />
      </ToolbarIcnBtn>
      <div className="lg:ml-auto">
        <ToolbarIcnBtn>
          <Maximize2 size={24} />
        </ToolbarIcnBtn>
      </div> */}
    </div>
  )
}
