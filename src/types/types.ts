import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { Vector2 } from '@use-gesture/react'
import { SpringConfig, SpringRef, SpringValues } from '@react-spring/web'
import { ClassValue } from 'clsx'

export type Thumbnail = {
  url: string
  width: number
  height: number
}

export type Images = {
  id: string
  name: string
  dimension: { width: number; height: number }
  thumbnails: Thumbnail[]
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
  config?: SpringConfig
}

export type ImageSpring = SpringValues<ImageSpringProps & CSSProperties>

export type Rect = Omit<DOMRect, 'toJSON'>

export type ImageProps = Pick<HTMLImageElement, 'src'> & {
  maxWidth: number
  containedWidth: number
  aspectRatio: number
  thumbnails: Thumbnail[]
}

export type ContainedImage = ImageProps & { springValues: ImageSpringProps }

export type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export type CarouselContextType = {
  springApi: SpringRef<ImageSpringProps>
  bodyRect: Rect
  topbarRect: Rect
  bottombarRect: Rect
  totalImages: number
  image: ImageProps
  currentIndex: number
  setCurrentIndex: (index: number) => void
  zoom: number
  setZoom: (zoom: number) => void
}

export interface IconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  cn?: ClassValue
}

export type setRect = (rect: Rect) => void
