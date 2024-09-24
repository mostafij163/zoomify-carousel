import { CSSProperties } from 'react'
import { Vector2 } from '@use-gesture/react'
import { SpringConfig, SpringRef, SpringValues } from '@react-spring/web'

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
  aspectRatio: number
  config?: SpringConfig
} & Pick<CSSProperties, 'position'>

export type ImageSpring = SpringValues<ImageSpringProps & CSSProperties>

export type Rect = Omit<DOMRect, 'toJSON'>

export type ImageProps = Pick<HTMLElement & HTMLImageElement, 'src'> & {
  id: number
  totalImgCount: number
  heightOffset: number
  setIndex: (index: number) => void
  style: ImageSpring
  springApi: SpringRef<ImageSpringProps>
  bodyRect: Rect
} & Partial<Pick<HTMLImageElement, 'srcset' | 'sizes' | 'width' | 'height'>>

export type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}
