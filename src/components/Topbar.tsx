import { Maximize2, Menu } from 'lucide-react'

export default function Topbar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}) {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className="p-4 bg-inherit flex gap-4 justify-between items-center text-slate-200 relative">
      <button
        onClick={toggleSidebar}
        className="hover:text-slate-400 focus:outline-none focus:text-slate-400 lg:hidden">
        <Menu size={24} />
      </button>
      <div className="lg:ml-auto">
        <button className=" hover:text-slate-400 focus:outline-none focus:text-slate-400">
          <Maximize2 size={24} />
        </button>
      </div>
    </div>
  )
}
