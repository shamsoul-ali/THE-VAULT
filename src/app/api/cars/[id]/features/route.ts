import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { features } = await request.json()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // First, delete existing features
    await supabase
      .from('car_features')
      .delete()
      .eq('car_id', params.id)

    // Then add new features if any
    if (features && features.length > 0) {
      const featureData = features.map((feature: string, index: number) => ({
        car_id: params.id,
        feature_name: feature.trim(),
        sort_order: index
      }))

      const { error } = await supabase
        .from('car_features')
        .insert(featureData)

      if (error) throw error
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 })
  }
}