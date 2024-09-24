import { SpringRef } from '@react-spring/web'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { ImageSpringProps } from '../types/types'

const Toolbar = forwardRef(function Toolbar(
  {
    currentIndex,
    total,
    springApi,
    setIndex,
  }: { currentIndex: number; total: number; springApi: SpringRef<ImageSpringProps>; setIndex: (index: number) => void },
  ref
) {
  const toolbarRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({ rect: toolbarRef.current?.getBoundingClientRect() }), [])

  function onClick(dir: 1 | -1) {
    const prevId = currentIndex === 0 ? total - 1 : currentIndex - 1
    const nextId = currentIndex === total - 1 ? 0 : currentIndex + 1

    springApi.start(i => {
      const nextImage = dir === -1 ? nextId : prevId

      if (i === currentIndex) {
        return { x: -5000 * dir, y: 0 }
      } else if (i === nextImage) {
        setIndex(nextImage)
        return { x: 0, y: 0 }
      } else return
    })
  }

  return (
    <div
      ref={toolbarRef}
      className="p-4 flex gap-4 bg-slate-900 absolute bottom-0 left-0 w-full text-slate-200 justify-end items-center">
      <div className="flex gap-2 text-lg">
        <span>{currentIndex}</span>
        <span>/</span>
        <span>{total}</span>
      </div>
      <button>
        <ChevronLeft onClick={() => onClick(1)} />
      </button>
      <button>
        <ChevronRight onClick={() => onClick(-1)} />
      </button>
    </div>
  )
})

export default Toolbar
