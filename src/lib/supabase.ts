import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadImageToSupabase(file: File, bucketName: string = 'website-images'): Promise<string> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials are not configured in environment variables (.env)')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const filePath = `uploads/${fileName}`

  // Use admin key if available to bypass Row-Level Security for uploads
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
  const uploadClient = createClient(supabaseUrl, adminKey)

  const { data, error } = await uploadClient.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw error
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath)
  return publicUrl
}
