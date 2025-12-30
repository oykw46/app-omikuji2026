// ロゴ画像（おみくじ2026）
import { forwardRef } from 'react'
import Image from 'next/image'

export const Logo = forwardRef<HTMLImageElement, {}>((props, ref) => {
	return (
		<h1 ref={ref} className='img-logo text-center'>
			<Image
				src="/assets/logo.webp"
				alt="おみくじ2026"
				height={112}
				width={208}
				className="mx-auto h-auto max-sm:w-2/5"
			/>
		</h1>
	)
})