"use client"

import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAuthStore } from "@/lib/store/auth-store"

function SessionSync() {
  const { data: session } = useSession()
  const setSession = useAuthStore(state => state.setSession)

  useEffect(() => {
    setSession(session)
  }, [session, setSession])

  return null
}

export default function CustomSessionProvider({ children, session }: { 
  children: React.ReactNode
  session: any 
}) {
  return (
    <SessionProvider session={session}>
      <SessionSync />
      {children}
    </SessionProvider>
  )
} 