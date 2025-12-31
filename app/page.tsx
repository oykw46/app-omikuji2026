'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useHomeAnimation } from './hooks/useHomeAnimation'
import { type Fortune } from './data/fortune'
import { generateFortune } from './utils/omikujiUtils'
import { useFortuneCount } from './hooks/useFortuneCount'
import { Background } from './components/Background'
import { Logo } from './components/Logo'
import { Button } from './components/Button'
import { FortuneResult } from './components/FortuneResult'
import { useGameData } from './hooks/useGameData'
import { Footer } from './components/Footer'

type Screen = 'home' | 'shaking' | 'result'

export default function Home() {
	const [screen, setScreen] = useState<Screen>('home')
	const [fortune, setFortune] = useState<Fortune | null>(null)
	const { count, incrementCount } = useFortuneCount()
  	const { points, recordFortuneWithPoints } = useGameData() 

	// ローディングアニメーション（HOMEのみ）
	const { loaded, imgLogoRef, imgMikoRef, buttonRef, bgRef, footerRef } = useHomeAnimation(screen === 'home')

	// ポイントが変わるたびにログ
	useEffect(() => {
		console.log('🔥 page.tsx - 現在のポイント:', points)
	}, [points])

	// おみくじを引く処理
	const drawOmikuji = () => {
		setScreen('shaking')
		incrementCount()

		// 2秒後に結果を表示
		setTimeout(() => {
		const randomFortune = generateFortune(count + 1)
		setFortune(randomFortune)
		setScreen('result')

		console.log('🎯 おみくじ結果:', randomFortune.level)
		
		// 統合された関数を1回だけ呼ぶ
		recordFortuneWithPoints(randomFortune.level, 10)
		}, 2000);
	}
	// HOMEに戻る
	const goHome = () => {
		setScreen('home')
		setFortune(null)
	}

	return (
		<main className='min-h-screen max-h-screen overflow-hidden max-w-3xl mx-auto'>
			{/* HOME画面 */}
			{screen === 'home' && (
				<>
				<div className='min-h-screen flex flex-col items-center justify-start p-4 pt-8 pb-20 relative'>
				<Background ref={bgRef} imageUrl="/assets/bg-home.webp" animate={false} />
				<Logo ref={imgLogoRef} />
				<Image
					ref={imgMikoRef}
					src='/assets/miko-home.webp'
					alt='ミコ'
					height={300}
					width={300}
					className='img-miko block h-auto w-auto max-sm:w-11/12 max-sm:max-w-auto'
				/>
				<Button
					ref={buttonRef}
					text='おみくじを引く'
					onClick={drawOmikuji}
					color='red'
					className='btn-home max-sm:-mt-24 -mt-12 relative mx-auto max-sm:w-11/12 max-w-3/5 w-full'
				/>
				</div>
				<Footer currentPage='home' ref={footerRef} screen='home' />
				</>
			)}

			{/* シャカシャカ画面 */}
			{screen === 'shaking' && (
				<>
				<div className='min-h-screen flex items-center justify-center p-4 relative'>
					<Background imageUrl="/assets/shaking/bg-shaking.webp" animate={false} />
					<div className='mx-auto w-full relative animate-bounce'>
						<Image
							src='/assets/shaking/omikujibox.webp'
							alt='おみくじ箱'
							height={300}
							width={300}
							className='block mx-auto h-auto w-auto max-sm:w-2/6 max-sm:max-w-auto -rotate-130'
						/>
					</div>
					{/* <Image
						src='/assets/shaking/omikujibox-shadow.webp'
						alt='おみくじ箱'
						height={300}
						width={300}
						className='block mx-auto h-auto w-auto max-sm:w-2/6 max-sm:max-w-auto absolute'
					/> */}
				</div>
				</>
			)}

			{/* 結果画面 */}
			{screen === 'result' && fortune && (
				<>
				<div className='min-h-screen flex flex-col items-center p-4 relative'>
					<Background imageUrl="/assets/bg-shrine.webp" animate={false} />
					<FortuneResult
						fortune={ fortune }
						count={count}
						onDrawAgain={drawOmikuji}
						onGoHome={goHome}
					/>
				</div>
				<Footer currentPage='home' screen='result' />
				</>
			)}
		</main>
	)
}
