'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PaymentModal from '@/components/PaymentModal'

export default function VirtualTerminal() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Virtual Terminal</h1>
      <motion.button
        onClick={() => setIsPaymentModalOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Process Payment
      </motion.button>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      {/* Other content */}
    </div>
  )
}
