import { createClient } from '@/utils/supabase/server'
import AdminTabs from './AdminTabs'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const [
    { data: projects },
    { data: testimonials },
    { data: messages }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
    supabase.from('messages').select('*').order('created_at', { ascending: false })
  ])

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Dashboard</h1>
      </div>
      
      <AdminTabs 
        projects={projects || []} 
        testimonials={testimonials || []} 
        messages={messages || []} 
      />
    </div>
  )
}
