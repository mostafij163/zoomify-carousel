import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { resolutions } from './constants'
import { Thumbnail } from './types/types'

export const calcResponsiveWidth = (width: number) => width * (devicePixelRatio || 1)

export const calcActualWidth = (responsiveWidth: number) => responsiveWidth / devicePixelRatio || 1

/*calculate contained image size */
export function measureContainedSize(
  { width, height }: { width: number; height: number },
  apsectRatio: number
): [number, number] {
  return apsectRatio > width / height ? [width, width / apsectRatio] : [height * apsectRatio, height]
}

/*resize image width based on container size*/
export function resizeImage(thumbnails: Thumbnail[], width: number, maxWidth: number): string {
  const thumbnail = thumbnails.find(img => {
    return img.width > calcResponsiveWidth(Math.floor(width))
  })

  return `https://ymagy.s3.eu-central-1.amazonaws.com/${thumbnail?.url}`
}

export function mergeClasses(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}

export const getSlideIndex = (i: number, dir: number, len: number) => (i + dir + len) % len

export const calcZoomPercent = (width: number, maxWidth: number) => (width / calcActualWidth(maxWidth)) * 100

// export const getScaleFromZoom = (zoom: number, width: number, maxWidth: number) =>
