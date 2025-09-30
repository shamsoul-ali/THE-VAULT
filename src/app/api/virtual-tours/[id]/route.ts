import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('virtual_tours')
      .select('*')
      .eq('car_id', params.id)
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: data || null
    })

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { video_url, tour_title, tour_description } = await request.json()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if virtual tour already exists
    const { data: existingTour } = await supabase
      .from('virtual_tours')
      .select('id')
      .eq('car_id', params.id)
      .single()

    let result

    if (existingTour) {
      // Update existing tour
      result = await supabase
        .from('virtual_tours')
        .update({
          video_url,
          tour_title,
          tour_description,
          is_active: true
        })
        .eq('car_id', params.id)
        .select()
        .single()
    } else {
      // Create new tour
      result = await supabase
        .from('virtual_tours')
        .insert({
          car_id: params.id,
          video_url,
          tour_title,
          tour_description,
          is_active: true
        })
        .select()
        .single()
    }

    if (result.error) throw result.error

    return NextResponse.json({
      success: true,
      data: result.data
    })

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { tour_title, tour_description } = await request.json()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('virtual_tours')
      .update({
        tour_title,
        tour_description
      })
      .eq('car_id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data
    })

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get the virtual tour to delete the video file
    const { data: tour } = await supabase
      .from('virtual_tours')
      .select('video_url')
      .eq('car_id', params.id)
      .single()

    // Delete the database record
    const { error } = await supabase
      .from('virtual_tours')
      .delete()
      .eq('car_id', params.id)

    if (error) throw error

    // Optionally delete the video file from storage
    if (tour?.video_url) {
      const urlParts = tour.video_url.split('/')
      const fileName = urlParts[urlParts.length - 1]
      const filePath = `virtual-tours/${fileName}`

      await supabase.storage
        .from('car-images')
        .remove([filePath])
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 })
  }
}