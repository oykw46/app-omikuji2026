'use client'

import { useEffect, useRef, useState } from 'react'

export const useHomeAnimation = (isActive: boolean) => {
	const [loaded, setLoaded] = useState(false)
	const imgLogoRef = useRef<HTMLImageElement>(null)
	const imgMikoRef = useRef<HTMLImageElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)
	const footerRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (!isActive) return

		// リセット
		setLoaded(false)
		imgMikoRef.current?.classList.remove('animate-shine')
		imgLogoRef.current?.classList.remove('is-show')
		buttonRef.current?.classList.remove('is-show')

		const timer1 = setTimeout(() => {
			imgMikoRef.current?.classList.add('animate-shine')
		}, 700)

		const timer2 = setTimeout(() => {
			bgRef.current?.classList.add('is-flashed')
			imgMikoRef.current?.classList.add('is-hidden')
			setLoaded(true)
		}, 1500)

		const timer3 = setTimeout(() => {
			footerRef.current?.classList.remove('hidden')
			bgRef.current?.classList.remove('is-flashed')
			bgRef.current?.classList.add('is-shined')
			imgLogoRef.current?.classList.add('is-show')
			buttonRef.current?.classList.add('is-show')
			setLoaded(true)
		}, 1600)

		return () => {
			clearTimeout(timer1)
			clearTimeout(timer2)
			clearTimeout(timer3)
		}
	}, [isActive])

	return { loaded, imgLogoRef, imgMikoRef, buttonRef, bgRef, footerRef }
}