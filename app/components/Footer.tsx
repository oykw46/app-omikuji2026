'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type FooterProps = {
    currentPage?: 'home' | 'shop' | 'collection' | 'settings' // 現在のページ（何かしら判別で使う場合）,
    screen?: 'home' | 'shaking' | 'result' | 'shop' | 'collection' | 'settings'
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
    ({ currentPage, screen }, ref) => {
        // 現在のページは色をかえる
        const getLinkClass = (page: string) => {
            const isActive = currentPage === page
            return `flex flex-1 flex-col items-center transition-all relative ${
                isActive
                    ? 'text-gray-600 hover:text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
            }`
        }

        return (
            <footer
                ref={ref}
                className={`fixed bottom-0 left-0 right-0 z-20 shadow-lg l-footer ${
                screen === 'home' ? 'hidden' : ''
            }`}>
                <div className='flex justify-around w-full bg-gray-50 max-w-full gap-2 max-sm:max-w-3/5 md:max-w-9/12 mx-auto'>
                    {/* HOME */}
                    <Link href='/' className={getLinkClass('home')}>
                        <span className='absolute inset-0 bg-black opacity-30'></span>
                        <span className="text-xs tracking-wider font-bold absolute text-white inset-0 flex items-center justify-center">御神籤</span>
                        <Image
                            src='/assets/nav/nav-home.webp'
                            alt='御神籤'
                            width={150}
                            height={150}
                            className="object-cover h-full w-full"
                        />
                    </Link>

                    {/* SHOP */}
                    <Link href="/shop" className={getLinkClass('shop')}>
                        <span className='absolute inset-0 bg-black opacity-30'></span>
                        <span className="text-xs tracking-wider font-bold absolute text-white inset-0 flex items-center justify-center">交換所</span>
                        <Image
                            src='/assets/nav/nav-shop.webp'
                            alt='交換所'
                            width={150}
                            height={150}
                            className="object-cover h-full w-full"
                        />
                    </Link>

                    {/* COLLECTION */}
                        <Link href="/collection" className={getLinkClass('collection')}>
                            <span className='absolute inset-0 bg-black opacity-30'></span>
                        <span className="text-xs tracking-wider font-bold absolute text-white inset-0 flex items-center justify-center">収集</span>
                        <Image
                            src='/assets/nav/nav-collection.webp'
                            alt='収集'
                            width={150}
                            height={150}
                            className="object-cover h-full w-full"
                        />
                    </Link>

                    {/* SETTINGS */}
                    <Link href="/settings" className={getLinkClass('settings')}>
                        <span className='absolute inset-0 bg-black opacity-30'></span>
                        <span className="text-xs tracking-wider font-bold absolute text-white inset-0 flex items-center justify-center">設定</span>
                        <Image
                            src='/assets/nav/nav-settings.webp'
                            alt='設定'
                            width={150}
                            height={150}
                            className="object-cover h-full w-full"
                        />
                    </Link>
                </div>
            </footer>
        )
    }
)

Footer.displayName = 'Footer'