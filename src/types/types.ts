import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { Vector2 } from '@use-gesture/react'
import { SpringConfig, SpringRef, SpringValues } from '@react-spring/web'
import { ClassValue } from 'clsx'

export type Images = {
  src: string
  width: number
  height: number
}[]

export type PinchMemo = {
  width: number
  tx: number
  ty: number
  x: number
  y: number
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
  scale: number
  width: number
  height: number
  maxWidth: number
  aspectRatio: number
  config?: SpringConfig
}

export type ImageSpring = SpringValues<ImageSpringProps & CSSProperties>

export type Rect = Omit<DOMRect, 'toJSON'>

export type ImageProps = Pick<HTMLElement & HTMLImageElement, 'src'> & {
  index: number
  style: ImageSpring
  containedWidth: number
} & Partial<Pick<HTMLImageElement, 'srcset' | 'sizes' | 'width' | 'height'>>

export type ContainedImage = Omit<ImageProps, 'style'> & { springValues: ImageSpringProps }

export type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export type CarouselContextType = {
  bodyRect: Rect
  topbarRect: Rect
  bottombarRect: Rect
  totalImages: number
  currentIndex: number
  setCurrentIndex: (index: number) => void
  springApi: SpringRef<ImageSpringProps>
  zoom: number
  setZoom: (zoom: number) => void
}

export interface IconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  cn?: ClassValue
}

export type setRect = (rect: Rect) => void
