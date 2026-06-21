import { NextResponse } from 'next/server'
import { uploadImageToSupabase } from '@/lib/supabase'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 })
    }

    const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    // Option 1: Supabase Upload (Production Ready)
    if (hasSupabase) {
      try {
        const publicUrl = await uploadImageToSupabase(file)
        return NextResponse.json({ url: publicUrl })
      } catch (error: any) {
        console.error('Supabase upload error:', error)
        return NextResponse.json({ error: error.message || 'Failed to upload to Supabase' }, { status: 500 })
      }
    } 
    
    // Option 2: Local File System Upload (Fallback for local testing)
    else {
      console.log("No Supabase credentials found. Falling back to local upload.");
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Directory might already exist
      }
      
      await writeFile(path.join(uploadDir, filename), buffer);
      return NextResponse.json({ url: `/uploads/${filename}` });
    }
  } catch (error) {
    console.error('Upload API Error:', error)
    return NextResponse.json({ error: 'Failed to process file upload' }, { status: 500 })
  }
}
