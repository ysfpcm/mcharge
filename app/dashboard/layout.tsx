// dashboard/layout.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  LayoutDashboard,
  CreditCard,
  FileText,
  Users,
  Settings,
  LogOut,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import PaymentModal from '@/components/PaymentModal'
import ProfileButton from '@/components/ProfileButton';

// Add these type definitions at the top of your file
type SubItem = {
  name: string;
  link?: string;
  action?: () => void;
};

type NavItem = {
  name: string;
  icon: React.ComponentType<any>;
  link?: string;
  subitems: SubItem[];
  action?: () => void;
};

// Add this import at the top of the file
import BouncingButton from '@/components/BouncingButton';

import { ReactNode } from 'react';

declare module '@/components/BouncingButton' {
  export interface BouncingButtonProps {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
  }

  export const BouncingButton: React.FC<BouncingButtonProps>;
}

// Back in layout.tsx, you can now use BouncingButton as imported

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string>('Virtual Terminal')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [showLogoff, setShowLogoff] = useState(false);

  const handleLogoff = () => {
    // Implement your logoff logic here
    console.log('Logging off...');
    // For example: router.push('/login');
  };

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard', subitems: [] },
    {
      name: 'Virtual Terminal',
      icon: CreditCard,
      subitems: [
        { name: 'Process Payment', action: () => setIsPaymentModalOpen(true) },
        { name: 'Transaction Reports', link: '/virtual-terminal/reports' },
        { name: 'Manage Batch', link: '/virtual-terminal/batch' },
      ],
    },
    {
      name: 'Invoices',
      icon: FileText,
      link: '/invoices',
      subitems: [
        { name: 'All Invoices', link: '/invoices' },
        { name: 'Create Invoice', link: '/invoices/create' },
      ],
    },
    {
      name: 'Customers',
      icon: Users,
      link: '/customers',
      subitems: [
        { name: 'All Customers', link: '/customers' },
        { name: 'Add New Customer', link: '/customers/new' },
        { name: 'Manage Customer Invoices', link: '/customers/invoices' },
        { name: 'Customer Messages', link: '/customers/messages' },
      ],
    },
    { name: 'Settings', icon: Settings, link: '/settings', subitems: [] },
  ]

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? '' : name))
  }

  const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  }

  const getTitleFromPathname = () => {
    if (isPaymentModalOpen) {
      return 'Process Payment'
    }
    for (const item of navItems) {
      if (item.link && pathname === item.link) {
        return item.name
      }
      for (const subitem of item.subitems) {
        if (subitem.link && pathname === subitem.link) {
          return subitem.name
        }
      }
    }
    return 'Dashboard' // Default title
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 text-black flex-shrink-0 border-r border-gray-300">
        {/* Sidebar Header */}
        <div className="p-3">
          <BouncingButton className="text-3xl font-bold text-blue-600">
            MasterCharge
          </BouncingButton>
        </div>
        <nav className="mt-2">
          {navItems.map((item) => {
            const isActive = item.link ? pathname.startsWith(item.link) : false
            const isOpen = openMenu === item.name
            const hasSubitems = item.subitems.length > 0
            return (
              <div key={item.name}>
                <BouncingButton
                  className={`w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium focus:outline-none ${
                    isActive ? 'bg-blue-100 text-black' : 'text-gray-900 hover:bg-blue-50'
                  }`}
                  onClick={() => {
                    if (hasSubitems) {
                      toggleMenu(item.name)
                    } else if (item.action) {
                      item.action()
                      setOpenMenu('')
                    } else if (item.link) {
                      setOpenMenu('')
                      window.location.href = item.link
                    }
                  }}
                >
                  <span className="flex items-center">
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </span>
                  {hasSubitems && (
                    <ChevronDown
                      className={`h-6 w-6 transition-transform ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  )}
                </BouncingButton>
                <AnimatePresence>
                  {isOpen && hasSubitems && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={springTransition}
                    >
                      {item.subitems.map((subitem) => {
                        const isSubActive = subitem.link ? pathname === subitem.link : false
                        return (
                          <div key={subitem.name}>
                            {subitem.action ? (
                              <BouncingButton
                                className={`w-full flex items-center pl-16 pr-6 py-3 text-left text-base font-medium focus:outline-none ${
                                  isSubActive
                                    ? 'bg-blue-100 text-black'
                                    : 'text-gray-900 hover:bg-blue-50'
                                }`}
                                onClick={() => {
                                  subitem.action?.()
                                  setOpenMenu('')
                                }}
                              >
                                {subitem.name}
                              </BouncingButton>
                            ) : (
                              <Link href={subitem.link || '#'} passHref>
                                <BouncingButton
                                  className={`w-full flex items-center pl-16 pr-6 py-3 text-left text-base font-medium focus:outline-none ${
                                    isSubActive
                                      ? 'bg-blue-100 text-black'
                                      : 'text-gray-900 hover:bg-blue-50'
                                  }`}
                                  onClick={() => setOpenMenu('')}
                                >
                                  {subitem.name}
                                </BouncingButton>
                              </Link>
                            )}
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-300 text-black shadow-sm border-b border-gray-300">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Left side: Page Title */}
            <h2 className="text-xl font-semibold text-black">{getTitleFromPathname()}</h2>

            {/* Right side: ProfileButton */}
            <ProfileButton onLogoff={handleLogoff} />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  )
}
