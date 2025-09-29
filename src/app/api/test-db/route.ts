import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    console.log('Testing Supabase connection from API route...')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey
      }, { status: 500 })
    }

    // Create a fresh client
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test the connection
    const { data, error, count } = await supabase
      .from('cars')
      .select('*', { count: 'exact' })
      .limit(5)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({
        error: error.message,
        details: error,
        url: supabaseUrl
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      count: count,
      data: data,
      url: supabaseUrl
    })

  } catch (err: any) {
    console.error('Unexpected error:', err)
    return NextResponse.json({
      error: err.message || 'Unknown error',
      stack: err.stack
    }, { status: 500 })
  }
}