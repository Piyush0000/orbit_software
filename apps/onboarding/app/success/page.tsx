"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Sparkles, Mail, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const storeId = searchParams.get('storeId')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-6">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-gradient">ORBIT360!</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your store registration has been submitted successfully.
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Mail className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Check Your Email</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Our admin team will review your application and activate your store within 24 hours.
            You'll receive an email with:
          </p>

          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Your merchant dashboard URL</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Your website URL (subdomain.orbit360.shop)</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Login credentials and next steps</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Onboarding guide to get started</span>
            </div>
          </div>

          {storeId && (
            <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Your Store ID</p>
              <code className="text-purple-400 font-mono">{storeId}</code>
            </div>
          )}
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-bold">What Happens Next?</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Admin Review</h4>
              <p className="text-sm text-gray-400">Our team reviews your application</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Store Activation</h4>
              <p className="text-sm text-gray-400">We set up your store and website</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">You're Live!</h4>
              <p className="text-sm text-gray-400">Start adding products and selling</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="px-8 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all flex items-center space-x-2"
          >
            <span>Back to Home</span>
          </Link>
          <a
            href="mailto:support@orbit360.com"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center space-x-2"
          >
            <span>Contact Support</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Confetti effect */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                opacity: 0
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity
              }}
              className="absolute w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />}>
      <SuccessContent />
    </Suspense>
  )
}
