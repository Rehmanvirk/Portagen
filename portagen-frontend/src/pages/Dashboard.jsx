import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { portfolioAPI } from '../api/portfolioAPI'
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await portfolioAPI.getPortfolios()
        setPortfolios(response.data)
      } catch (error) {
        toast.error('Failed to fetch portfolios')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolios()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      try {
        await portfolioAPI.deletePortfolio(id)
        setPortfolios(portfolios.filter(portfolio => portfolio._id !== id))
        toast.success('Portfolio deleted successfully')
      } catch (error) {
        toast.error('Failed to delete portfolio')
        console.error(error)
      }
    }
  }

  const handleDownloadZip = async (id, title) => {
    try {
      const response = await portfolioAPI.downloadAsZip(id)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${title || 'portfolio'}.zip`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Portfolio downloaded as ZIP')
    } catch (error) {
      toast.error('Failed to download portfolio')
      console.error(error)
    }
  }

  const handleDownloadPdf = async (id, title) => {
    try {
      const response = await portfolioAPI.downloadAsPdf(id)
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${title || 'portfolio'}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Portfolio downloaded as PDF')
    } catch (error) {
      toast.error('Failed to download portfolio')
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Portfolios
              </h1>
              <p className="text-base text-gray-600 max-w-2xl">
                Manage and showcase your professional portfolios. Create, edit, and download in multiple formats.
              </p>
            </div>
            <Link
              to="/portfolio/create"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
              Create Portfolio
            </Link>
          </div>
        </div>

        {/* Portfolios Grid/List */}
        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {portfolios.map((portfolio, index) => (
              <div
                key={portfolio._id}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Portfolio Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {portfolio.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900 truncate mb-1">
                            {portfolio.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                              </svg>
                              {portfolio.templateId?.name || 'Custom Template'}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(portfolio.createdAt).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap">
                      <Link
                        to={`/portfolio/preview/${portfolio._id}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 text-gray-700 text-sm font-medium transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        title="Preview Portfolio"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Preview</span>
                      </Link>
                      
                      <Link
                        to={`/portfolio/edit/${portfolio._id}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 text-gray-700 text-sm font-medium transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        title="Edit Portfolio"
                      >
                        <PencilIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>

                      <div className="relative group/download">
                        <button
                          onClick={() => handleDownloadZip(portfolio._id, portfolio.title)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                          title="Download as ZIP"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                          <span className="hidden sm:inline">ZIP</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleDownloadPdf(portfolio._id, portfolio.title)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        title="Download as PDF"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>

                      <button
                        onClick={() => handleDelete(portfolio._id)}
                        className="inline-flex items-center justify-center p-2.5 rounded-xl bg-red-50 text-red-600 transition-all duration-200 hover:bg-red-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        title="Delete Portfolio"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-dashed border-gray-200 p-12 text-center shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50"></div>
            <div className="relative">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No portfolios yet</h3>
              <p className="text-base text-gray-600 mb-8 max-w-md mx-auto">
                Start building your professional presence. Create your first portfolio in minutes.
              </p>
              <Link
                to="/portfolio/create"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PlusIcon className="h-5 w-5" />
                Create Your First Portfolio
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}