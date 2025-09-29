// Test Simple Upload - Run this in browser console on your admin page
// This bypasses any potential RLS or auth issues

async function testSimpleUpload() {
  console.log('Testing simple upload...')

  // Create a small test image blob
  const canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 100
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, 100, 100)

  canvas.toBlob(async (blob) => {
    const file = new File([blob], 'test-image.png', { type: 'image/png' })
    const fileName = `test-${Date.now()}.png`

    console.log('File created:', file)

    try {
      // Get current user session
      const { data: { session }, error: sessionError } = await window.supabase.auth.getSession()
      console.log('Session:', session)
      console.log('Session error:', sessionError)

      // Try upload with minimal path
      const { data, error } = await window.supabase.storage
        .from('car-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      console.log('Upload result:', { data, error })

      if (data) {
        // Get public URL
        const { data: urlData } = window.supabase.storage
          .from('car-images')
          .getPublicUrl(data.path)

        console.log('Public URL:', urlData.publicUrl)
      }

    } catch (err) {
      console.error('Upload failed:', err)
    }
  }, 'image/png')
}

// Make supabase available globally for testing
if (typeof window !== 'undefined') {
  window.supabase = window.supabase || (await import('@/lib/supabase/client')).supabase
}

console.log('Run testSimpleUpload() to test upload')