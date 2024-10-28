import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { resolutions } from './constants'

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
export function resizeImage(imgUrl: string, width: number, maxWidth: number): string {
  const resolution = resolutions.find(r => {
    return r >= calcResponsiveWidth(Math.floor(width))
  })

  const url = new URL(imgUrl)

  url.pathname = url.pathname.replace(/_w_\d+/, `_w_${Math.min(resolution!, maxWidth)}`)

  return url.toString()
  // const url = new URL(imgUrl)
  // url.searchParams.set('w', `${Math.ceil(calcResponsiveWidth(width))}`)
  // url.searchParams.set('q', '100')

  // return url.toString()
}

export function mergeClasses(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}

export const getSlideIndex = (i: number, dir: number, len: number) => (i + dir + len) % len

export const calcZoomPercent = (width: number, maxWidth: number) => (width / calcActualWidth(maxWidth)) * 100

// export const getScaleFromZoom = (zoom: number, width: number, maxWidth: number) =>
