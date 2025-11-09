import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { templateAPI } from '../api/templateAPI'
import { useAuth } from '../contexts/AuthContext'
import { LockClosedIcon, EyeIcon, SparklesIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export const Templates = () => {
  const [templates, setTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await templateAPI.getTemplates()
        setTemplates(response.data)
      } catch (error) {
        toast.error('Failed to fetch templates')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="relative inline-flex">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="text-sm font-medium text-gray-600">Loading templates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <SparklesIcon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">Premium Templates Available</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Choose Your Template
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a professionally designed template to get started with your portfolio. Customize it to make it uniquely yours.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div 
              key={template._id} 
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
            >
              {/* Premium Badge */}
              {template.isPremium && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg">
                    {user?.isPremium ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold text-white">Unlocked</span>
                      </>
                    ) : (
                      <>
                        <LockClosedIcon className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold text-white">Premium</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Template Preview Image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={template.previewUrl}
                  alt={template.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Link
                    to={user ? "/portfolio/create" : "/register"}
                    state={{ templateId: template._id }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                  >
                    <EyeIcon className="w-5 h-5" />
                    Use Template
                  </Link>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                  {template.description}
                </p>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {template.isPremium && !user?.isPremium ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <LockClosedIcon className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-sm font-semibold text-orange-600">Premium Only</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-semibold text-green-600">Available</span>
                    </div>
                  )}

                  <Link
                    to={user ? "/portfolio/create" : "/register"}
                    state={{ templateId: template._id }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group/link"
                  >
                    Select
                    <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {templates.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <SparklesIcon className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Templates Available</h3>
            <p className="text-gray-600">Check back soon for new templates!</p>
          </div>
        )}

        {/* Premium CTA Section */}
        {!user?.isPremium && templates.some(t => t.isPremium) && (
          <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <SparklesIcon className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">Upgrade to Premium</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Unlock All Premium Templates
              </h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                Get access to exclusive premium templates, advanced customization options, and priority support.
              </p>
              
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Pricing
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}