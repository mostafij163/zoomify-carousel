import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const calcResponsiveImgWidth = (width: number) => width * devicePixelRatio || 1

export const calcActualImgWidth = (responsiveWidth: number) => responsiveWidth / devicePixelRatio || 1

/*calculate image width maintaining image aspect ratio */
export function measureContainedSize(
  { width, height }: { width: number; height: number },
  apsectRatio: number
): [number, number] {
  return apsectRatio > width / height ? [width, width / apsectRatio] : [height * apsectRatio, height]
}

/*resize image width based on container size*/
export function resizeImage(imgUrl: string, width: number): string {
  const url = new URL(imgUrl)
  url.searchParams.set('w', `${Math.ceil(calcResponsiveImgWidth(width))}`)

  return url.toString()
}

export function mergeClasses(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}

export const getSlideIndex = (i: number, dir: number, len: number) => (i + dir + len) % len
