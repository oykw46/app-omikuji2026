'use client';

// 各種ボタン（共通設定）
import { forwardRef } from 'react';

type ButtonProps = {
	text: string,
	onClick: () => void,
	color?: 'red' | 'purple' | 'gray',
	className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ text, onClick, color = 'red', className = '' }, ref) => {
		// 色によってクラスを切り分ける
		const colorClasses = {
			red: 'bg-red-500 hover:bg-red-600',
			purple: 'bg-purple-500 hover:bg-purple-600',
			gray: 'bg-gray-500 hover:bg-gray-600'
		}
		return (
			<button
				ref={ref}
				onClick={onClick}
				className={`
				${colorClasses[color]}
				cursor-pointer
				text-white
				font-bold
				py-4 px-8
				rounded-full
				transition-all
				transform
				hover:scale-105
				${className}
				`}
			>
				{text}
			</button>
		);
	}
);
