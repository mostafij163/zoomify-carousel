import { mergeClasses } from '../utils'
import { IconButton } from '../types/types'

export default function ToolbarIcnBtn({ children, className, cn, ...rest }: IconButton) {
  return (
    <button
      {...rest}
      className={mergeClasses(
        'text-slate-100 hover:text-slate-300 focus:outline-none focus:text-slate-300',
        cn,
        className
      )}>
      {children}
    </button>
  )
}
