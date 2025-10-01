import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch only gallery-selected images, limited to 10, ordered by sort_order
    const { data, error } = await supabase
      .from('car_images')
      .select('*')
      .eq('car_id', id)
      .eq('gallery_selected', true)
      .order('sort_order', { ascending: true })
      .limit(10)

    if (error) throw error

    return NextResponse.json({ success: true, data: data || [] })

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to fetch gallery images'
    }, { status: 500 })
  }
}