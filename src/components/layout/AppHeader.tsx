'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import HeaderButton from '../ui/HeaderButton'
import Link from 'next/link'
import { HOME_ROUTE, LEARNING_TOPICS_ROUTE, SIGNIN_ROUTE } from '@/constants/routes'
import useUserStore from '@/zustand/useUserStore'
import { usePathname } from 'next/navigation'
import UserProfileHeader from '../ui/UserProfileHeader'
import Image from 'next/image'

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  const { authenticated, loadingAuth, logout } = useUserStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const hiddenRoutes = ["/signin", "/signup"]

  if (hiddenRoutes.includes(pathname)) {
    return null
  }

  const showLoading = !isMounted || (loadingAuth && !authenticated);

  return (
    <header className="bg-gradient-to-r from-cyan-50 to-white border-b border-cyan-100 shadow-sm">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo.png"
                alt="Skillsora logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent hidden sm:block">
              Skillsora
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-cyan-700 hover:bg-cyan-100 transition-colors"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-2">
          <HeaderButton isMultiPath href={LEARNING_TOPICS_ROUTE} className="text-sm py-2 px-4 font-medium">Học Tập</HeaderButton>
          <HeaderButton isMultiPath href={"/blog"} className="text-sm py-2 px-4 font-medium">Blog</HeaderButton>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {showLoading ? (
            <div className="h-10 w-24 bg-cyan-100/50 animate-pulse rounded-lg"></div>
          ) : authenticated ? (
            <>
              {/* <LearningProgress /> */}
              <div className="h-6 w-px bg-cyan-200"></div>
              <UserProfileHeader />
            </>
          ) : (
            <HeaderButton
              href={SIGNIN_ROUTE}
              className="text-sm font-semibold py-2 px-4 bg-cyan-500 text-white hover:bg-cyan-600 shadow-md transition-all"
            >
              Đăng nhập &rarr;
            </HeaderButton>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gradient-to-b from-cyan-50 to-white sm:max-w-sm sm:ring-1 sm:ring-cyan-200">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-cyan-50 to-white border-b border-cyan-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo.png"
                    alt="Skillsora"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-bold text-cyan-800 text-sm">Skillsora</p>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full p-2 text-gray-600 hover:bg-cyan-100 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Navigation Items */}
            <div className="space-y-2 mb-8">
              <HeaderButton
                href={HOME_ROUTE}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-cyan-100 rounded-lg transition-colors"
              >
                Trang Chủ
              </HeaderButton>
              <HeaderButton
                isMultiPath
                href={LEARNING_TOPICS_ROUTE}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-cyan-100 rounded-lg transition-colors"
              >
                Học Tập
              </HeaderButton>
              <HeaderButton
                isMultiPath
                href={"/blog"}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-cyan-100 rounded-lg transition-colors"
              >
                Blog
              </HeaderButton>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent mb-8" />

            {/* Auth Section */}
            {showLoading ? (
              <div className="space-y-2">
                <div className="h-12 w-full bg-cyan-100/50 animate-pulse rounded-lg"></div>
              </div>
            ) : authenticated ? (
              <div className="space-y-3">
                <HeaderButton
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-sm font-semibold bg-cyan-500 text-white text-center rounded-lg hover:bg-cyan-600 shadow-md transition-all active:scale-95"
                >
                  Xem Hồ sơ
                </HeaderButton>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-3 text-sm font-semibold text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors border border-cyan-200"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <HeaderButton
                onClick={() => setMobileMenuOpen(false)}
                href={SIGNIN_ROUTE}
                className="block w-full px-4 py-3 text-base font-semibold bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-center rounded-lg hover:shadow-lg shadow-md transition-all active:scale-95"
              >
                Đăng nhập →
              </HeaderButton>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default AppHeader;
