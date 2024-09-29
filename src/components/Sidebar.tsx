import { X } from 'lucide-react'
import { SidebarProps } from '../types/types'

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-[70%] min-w-64 max-w-72 bg-slate-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0`}>
      <div className="flex justify-between items-center p-4 lg:hidden">
        <button onClick={onClose} className="text-slate-700 hover:text-slate-900">
          <X size={24} />
        </button>
      </div>
      <div className="p-4">
        <h1 className="text-3xl text-slate-600">Sidebar</h1>
      </div>
    </div>
  )
}
