//dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CreditCard, DollarSign, Users, ArrowUpRight } from 'lucide-react'

const data = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
]

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="space-y-6 pt-16"> {/* Added pt-16 for top padding */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-navy-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">$45,231.89</div>
          <p className="text-xs text-green-500">+20.1% from last month</p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Transactions</h3>
            <CreditCard className="h-4 w-4 text-navy-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">+2350</div>
          <p className="text-xs text-green-500">+180.1% from last month</p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">New Customers</h3>
            <Users className="h-4 w-4 text-navy-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">+12,234</div>
          <p className="text-xs text-green-500">+19% from last month</p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Active Now</h3>
            <ArrowUpRight className="h-4 w-4 text-navy-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">+573</div>
          <p className="text-xs text-green-500">+201 since last hour</p>
        </motion.div>
      </div>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
        <div className="h-[300px]">
          {isClient && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#000080" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>
      <div className="flex justify-end">
        <motion.button
          className="bg-navy-600 text-white px-4 py-2 rounded-md hover:bg-navy-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Detailed Reports
        </motion.button>
      </div>
    </div>
  )
}