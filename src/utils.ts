import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const calcImgWidth = (width: number) => {
  return width * devicePixelRatio || 1
}

/*calculate image width maintaining image aspect ratio */
export function measureContainedImgWidth(
  { width, height }: { height: number; width: number },
  apsectRatio: number
): number {
  const imgWidth = Math.min(width, Number((apsectRatio > width / height ? width : height * apsectRatio).toFixed(3)))

  return imgWidth
}

/*resize image width based on container size*/
export function resizeImage(imgUrl: string, width: number): string {
  const url = new URL(imgUrl)
  url.searchParams.set('w', `${Math.ceil(calcImgWidth(width))}`)

  return url.toString()
}

export function mergeClasses(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}

export function getNextSlideIndex(index: number, dir: number, length: number): number {
  return (index + dir + length) % length
}
