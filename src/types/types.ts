import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { Vector2 } from '@use-gesture/react'
import { SpringConfig, SpringRef, SpringValues } from '@react-spring/web'
import { ClassValue } from 'clsx'

export type Images = {
  src: string
  'aspect-ratio': number
}[]

export type PinchMemo = {
  width: number
  tx: number
  ty: number
  x: number
  y: number
  // initialWidth: number
}

export type DragGesture = {
  pinching?: boolean | undefined
  down: boolean
  cancel: () => void
  offset: Vector2
  velocity: Vector2
  direction: Vector2
}

export type ImageSpringProps = {
  x: number
  y: number
  width: number
  height: number
  aspectRatio: number
  config?: SpringConfig
}

export type ImageSpring = SpringValues<ImageSpringProps & CSSProperties>

export type Rect = Omit<DOMRect, 'toJSON'>

export type ImageProps = Pick<HTMLElement & HTMLImageElement, 'src'> & {
  id: number
  style: ImageSpring
} & Partial<Pick<HTMLImageElement, 'srcset' | 'sizes' | 'width' | 'height'>>

export type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export type CarouselContextType = {
  bodyRect: Rect
  totalImages: number
  currentIndex: number
  offset: { top: number; bottom: number } | undefined
  setCurrentIndex: (index: number) => void
  springApi: SpringRef<ImageSpringProps>
}

export interface IconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  cn?: ClassValue
}

export type setRect = (rect: Rect) => void
