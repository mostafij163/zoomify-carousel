'use client'
import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { mergeClasses } from '../utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={mergeClasses('cursor-pointer relative flex w-full touch-none select-none items-center', className)}
      {...props}>
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-500 border-gray-500 border-2">
        <SliderPrimitive.Range className="absolute h-full bg-slate-200" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className=" block h-4 w-4 rounded-full border-2 border-slate-200 bg-slate-900 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
