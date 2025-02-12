import { Sidebar } from '@/components/sidebar/sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex h-16 items-center px-4">
            <SidebarTrigger className='border shadow' />
          </div>
          <div className="flex-1 px-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 