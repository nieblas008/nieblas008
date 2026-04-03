'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/admin/login')
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const project_url = formData.get('project_url') as string
  const is_published = formData.get('is_published') === 'on'

  const { error } = await supabase.from('projects').insert({
    title, description, project_url, is_published,
  })

  if (!error) {
    revalidatePath('/')
    revalidatePath('/admin')
  }
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const { error } = await supabase.from('projects').delete().eq('id', id)
  
  if (!error) {
    revalidatePath('/')
    revalidatePath('/admin')
  }
}

export async function toggleProjectVisibility(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const currentStatus = formData.get('currentStatus') === 'true'
  
  const { error } = await supabase.from('projects').update({ is_published: !currentStatus }).eq('id', id)
  
  if (!error) {
    revalidatePath('/')
    revalidatePath('/admin')
  }
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient()
  const author_name = formData.get('author_name') as string
  const author_title = formData.get('author_title') as string
  const content = formData.get('content') as string
  const is_published = formData.get('is_published') === 'on'

  const { error } = await supabase.from('testimonials').insert({
    author_name, author_title, content, is_published,
  })

  if (!error) {
    revalidatePath('/')
    revalidatePath('/admin')
  }
}

export async function deleteTestimonial(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  
  if (!error) {
    revalidatePath('/')
    revalidatePath('/admin')
  }
}

export async function toggleTestimonialVisibility(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const currentStatus = formData.get('currentStatus') === 'true'
  
  const { error } = await supabase.from('testimonials').update({ is_published: !currentStatus }).eq('id', id)
  
  if (!error) {
    revalidatePath('/')
    revalidatePath('/admin')
  }
}

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  const { error } = await supabase.from('messages').insert({
    name, email, message,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function deleteMessage(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const { error } = await supabase.from('messages').delete().eq('id', id)
  
  if (!error) {
    revalidatePath('/admin')
  }
}

export async function toggleMessageStatus(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const currentStatus = formData.get('currentStatus') as string
  const newStatus = currentStatus === 'unread' ? 'read' : 'unread'
  
  const { error } = await supabase.from('messages').update({ status: newStatus }).eq('id', id)
  
  if (!error) {
    revalidatePath('/admin')
  }
}
