'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function TestSupabase() {
  const [status, setStatus] = useState<any>({})
  const [testing, setTesting] = useState(true)

  useEffect(() => {
    runTests()
  }, [])

  const runTests = async () => {
    setTesting(true)
    const results: any = {}

    // Test 1: Check environment variables
    results.env = {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL
    }

    // Test 2: Check Supabase client
    results.client = {
      exists: !!supabase,
      type: typeof supabase
    }

    // Test 3: Try a simple query with timeout
    try {
      console.log('Testing cars query...')
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const { data, error, count } = await supabase
        .from('cars')
        .select('*', { count: 'exact', head: true })
        .abortSignal(controller.signal)

      clearTimeout(timeoutId)

      results.carsTable = {
        success: !error,
        error: error?.message,
        count: count
      }
    } catch (err: any) {
      results.carsTable = {
        success: false,
        error: err.message || 'Query failed'
      }
    }

    // Test 4: Try to fetch actual data
    try {
      console.log('Fetching actual cars...')
      const { data, error } = await supabase
        .from('cars')
        .select('id, name')
        .limit(1)

      results.carData = {
        success: !error,
        error: error?.message,
        data: data
      }
    } catch (err: any) {
      results.carData = {
        success: false,
        error: err.message || 'Fetch failed'
      }
    }

    // Test 5: Check auth status
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      results.auth = {
        hasSession: !!session,
        error: error?.message
      }
    } catch (err: any) {
      results.auth = {
        hasSession: false,
        error: err.message || 'Auth check failed'
      }
    }

    setStatus(results)
    setTesting(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>

      {testing ? (
        <p>Testing connection...</p>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/10 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Environment Variables</h2>
            <pre className="text-sm">{JSON.stringify(status.env, null, 2)}</pre>
          </div>

          <div className="bg-white/10 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Supabase Client</h2>
            <pre className="text-sm">{JSON.stringify(status.client, null, 2)}</pre>
          </div>

          <div className="bg-white/10 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Cars Table Access</h2>
            <pre className="text-sm">{JSON.stringify(status.carsTable, null, 2)}</pre>
          </div>

          <div className="bg-white/10 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Car Data Fetch</h2>
            <pre className="text-sm">{JSON.stringify(status.carData, null, 2)}</pre>
          </div>

          <div className="bg-white/10 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Auth Status</h2>
            <pre className="text-sm">{JSON.stringify(status.auth, null, 2)}</pre>
          </div>

          <button
            onClick={runTests}
            className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
          >
            Run Tests Again
          </button>
        </div>
      )}
    </div>
  )
}