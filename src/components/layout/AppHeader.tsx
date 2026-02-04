'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import HeaderButton from '../ui/HeaderButton'
import Link from 'next/link'
import { HOME_ROUTE, LEARNING_PACKAGES_ROUTE, LEARNING_TOPICS_ROUTE, SIGNIN_ROUTE } from '@/constants/routes'
import UserSubcription from '../ui/UserSubcription'
import useUserStore from '@/zustand/useUserStore'
import { usePathname } from 'next/navigation'
import UserProfileHeader from '../ui/UserProfileHeader'

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
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">S</span>
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
          <HeaderButton href={LEARNING_PACKAGES_ROUTE} className="text-sm py-2 px-4 font-medium">Nâng cấp gói</HeaderButton>
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

      {/* MOBILE MENU - Cũng áp dụng showLoading tương tự */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gradient-to-b from-cyan-50 to-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-cyan-200">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-cyan-800">Skillsora</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-lg p-2.5 text-cyan-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-cyan-200">
              <div className="space-y-1 py-6">
                <HeaderButton href={HOME_ROUTE} onClick={() => setMobileMenuOpen(false)} className="block w-full text-left">Trang Chủ</HeaderButton>
                <HeaderButton isMultiPath href={LEARNING_TOPICS_ROUTE} onClick={() => setMobileMenuOpen(false)} className="block w-full text-left">Học Tập</HeaderButton>
                <HeaderButton isMultiPath href={"/blog"} onClick={() => setMobileMenuOpen(false)} className="block w-full text-left">Blog</HeaderButton>
                <HeaderButton href={LEARNING_PACKAGES_ROUTE} onClick={() => setMobileMenuOpen(false)} className="block w-full text-left">Nâng cấp gói</HeaderButton>
              </div>

              <div className="py-6">
                {showLoading ? (
                  <div className="h-12 w-full bg-cyan-100/50 animate-pulse rounded-xl"></div>
                ) : authenticated ? (
                  <div className='flex items-center justify-center flex-col gap-6'>
                    <div className="flex gap-3 w-full">
                      <HeaderButton
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold bg-emerald-500 text-white text-center flex-1"
                      >
                        Hồ sơ
                      </HeaderButton>
                      <button
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                        className="flex-1 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Đăng xuất
                      </button>
                    </div>
                    <UserSubcription />
                  </div>
                ) : (
                  <HeaderButton
                    onClick={() => setMobileMenuOpen(false)}
                    href={SIGNIN_ROUTE}
                    className="block rounded-xl px-4 py-3 text-base font-semibold bg-cyan-500 text-white text-center shadow-md w-full"
                  >
                    Đăng nhập
                  </HeaderButton>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default AppHeader;
