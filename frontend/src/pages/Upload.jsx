import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Upload as UploadIcon, Loader, CheckCircle, AlertCircle, File } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function Upload() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.xlsx')) {
        toast.error('Please upload an Excel file (.xlsx)')
        return
      }
      setFile(selectedFile)
      setSuccess(false)
    }
  }

  const handleDragAndDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile && droppedFile.name.endsWith('.xlsx')) {
      setFile(droppedFile)
      setSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(progress)
        },
      })

      setSuccess(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      toast.success('File uploaded and analysis started!')
      setTimeout(() => navigate('/results'), 2000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">Upload Your Data</h1>
          <p className="text-xl text-gray-300">
            Select your expense spreadsheet to begin the analysis
          </p>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDragAndDrop}
          className="neon-box backdrop-blur-xl bg-white/5 rounded-2xl p-12 text-center hover:bg-white/10 transition-all"
        >
          <div className="relative">
            {/* 3D-like effect */}
            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full" />
            
            <div className="relative">
              <UploadIcon className="w-24 h-24 mx-auto mb-6 text-purple-400 animate-bounce" />

              <h2 className="text-3xl font-bold mb-4">
                {file ? '✨ Ready to Analyze' : 'Drag & Drop Your File'}
              </h2>

              {file ? (
                <div className="mb-8 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-center gap-3">
                    <File className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold text-green-400">{file.name}</p>
                      <p className="text-sm text-gray-300">
                        {(file.size / 1024).toFixed(2)} KB ready to process
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 mb-6">
                  or click the button below to select your Excel file
                </p>
              )}

              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                disabled={loading}
              />

              <label htmlFor="fileInput" className="inline-block">
                <button
                  type="button"
                  onClick={() => document.getElementById('fileInput').click()}
                  disabled={loading}
                  className="gradient-btn px-8 py-3 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all disabled:opacity-50 mb-4"
                >
                  Browse Files
                </button>
              </label>

              {file && (
                <button
                  onClick={() => {
                    setFile(null)
                    setSuccess(false)
                  }}
                  className="ml-3 px-6 py-3 rounded-lg glass text-gray-300 hover:text-white transition-all"
                  disabled={loading}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Loader className="w-6 h-6 text-purple-400 animate-spin" />
                <span className="text-lg text-gray-300">Processing your file...</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-400">{uploadProgress}% Complete</p>
            </div>
          )}

          {success && (
            <div className="mt-8 flex items-center justify-center gap-3 text-green-400 text-lg font-semibold">
              <CheckCircle className="w-6 h-6" />
              Analysis Complete! Redirecting...
            </div>
          )}

          {file && !loading && (
            <button
              onClick={handleUpload}
              className="gradient-btn px-12 py-4 rounded-lg text-white font-semibold mt-8 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all w-full text-lg"
            >
              Start Analysis
            </button>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {[
            {
              title: 'Supported Format',
              description: 'Excel files (.xlsx)',
              icon: '📄',
            },
            {
              title: 'Max Size',
              description: '50 MB',
              icon: '💾',
            },
            {
              title: 'Processing Time',
              description: 'Usually < 2 minutes',
              icon: '⚡',
            },
          ].map((info, idx) => (
            <div key={idx} className="glass rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">{info.icon}</div>
              <h3 className="font-semibold mb-1">{info.title}</h3>
              <p className="text-sm text-gray-300">{info.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
