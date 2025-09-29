'use client'

import { useState, useRef } from 'react'
import { Button } from './button'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

interface ImageUploadProps {
  onUpload: (url: string, file: File) => void
  onRemove?: (url: string) => void
  maxFiles?: number
  accept?: string
  bucket?: string
  folder?: string
  existingImages?: string[]
  className?: string
}

export function ImageUpload({
  onUpload,
  onRemove,
  maxFiles = 10,
  accept = 'image/*',
  bucket = 'car-images',
  folder = 'uploads',
  existingImages = [],
  className = ''
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList) => {
    if (!files.length) return

    const totalImages = existingImages.length + files.length
    if (totalImages > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images total`)
      return
    }

    setUploading(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not a valid image file`)
          continue
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum file size is 10MB`)
          continue
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        const filePath = `${folder}/${fileName}`

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file)

        if (error) {
          console.error('Upload error:', error)
          alert(`Error uploading ${file.name}: ${error.message}`)
          continue
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath)

        if (urlData?.publicUrl) {
          onUpload(urlData.publicUrl, file)
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading images')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const handleRemoveImage = async (url: string) => {
    if (!onRemove) return

    // Extract file path from URL for deletion
    try {
      const urlParts = url.split('/')
      const fileName = urlParts[urlParts.length - 1]
      const filePath = `${folder}/${fileName}`

      // Delete from Supabase Storage
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath])

      if (error) {
        console.error('Delete error:', error)
      }

      onRemove(url)
    } catch (error) {
      console.error('Error removing image:', error)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          dragActive
            ? 'border-yellow-400 bg-yellow-400/10'
            : 'border-white/30 hover:border-white/50'
        } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-white" />
            )}
          </div>

          <div>
            <p className="text-white font-medium mb-2">
              {uploading ? 'Uploading...' : 'Drop images here or click to browse'}
            </p>
            <p className="text-white/70 text-sm">
              PNG, JPG, WebP up to 10MB each. Max {maxFiles} images.
            </p>
          </div>

          {!uploading && (
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          )}
        </div>
      </div>

      {/* Existing Images Grid */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {existingImages.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-white/10 rounded-lg overflow-hidden">
                <img
                  src={url}
                  alt={`Car image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div className="w-full h-full bg-white/10 flex items-center justify-center" style={{ display: 'none' }}>
                  <ImageIcon className="w-8 h-8 text-white/50" />
                </div>
              </div>

              {onRemove && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress/Status */}
      <div className="text-white/70 text-sm">
        {existingImages.length} of {maxFiles} images
      </div>
    </div>
  )
}