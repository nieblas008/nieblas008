import { createClient } from '@/utils/supabase/server'
import { 
  createProject, deleteProject, toggleProjectVisibility,
  createTestimonial, deleteTestimonial, toggleTestimonialVisibility
} from './actions'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const [
    { data: projects },
    { data: testimonials }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  ])

  return (
    <div className="space-y-16">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      {/* OVERVIEW STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col">
          <h2 className="text-lg text-zinc-400 font-medium mb-2">Total Projects</h2>
          <span className="text-4xl font-bold text-white">{projects?.length || 0}</span>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col">
          <h2 className="text-lg text-zinc-400 font-medium mb-2">Total Testimonials</h2>
          <span className="text-4xl font-bold text-white">{testimonials?.length || 0}</span>
        </div>
      </div>

      <hr className="border-zinc-800" />

      {/* PROJECTS SECTION */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-zinc-900 border border-zinc-800 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4 text-white">Add New Project</h3>
            <form action={createProject} className="flex flex-col gap-4 text-zinc-300">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input name="title" required className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea name="description" required rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block text-sm mb-1">Project URL (Optional)</label>
                <input name="project_url" type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white outline-none focus:border-zinc-500" />
              </div>
              <div className="flex items-center gap-2">
                <input name="is_published" id="is_published_proj" type="checkbox" defaultChecked className="w-4 h-4" />
                <label htmlFor="is_published_proj" className="text-sm">Publish immediately</label>
              </div>
              <button type="submit" className="mt-2 bg-white text-black font-semibold rounded px-4 py-2 hover:bg-zinc-200 transition-colors">
                Save Project
              </button>
            </form>
          </div>

          <div className="xl:col-span-2">
            {projects && projects.length === 0 ? (
              <div className="text-zinc-500 border border-zinc-800 border-dashed rounded-lg p-8 text-center bg-zinc-900/50">
                No projects found.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {projects?.map((project) => (
                  <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-sm hover:border-zinc-700 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-bold text-white">{project.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${project.is_published ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-yellow-900/40 text-yellow-400 border border-yellow-800'}`}>
                          {project.is_published ? 'Published' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 mb-2 line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:justify-center">
                      <form action={toggleProjectVisibility}>
                        <input type="hidden" name="id" value={project.id} />
                        <input type="hidden" name="currentStatus" value={String(project.is_published)} />
                        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-sm py-1.5 px-3 rounded transition-colors whitespace-nowrap">
                          {project.is_published ? 'Hide' : 'Publish'}
                        </button>
                      </form>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <button className="w-full text-red-400 hover:bg-red-950 hover:text-red-300 text-sm py-1.5 px-3 rounded transition-colors whitespace-nowrap border border-transparent hover:border-red-900/50">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
            </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-zinc-800" />

      {/* TESTIMONIALS SECTION */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-zinc-900 border border-zinc-800 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4 text-white">Add New Testimonial</h3>
            <form action={createTestimonial} className="flex flex-col gap-4 text-zinc-300">
              <div>
                <label className="block text-sm mb-1">Author Name</label>
                <input name="author_name" required className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block text-sm mb-1">Author Title (Optional)</label>
                <input name="author_title" placeholder="e.g. CEO, Google" className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block text-sm mb-1">Content / Review</label>
                <textarea name="content" required rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white outline-none focus:border-zinc-500" />
              </div>
              <div className="flex items-center gap-2">
                <input name="is_published" id="is_published_test" type="checkbox" defaultChecked className="w-4 h-4" />
                <label htmlFor="is_published_test" className="text-sm">Publish immediately</label>
              </div>
              <button type="submit" className="mt-2 bg-white text-black font-semibold rounded px-4 py-2 hover:bg-zinc-200 transition-colors">
                Save Testimonial
              </button>
            </form>
          </div>

          <div className="xl:col-span-2">
            {testimonials && testimonials.length === 0 ? (
              <div className="text-zinc-500 border border-zinc-800 border-dashed rounded-lg p-8 text-center bg-zinc-900/50">
                No testimonials found.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {testimonials?.map((t) => (
                  <div key={t.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-sm hover:border-zinc-700 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">{t.author_name}</h4>
                        {t.author_title && <span className="text-sm text-zinc-400">({t.author_title})</span>}
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${t.is_published ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-yellow-900/40 text-yellow-400 border border-yellow-800'}`}>
                          {t.is_published ? 'Published' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 italic mb-2">"{t.content}"</p>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:justify-center border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-4">
                      <form action={toggleTestimonialVisibility}>
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="currentStatus" value={String(t.is_published)} />
                        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-sm py-1.5 px-3 rounded transition-colors whitespace-nowrap">
                          {t.is_published ? 'Hide' : 'Publish'}
                        </button>
                      </form>
                      <form action={deleteTestimonial}>
                        <input type="hidden" name="id" value={t.id} />
                        <button className="w-full text-red-400 hover:bg-red-950 hover:text-red-300 text-sm py-1.5 px-3 rounded transition-colors whitespace-nowrap border border-transparent hover:border-red-900/50">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}
