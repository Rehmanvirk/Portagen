import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useAuth } from '../contexts/AuthContext'
import { SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    priceMonthly: '$0',
    description: 'Perfect for getting started with your portfolio.',
    features: [
      'Create up to 3 portfolios',
      'Access to free templates',
      'Download as HTML',
      'Download as PDF',
      'Basic support',
    ],
    mostPopular: false,
    icon: RocketLaunchIcon,
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '#',
    priceMonthly: '$9.99',
    description: 'Everything you need to create a professional portfolio.',
    features: [
      'Unlimited portfolios',
      'Access to all templates',
      'Download as HTML',
      'Download as PDF',
      'Priority support',
      'Custom domain',
      'Advanced analytics',
    ],
    mostPopular: true,
    icon: SparklesIcon,
  },
]

export const Pricing = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 py-16 sm:py-24">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
            <SparklesIcon className="w-4 h-4" />
            Pricing Plans
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </span>
          </h1>
          <p className="text-lg sm:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade as you grow. Build stunning portfolios with powerful features designed for professionals.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:max-w-5xl lg:grid-cols-2">
          {tiers.map((tier, index) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.id}
                className={`group relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 xl:p-10 ${
                  tier.mostPopular 
                    ? 'ring-2 ring-indigo-500 shadow-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/30 scale-105' 
                    : 'ring-1 ring-gray-200 hover:shadow-xl hover:ring-indigo-200'
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Most Popular Badge */}
                {tier.mostPopular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg">
                      <SparklesIcon className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between gap-x-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tier.mostPopular 
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                          : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3
                        id={tier.id}
                        className="text-2xl font-bold text-gray-900"
                      >
                        {tier.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base leading-7 text-gray-600 mb-8">
                    {tier.description}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-x-2 mb-8">
                    <span className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {tier.priceMonthly}
                    </span>
                    <span className="text-base font-semibold text-gray-500">/month</span>
                  </div>

                  {/* Features List */}
                  <ul role="list" className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3 items-start">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          tier.mostPopular 
                            ? 'bg-indigo-100' 
                            : 'bg-gray-100'
                        }`}>
                          <CheckIcon
                            className={`h-3.5 w-3.5 ${
                              tier.mostPopular 
                                ? 'text-indigo-600' 
                                : 'text-gray-600'
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-sm leading-6 text-gray-700 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  {tier.name === 'Free' ? (
                    isAuthenticated ? (
                      <Link
                        to="/portfolio/create"
                        aria-describedby={tier.id}
                        className={`block w-full rounded-2xl px-6 py-4 text-center text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          tier.mostPopular
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 focus:ring-indigo-500'
                            : 'bg-white text-indigo-600 ring-2 ring-inset ring-indigo-500 hover:bg-indigo-50 focus:ring-indigo-500'
                        }`}
                      >
                        Get Started Free
                      </Link>
                    ) : (
                      <Link
                        to="/register"
                        aria-describedby={tier.id}
                        className={`block w-full rounded-2xl px-6 py-4 text-center text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          tier.mostPopular
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 focus:ring-indigo-500'
                            : 'bg-white text-indigo-600 ring-2 ring-inset ring-indigo-500 hover:bg-indigo-50 focus:ring-indigo-500'
                        }`}
                      >
                        Get Started Free
                      </Link>
                    )
                  ) : (
                    <button
                      aria-describedby={tier.id}
                      className={`block w-full rounded-2xl px-6 py-4 text-center text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        tier.mostPopular
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 focus:ring-indigo-500 disabled:hover:scale-100 disabled:shadow-lg'
                          : 'bg-white text-indigo-600 ring-2 ring-inset ring-indigo-500 hover:bg-indigo-50 focus:ring-indigo-500'
                      }`}
                      disabled={user?.isPremium}
                    >
                      {user?.isPremium ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckIcon className="w-5 h-5" />
                          Current Plan
                        </span>
                      ) : (
                        'Upgrade to Premium'
                      )}
                    </button>
                  )}
                </div>

                {/* Hover Effect Gradient Border */}
                {tier.mostPopular && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">
              Need a custom solution?
            </h3>
            <p className="text-base text-gray-600">
              Contact us for enterprise plans and volume discounts tailored to your organization.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold transition-all duration-200 hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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