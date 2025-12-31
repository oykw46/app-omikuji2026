// 巫女さんのキャラクターセリフ
import { ReactNode } from 'react'
import { useGameData } from '../hooks/useGameData'

export const getMikoMessage = (level: string, count: number): ReactNode => {
  const isSpecial = count % 10 === 0
  const { username } = useGameData()

  // 10n回目の特別メッセージ
  if (isSpecial) {
    return (
      <>
        {count}回も遊んでくれてありがとう！<br />
        {username}にとって<span className="text-red-600 font-bold">スペシャルな一年</span>に<br/>なりますように！
      </>
    )
  }

  // 大吉の時
  if (level === '大吉') {
    return (
      <>
        やったね！今年の運勢は<span className="text-red-600 font-bold">{level}</span>だよ！<br />
        {username}も一緒に読んでみよう！
      </>
    )
  }

  // 凶の時
  if (level === '凶') {
    return (
      <>
        今年の運勢は...... <span className="text-red-600 font-bold">{level}</span>...だね。<br />
        大丈夫！私は{username}の<br />幸せな一年を祈ってるよ！
      </>
    )
  }

  // その他の時
  return (
    <>
      今年の運勢は<span className="text-red-600 font-bold">{level}</span>だね！<br />
      {username}も一緒に読んでみようか。
    </>
  )
}