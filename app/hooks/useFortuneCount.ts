// おみくじの挑戦回数をカウント
'use client'
import { useState, useEffect } from 'react'

export const useFortuneCount = () => {
	const [count, setCount] = useState(0)

	// 初回読み込み時にlocalStorageから取得
	useEffect(() => {
		const savedCount = localStorage.getItem('fortuneCount')
		if (savedCount) {
			setCount(parseInt(savedCount, 10))
		}
	}, [])

	// カウントを増やす関数
	const incrementCount = () => {
		const newCount = count + 1
		setCount(newCount)
		localStorage.setItem('fortuneCount', newCount.toString())
	}

	// カウントをリセットする関数
	const resetCount = () => {
		setCount(0)
		localStorage.removeItem('fortuneCount')
	}

	return { count, incrementCount, resetCount }
}