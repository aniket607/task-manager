"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ListTodo, FolderKanban } from 'lucide-react'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const navItems = [
  {
    title: 'Tasks',
    href: '/dashboard',
    icon: ListTodo
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: FolderKanban
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { state, setOpenMobile, isMobile } = useSidebar()
  const isCollapsed = state === "collapsed"

  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <ShadcnSidebar 
      collapsible="icon" 
      className="border-none"
      variant="sidebar"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:opacity-0">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.href}
                      className={cn(
                        "w-full",
                        pathname === item.href && "bg-accent"
                      )}
                      onClick={handleNavigation}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  )
} 