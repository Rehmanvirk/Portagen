import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { portfolioAPI } from '../api/portfolioAPI'
import { DocumentArrowDownIcon, ArrowLeftIcon, CalendarIcon, MapPinIcon, EnvelopeIcon, PhoneIcon, GlobeAltIcon, BriefcaseIcon, AcademicCapIcon, CommandLineIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast'

export const PreviewPortfolio = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await portfolioAPI.getPortfolioById(id)
        setPortfolio(response.data)
      } catch (error) {
        toast.error('Failed to fetch portfolio')
        console.error(error)
        navigate('/dashboard')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolio()
  }, [id, navigate])

  const handleDownloadZip = async () => {
    try {
      const response = await portfolioAPI.downloadAsZip(id)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${portfolio.title || 'portfolio'}.zip`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Portfolio downloaded as ZIP')
    } catch (error) {
      toast.error('Failed to download portfolio')
      console.error(error)
    }
  }

  const handleDownloadPdf = async () => {
    try {
      const response = await portfolioAPI.downloadAsPdf(id)
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${portfolio.title || 'portfolio'}.pdf`)
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="relative inline-flex">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="text-sm font-medium text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h3>
          <p className="text-gray-600 mb-8">The portfolio you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 shadow-lg shadow-indigo-500/30"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Portfolio Preview
              </h1>
              <p className="text-gray-600">Review your portfolio before downloading</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownloadZip}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                Download ZIP
              </button>
              <button
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl">
          {/* Portfolio Header Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 border border-gray-100">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-8 py-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {portfolio.title}
                  </h2>
                  <div className="flex items-center gap-2 text-indigo-100">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">Created on {new Date(portfolio.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 border border-gray-100">
            <div className="px-8 py-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
            </div>
            <div className="px-8 py-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                  <p className="text-base font-semibold text-gray-900">{portfolio.personalInfo.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Title</label>
                  <p className="text-base font-semibold text-indigo-600">{portfolio.personalInfo.title}</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">About</label>
                <p className="text-gray-700 leading-relaxed">{portfolio.personalInfo.about}</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 block">Contact Information</label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Email</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{portfolio.personalInfo.contact.email}</p>
                    </div>
                  </div>

                  {portfolio.personalInfo.contact.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PhoneIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{portfolio.personalInfo.contact.phone}</p>
                      </div>
                    </div>
                  )}

                  {portfolio.personalInfo.contact.location && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">Location</p>
                        <p className="text-sm font-medium text-gray-900">{portfolio.personalInfo.contact.location}</p>
                      </div>
                    </div>
                  )}

                  {portfolio.personalInfo.contact.website && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GlobeAltIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">Website</p>
                        <a href={portfolio.personalInfo.contact.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 truncate block">
                          {portfolio.personalInfo.contact.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {portfolio.personalInfo.contact.linkedin && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaLinkedin className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">LinkedIn</p>
                        <a href={portfolio.personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 truncate block">
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}

                  {portfolio.personalInfo.contact.github && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GlobeAltIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">GitHub</p>
                        <a href={portfolio.personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 truncate block">
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          {portfolio.education && portfolio.education.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <AcademicCapIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Education</h3>
                </div>
              </div>
              <div className="px-8 py-6 space-y-4">
                {portfolio.education.map((edu, index) => (
                  <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-xl border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{edu.degree}</h4>
                    <p className="text-indigo-600 font-semibold mb-2">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.startYear} - {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {portfolio.experience && portfolio.experience.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BriefcaseIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Experience</h3>
                </div>
              </div>
              <div className="px-8 py-6 space-y-4">
                {portfolio.experience.map((exp, index) => (
                  <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{exp.role}</h4>
                    <p className="text-orange-600 font-semibold mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-3">{exp.startDate} - {exp.endDate}</p>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {portfolio.projects && portfolio.projects.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CommandLineIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Projects</h3>
                </div>
              </div>
              <div className="px-8 py-6 space-y-4">
                {portfolio.projects.map((project, index) => (
                  <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-xl border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">{project.description}</p>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        View Project
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {portfolio.skills && portfolio.skills.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Skills</h3>
                </div>
              </div>
              <div className="px-8 py-6">
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 text-sm font-semibold rounded-xl border border-indigo-200 hover:border-indigo-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}