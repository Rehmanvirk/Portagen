import { Link } from 'react-router-dom'
import { Sparkles, Layout, Download, ArrowRight, Zap, Lock, Palette } from 'lucide-react'

export const Home = () => {
  return (
    <div className="relative bg-gradient-to-b from-white via-indigo-50/30 to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Build Your Dream Portfolio
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6">
              Create Stunning Portfolios with{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                PortaGen
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Build professional portfolios and resumes in minutes with our easy-to-use builder. 
              Choose from multiple templates, customize your content, and download as HTML or PDF.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group relative w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <Zap className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link 
                to="/templates" 
                className="group w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 flex items-center justify-center gap-2"
              >
                View Templates
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 border-2 border-white"></div>
                </div>
                <span className="font-medium text-gray-700">1,000+ portfolios created</span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mx-auto mt-24 sm:mt-32 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Easy to Use
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our intuitive interface makes it simple to create a professional portfolio. 
                    Just fill in your information and choose a template.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30 mb-6 group-hover:scale-110 transition-transform">
                    <Palette className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Professional Templates
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Choose from our collection of professionally designed templates that are 
                    sure to impress potential employers and clients.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg shadow-orange-500/30 mb-6 group-hover:scale-110 transition-transform">
                    <Download className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Multiple Export Options
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Download your portfolio as a static HTML website or as a PDF resume. 
                    Share your work with the world in the format that works best for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-24 text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
              Trusted by professionals worldwide
            </p>
            <div className="flex items-center justify-center gap-12 opacity-60">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">10+ Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">No Credit Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}