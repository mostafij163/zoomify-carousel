import { useLayoutEffect } from 'react'
import { Minimize2 } from 'lucide-react'
import useMeasure from 'react-use-measure'

import { setRect } from '../types/types'
import ToolbarIcnBtn from './ToolbarIcnBtn'

export default function Topbar({
  setIsOpen,
  setRect,
  onClose,
}: {
  isOpen?: boolean
  setRect: setRect
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [topbarRef, topbarRect] = useMeasure()

  function handleClose() {
    onClose(false)
  }

  useLayoutEffect(() => setRect(topbarRect), [topbarRect])

  return (
    <div
      className="absolute z-40 w-full p-4 bg-inherit flex gap-4 justify-between items-center text-slate-200"
      ref={topbarRef}>
      <div className="ml-auto">
        <ToolbarIcnBtn onClick={handleClose}>
          <Minimize2 size={24} />
        </ToolbarIcnBtn>
      </div>
    </div>
  )
}
