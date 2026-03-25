import { ReactNode } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from './actions'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* MINIMAL TOP NAVBAR */}
      <nav className="w-full bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/admin">
          <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-zinc-500 font-light">Panel</span></h2>
        </Link>
        <div className="flex items-center gap-6">
          <p className="text-sm text-zinc-400 hidden sm:block">{user.email}</p>
          <form action={logout}>
            <button className="text-sm text-red-400 hover:text-red-300 transition-colors bg-red-950/30 hover:bg-red-900/50 px-4 py-2 rounded-full">
              Log Out
            </button>
          </form>
        </div>
      </nav>
      
      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}
