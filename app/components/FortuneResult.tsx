// おみくじの結果
import Image from 'next/image'
import { Fortune } from '../data/fortune'
import { getMikoMessage } from '../utils/mikoMessages'
import { Button } from './Button'

type FortuneResultProps = {
	fortune: Fortune,
	count: number, // 実行回数を受け取る
	onDrawAgain: () => void,
	onGoHome: () => void
}

export const FortuneResult = ({
	fortune,
	count,
	onDrawAgain,
	onGoHome
}: FortuneResultProps) => {
	// 巫女さんの表情を運勢によって切り分ける
	const getMikoFace = () => {
		if (fortune.level === '大吉') {
			return '/assets/miko-result-happy.webp'
		} else if (fortune.level === '凶') {
			return 'assets/miko-result-unhappy.webp'
		} else {
			return '/assets/miko-result-normal.webp'
		}
	}
	// おみくじ項目の配列
	const fortuneItems = [
		{ label: '願望', value: fortune.messages.願望 },
		{ label: '待ち人', value: fortune.messages.待ち人 },
		{ label: '旅立ち', value: fortune.messages.旅立ち },
		{ label: '商い', value: fortune.messages.商い },
		{ label: '学問', value: fortune.messages.学問 },
		{ label: '仕事', value: fortune.messages.仕事 },
		{ label: '恋愛', value: fortune.messages.恋愛 },
		{ label: '縁談', value: fortune.messages.縁談 },
		{ label: '争い事', value: fortune.messages.争い事 },
		{ label: '金運', value: fortune.messages.金運 },
		{ label: '転居', value: fortune.messages.転居 },
		{ label: '縁起物', value: fortune.messages.縁起物 },
	]
	// 巫女さんのセリフを取得
	const mikoMessage = getMikoMessage(fortune.level, count)
	const isSpecial = count % 10 === 0

	return (
		<>
			<div className='text-yellow-900 overflow-hidden shadow-lg rounded-r-full py-1 pl-4 pr-5 absolute left-0 old-standard-tt-bold'>
				<div className='bg-white absolute inset-0 opacity-80 -z-[1]'></div>
				<span className='text-base'>{count}</span> <span className='text-sm'>回目</span>
			</div>
			<div className='relative text-center w-full'>
				<Image
					src={getMikoFace()}
					alt='おみくじ結果を読んでくれる巫女さん（ミコ）'
					height={300}
					width={300}
					className='mt-6 h-auto max-sm:w-8/11 w-auto mx-auto'
				/>
				{/* 巫女さんのセリフ */}
				<div className='miko-message mx-auto mb-4 absolute top-40 max-sm:w-full'>
					<p className='text-gray-800 whitespace-pre-line text-left bg-white rounded-lg shadow-lg p-4 relative text-sm'>
						{mikoMessage}
					</p>
					{/* 吹き出しの三角 */}
					<div className='absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white'></div>
				</div>
			</div>

			<div className='absolute mt-70 max-sm:w-full'>
				<div className='relative shadow-lg '>
					<div className='absolute inset-0 bg-white opacity-80'></div>
					<h1 className='text-3xl text-center font-bold py-6 text-red-600 old-standard-tt-bold relative'>{fortune.level}</h1>
					<div className='space-y-6 text-left pb-8 py-8 overflow-y-scroll max-w-full relative jp-vertical scrollbar-none max-sm:max-h-76 max-sm:h-100'>
						{fortuneItems.map((item, index) => (
							<FortuneLetter 
								key={index}
								label={item.label}
								value={item.value}
							/>
						))}
					</div>
				</div>
				<div className='flex gap-4 justify-center mt-4 relative'>
					<Button
						text='もう一度引く'
						onClick={onDrawAgain}
						color='red'
						className='shadow-2xl text-base'
					/>
				</div>
			</div>
		</>
	)
}

// 個別項目コンポーネント（さらに細分化）
type FortuneLetterProps = {
	label: string,
	value: string
}

const FortuneLetter = ({ label, value }: FortuneLetterProps) => {
	return (
		<p className='flex gap-4 text-sm old-standard-tt-bold'>
			<span className='font-semibold text-gray-700 h-14 whitespace-nowrap'>{ label }</span>
			<span className='text-gray-900 font-normal'>{ value }</span>
		</p>
	)
}
