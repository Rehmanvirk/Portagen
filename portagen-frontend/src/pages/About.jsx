import { Target, Eye, Heart, Sparkles, Zap, Users } from 'lucide-react'

export const About = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>About PortaGen</span>
          </div>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Building professional portfolios
            <span className="block mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              made simple
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl mx-auto">
            PortaGen was created with one goal in mind: to help professionals showcase their work 
            in the best possible way. We believe that everyone deserves a beautiful, professional 
            portfolio without needing to be a web developer.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-600 mt-1">Active Users</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900">50k+</div>
              <div className="text-sm text-gray-600 mt-1">Portfolios Created</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900">99%</div>
              <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {/* Mission Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <dt className="text-xl font-bold text-gray-900 mb-4">
                  Our Mission
                </dt>
                <dd className="flex-auto text-base leading-7 text-gray-600">
                  To empower professionals to create stunning portfolios that highlight their skills, 
                  experience, and achievements in a way that impresses potential employers and clients.
                </dd>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <dt className="text-xl font-bold text-gray-900 mb-4">
                  Our Vision
                </dt>
                <dd className="flex-auto text-base leading-7 text-gray-600">
                  To become the go-to platform for professionals across all industries to create, 
                  manage, and share their portfolios with the world.
                </dd>
              </div>
            </div>

            {/* Values Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <dt className="text-xl font-bold text-gray-900 mb-4">
                  Our Values
                </dt>
                <dd className="flex-auto text-base leading-7 text-gray-600">
                  We value simplicity, professionalism, and innovation. We're committed to providing 
                  the best tools and resources to help you succeed in your career.
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-16 max-w-2xl text-center sm:mt-20 lg:mt-24">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to build your portfolio?
            </h3>
            <p className="text-indigo-100 mb-6">
              Join thousands of professionals who trust PortaGen to showcase their work.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105">
              Get Started Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}