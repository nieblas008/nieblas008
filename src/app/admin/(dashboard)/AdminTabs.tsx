'use client'

import { useState } from 'react'
import { 
  FolderPlus, 
  MessageSquare, 
  Users, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Circle,
  Star as StarIcon,
  LayoutDashboard
} from 'lucide-react'
import { 
  createProject, deleteProject, toggleProjectVisibility,
  createTestimonial, deleteTestimonial, toggleTestimonialVisibility,
  deleteMessage, toggleMessageStatus
} from './actions'

type Tab = 'projects' | 'testimonials' | 'messages'

export default function AdminTabs({ projects, testimonials, messages }: { projects: any[], testimonials: any[], messages: any[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('projects')

  const stats = [
    { label: 'Projects', count: projects?.length || 0, tab: 'projects' as Tab, color: 'text-blue-400' },
    { label: 'Testimonials', count: testimonials?.length || 0, tab: 'testimonials' as Tab, color: 'text-green-400' },
    { label: 'Inquiries', count: messages?.length || 0, tab: 'messages' as Tab, color: 'text-indigo-400' }
  ]

  return (
    <div className="flex flex-col gap-10 pb-24 md:pb-0">
      {/* OVERVIEW STATS (Desktop Only) */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={() => setActiveTab(stat.tab)}
            className={`bg-zinc-900 border transition-all rounded-xl p-6 flex flex-col shadow-sm text-left ${
              activeTab === stat.tab ? 'border-zinc-500 ring-1 ring-zinc-500' : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <h2 className="text-sm text-zinc-400 font-medium mb-1 uppercase tracking-wider">{stat.label}</h2>
            <span className={`text-4xl font-bold ${stat.color}`}>{stat.count}</span>
          </button>
        ))}
      </div>

      {/* Tab content space-saver */}
      <div className="h-2" />


      {/* TAB CONTENT */}
      <div className="min-h-[500px]">
        {activeTab === 'projects' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-blue-400" />
                  Add New Project
                </h3>
                <form action={createProject} className="flex flex-col gap-5 text-zinc-300">
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Title</label>
                    <input name="title" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Description</label>
                    <textarea name="description" required rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Image URL</label>
                    <input name="image_url" placeholder="https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Project URL (Optional)</label>
                    <input name="project_url" type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <input name="is_published" id="is_published_proj" type="checkbox" defaultChecked className="w-4 h-4 accent-blue-500" />
                    <label htmlFor="is_published_proj" className="text-sm font-medium">Publish immediately</label>
                  </div>
                  <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg px-4 py-3 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                    Save Project
                  </button>
                </form>
              </div>

              <div className="xl:col-span-2 space-y-4">
                {projects.length === 0 ? (
                  <div className="text-zinc-500 border border-zinc-800 border-dashed rounded-xl p-12 text-center bg-zinc-900/30">
                    No projects found.
                  </div>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-sm hover:border-zinc-700 transition-all group">
                      <div className="flex gap-4">
                        {project.image_url && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0">
                            <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-lg font-bold text-white">{project.title}</h4>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${project.is_published ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-yellow-900/40 text-yellow-400 border border-yellow-800'}`}>
                              {project.is_published ? 'Published' : 'Hidden'}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-400 mb-2 line-clamp-2 leading-relaxed">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:flex-col sm:justify-center border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-4">
                        <form action={toggleProjectVisibility} className="w-full">
                          <input type="hidden" name="id" value={project.id} />
                          <input type="hidden" name="currentStatus" value={String(project.is_published)} />
                          <button className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold py-2 px-3 rounded-lg transition-colors whitespace-nowrap">
                            {project.is_published ? <><EyeOff className="w-3.5 h-3.5" /> Hide</> : <><Eye className="w-3.5 h-3.5" /> Publish</>}
                          </button>
                        </form>
                        <form action={deleteProject} className="w-full">
                          <input type="hidden" name="id" value={project.id} />
                          <button className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-950/30 text-xs font-bold py-2 px-3 rounded-lg transition-all border border-transparent hover:border-red-900/30">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  Add New Testimonial
                </h3>
                <form action={createTestimonial} className="flex flex-col gap-5 text-zinc-300">
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Author Name</label>
                    <input name="author_name" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-green-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Author Title (Optional)</label>
                    <input name="author_title" placeholder="e.g. CEO, Google" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-green-500 transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Rating (1-5)</label>
                      <input name="rating" type="number" step="1" min="1" max="5" defaultValue="5" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-green-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Profile Pic URL</label>
                      <input name="author_image_url" placeholder="https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-green-500 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase text-zinc-500">Content / Review</label>
                    <textarea name="content" required rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-green-500 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <input name="is_published" id="is_published_test" type="checkbox" defaultChecked className="w-4 h-4 accent-green-500" />
                    <label htmlFor="is_published_test" className="text-sm font-medium">Publish immediately</label>
                  </div>
                  <button type="submit" className="mt-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg px-4 py-3 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]">
                    Save Testimonial
                  </button>
                </form>
              </div>

              <div className="xl:col-span-2 space-y-4">
                {testimonials.length === 0 ? (
                  <div className="text-zinc-500 border border-zinc-800 border-dashed rounded-xl p-12 text-center bg-zinc-900/30">
                    No testimonials found.
                  </div>
                ) : (
                  testimonials.map((t) => (
                    <div key={t.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm hover:border-zinc-700 transition-all group">
                      <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full border border-zinc-800 overflow-hidden bg-zinc-950 flex items-center justify-center">
                              {t.author_image_url ? (
                                <img src={t.author_image_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-lg font-bold text-zinc-600">{t.author_name.charAt(0)}</span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-white leading-tight">{t.author_name}</h4>
                              <div className="text-xs text-zinc-500">{t.author_title || 'Client'}</div>
                            </div>
                            <div className="ml-auto flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800">
                              <StarIcon className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                              <span className="text-xs font-bold text-zinc-300">{t.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-zinc-300 italic leading-relaxed border-l-2 border-zinc-800 pl-4">"{t.content}"</p>
                        </div>
                        <div className="flex items-center gap-2 sm:flex-col sm:justify-center sm:w-32 sm:border-l border-zinc-800 sm:pl-4">
                          <form action={toggleTestimonialVisibility} className="w-full">
                            <input type="hidden" name="id" value={t.id} />
                            <input type="hidden" name="currentStatus" value={String(t.is_published)} />
                            <button className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold py-2 px-3 rounded-lg transition-colors">
                              {t.is_published ? <><EyeOff className="w-3.5 h-3.5" /> Hide</> : <><Eye className="w-3.5 h-3.5" /> Publish</>}
                            </button>
                          </form>
                          <form action={deleteTestimonial} className="w-full">
                            <input type="hidden" name="id" value={t.id} />
                            <button className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-950/30 text-xs font-bold py-2 px-3 rounded-lg transition-all border border-transparent hover:border-red-900/30">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
              Incoming Messages
              {messages.filter(m => m.status === 'unread').length > 0 && (
                <span className="bg-indigo-600 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-lg shadow-indigo-900/20">
                  {messages.filter(m => m.status === 'unread').length} New
                </span>
              )}
            </h2>
            
            {messages.length === 0 ? (
              <div className="text-zinc-500 border border-zinc-800 border-dashed rounded-xl p-20 text-center bg-zinc-900/30">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg">No messages received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`bg-zinc-900 border rounded-xl overflow-hidden transition-all duration-300 ${
                      msg.status === 'unread' ? 'border-indigo-500 shadow-xl shadow-indigo-500/5' : 'border-zinc-800 opacity-80'
                    }`}
                  >
                    <div className="p-1 md:p-1 w-full bg-zinc-800/50 flex flex-col md:flex-row justify-between">
                      <div className="px-6 py-3 flex items-center gap-3">
                        {msg.status === 'unread' ? <Circle className="w-3 h-3 fill-indigo-500 text-indigo-500" /> : <CheckCircle className="w-3 h-3 text-zinc-500" />}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          {new Date(msg.created_at).toLocaleDateString()} at {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col md:flex-row justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex flex-col mb-6">
                          <h4 className="text-xl font-bold text-white mb-1">{msg.name}</h4>
                          <a href={`mailto:${msg.email}`} className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium">
                            {msg.email}
                          </a>
                        </div>
                        <div className="bg-black/40 p-6 rounded-xl border border-white/5 relative">
                          <p className="text-zinc-300 whitespace-pre-wrap text-[15px] leading-relaxed relative z-10">{msg.message}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 md:flex-col md:w-40 border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-8">
                        <form action={toggleMessageStatus} className="w-full">
                          <input type="hidden" name="id" value={msg.id} />
                          <input type="hidden" name="currentStatus" value={msg.status} />
                          <button className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-lg ${
                            msg.status === 'unread' 
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20' 
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
                          }`}>
                            {msg.status === 'unread' ? <><CheckCircle className="w-4 h-4" /> Mark Read</> : <><Circle className="w-4 h-4" /> Mark Unread</>}
                          </button>
                        </form>
                        <form action={deleteMessage} className="w-full">
                          <input type="hidden" name="id" value={msg.id} />
                          <button className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3 px-4 rounded-xl text-red-500 hover:bg-red-950/30 transition-all border border-transparent hover:border-red-900/30">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-2 flex justify-around shadow-2xl shadow-black">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all relative ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500'}`}
          >
            <FolderPlus className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Projects</span>
            <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold border border-zinc-950 ${activeTab === 'projects' ? 'bg-white text-blue-600' : 'bg-zinc-800 text-zinc-400'}`}>
              {projects.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('testimonials')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all relative ${activeTab === 'testimonials' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-zinc-500'}`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Reviews</span>
            <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold border border-zinc-950 ${activeTab === 'testimonials' ? 'bg-white text-green-600' : 'bg-zinc-800 text-zinc-400'}`}>
              {testimonials.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all relative ${activeTab === 'messages' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-500'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Inbox</span>
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold border border-zinc-950 animate-pulse">
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
