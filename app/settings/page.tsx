// Shopページ
'use client'

import { useEffect, useState } from 'react'
import { useGameData } from '../hooks/useGameData'
import { Footer } from '../components/Footer'
import { fortuneLevels } from '../data/fortune'

export default function SettingsPage() {
    const {
        username,
        totalDraws,
        fortuneStats,
        totalPointsEarned,
        totalPointsSpent,
        achievements,
        bgmEnabled,
        setUsername,
        // toggleBGM,
        resetData
    } = useGameData()

    const [tempUsername, setTempUsername] = useState(username)
    const [showResetConfirm, setShowResetConfirm] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    // usernameが変わったら、tempUsernameも更新
    useEffect(() => {
        setTempUsername(username)
    }, [username])

    // ユーザー名を保存
    const handleSaveUsername = () => {
        setUsername(tempUsername)
        setShowSuccessModal(true)
        
        // 2秒後に自動で閉じる
        setTimeout(() => {
        setShowSuccessModal(false)
        }, 2000)
    }

    // リセット確認
    const handleResetClick = () => {
        setShowResetConfirm(true)
    }

    // リセット実行
    const handleResetConfirm = () => {
        resetData()
        setTempUsername('あなた')
        setShowResetConfirm(false)
        alert('データをリセットしました。')
    }

    // 統計データの計算
    const getPercentage = (count: number) => {
        if (totalDraws === 0) return 0
        return Math.round((count / totalDraws) * 100)
    }

    // 実績の達成率
    const unlockedCount = achievements.filter(a => a.unlocked).length
    const achievementRate = Math.round((unlockedCount / achievements.length) * 100)

    return (
        <main className='min-h-screen flex flex-col items-center p-4 relative overflow-hidden pb-32 bg-gray-100'>
            <div className='relative w-full space-y-6'>
                {/* タイトル */}
                <div className='text-center my-8'>
                    <h1 className='text-2xl font-bold mb-2'>設定</h1>
                    <p className='text-gray-700'>ゲームの設定や実績を確認できます。</p>
                </div>

                {/* ユーザー名設定 */}
                <div className='bg-white rounded-lg shadow-lg p-6'>
                    <h2 className='text-lg font-bold mb-4'>プレイヤー名</h2>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            value={tempUsername}
                            onChange={(e) => setTempUsername(e.target.value)}
                            maxLength={10}
                            className='flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none'
                            placeholder='あなたの名前を入力'
                        />
                        <button
                            onClick={handleSaveUsername}
                            className='bg-blue-500 hover:bg-gray-700 text-white font-bold px-6 py-2 rounded-lg transition-all'
                        >
                            保存
                        </button>
                    </div>
                    <p className='text-gray-500 text-sm mt-2'>キャラクターのセリフに反映されます。</p>
                </div>

                {/* 統計情報 */}
                <div className='bg-white rounded-lg shadow-lg p-6'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>統計情報</h2>

                    {/* 基本設計 */}
                    <div className='grid grid-cols-2 md-grid-cols-2 gap-4 mb-6'>
                        <div className='bg-blue-50 rounded-lg p-4 text-center'>
                            <p className='text-gray-600 text-sm mb-3'>挑戦回数</p>
                            <p className='text-3xl font-bold text-blue-500'>{totalDraws} <span className='text-base'>回</span></p>
                        </div>
                        <div className='bg-blue-50 rounded-lg p-4 text-center'>
                            <p className='text-gray-600 text-sm mb-3'>総獲得ポイント</p>
                            <p className='text-3xl font-bold text-blue-500'>{totalPointsEarned} <span className='text-base'>pt</span></p>
                        </div>
                        {/* <div className='bg-blue-50 rounded-lg p-4 text-center'>
                            <p className='text-gray-600 text-sm mb-3'>使用ポイント</p>
                            <p className='text-3xl font-bold text-blue-500'>{totalPointsSpent}</p>
                        </div> */}
                    </div>

                    {/* 運勢の内訳 */}
                    {totalDraws > 0 && (
                        <div>
                            {/* <h3 className='font-bold text-lg mb-3'>運勢の内訳</h3> */}
                            <div className='space-y-3'>
                                {fortuneLevels.map((level) => {
                                    const count = fortuneStats[level] || 0
                                    const percentage = getPercentage(count)

                                    return (
                                        <div key={level} className='flex items-center gap-4'>
                                            <span className='font-semibold text-base w-16 text-center text-gray-400'>{level}</span>
                                            <div className='flex-1 bg-gray-200 rounded-full h-6 relative'>
                                                <div
                                                    className='bg-gradient-to-r from-blue-300 to-blue-300 h-full rounded-full transition-all duration-500'
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                                <span className='absolute inset-0 flex items-center justify-center font-bold text-white'>
                                                    {count}回 ({percentage}%)
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    {totalDraws === 0 && (
                        <p className='text-gray-500 text-center py-4'>まだ、おみくじを引いていません。</p>
                    )}
                </div>

                {/* 実績 */}
                <div className='bg-white rounded-lg shadow-lg p-6'>
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>
                        実績<span className='text-base text-blue-500'>（達成率 {achievementRate}%）</span>
                    </h2>
                    <div className='space-y-3'>
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                                achievement.unlocked
                                    ? 'bg-yellow-50 border-yellow-400'
                                    : 'bg-gray-50 border-gray-300'
                                }`}
                            >
                                <span className='text-3xl'>
                                    {achievement.unlocked ? '🏆' : '🔒'}
                                </span>
                                <div className='flex-1'>
                                    <h3 className={`font-bold ${achievement.unlocked ? 'text-yellow-700' :
                                    'text-gray-500'}`}>
                                        {achievement.name}
                                    </h3>
                                    <p className='text-sm text-gray-600 mt-1'>{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* その他の設定 */}
                <div className='bg-white rounded-lg shadow-lg p-6'>
                    {/* BGM設定 */}
                    {/* <div className="flex items-center justify-between mb-6 pb-6 border-b">
                        <div>
                            <h3 className="font-bold text-lg">BGM</h3>
                            <p className="text-gray-600 text-sm">背景音楽のON/OFF</p>
                        </div>
                        <button
                            onClick={toggleBGM}
                            className={`w-16 h-8 rounded-full transition-all ${
                                bgmEnabled ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                        >
                            <div
                                className={`w-6 h-6 bg-white rounded-full shadow transition-all ${
                                bgmEnabled ? 'translate-x-9' : 'translate-x-1'
                                }`}
                            ></div>
                        </button>
                    </div> */}

                    {/* データリセット */}
                    <h2 className='text-lg font-bold text-gray-800 mb-4'>データリセット</h2>
                    <p className="text-gray-600 text-sm mb-4">
                        挑戦回数、ポイント、アイテム、実績を全てリセットします
                    </p>
                    <button
                        onClick={handleResetClick}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-all mx-auto max-w-11/12 block"
                    >
                        全てのデータをリセット
                    </button>

                    {/* リセット確認モーダル */}
                    {showResetConfirm && (
                        <div className='fixed inset-0 flex items-center justify-center z-50'>
                            <div className='absolute inset-0 bg-black opacity-80 -z[1]'></div>
                            <div className='bg-white rounded-lg p-6 max-w-md mx-4 z-[1]'>
                                <h3 className='text-xl font-bold text-red-600 mb-4'>警告</h3>
                                <p className='text-gray-700 mb-6'>
                                    本当に全てのデータをリセットしますか？<br />
                                    この操作は取り消せません。
                                </p>
                                <div className='flex gap-3'>
                                    <button
                                        onClick={() => setShowResetConfirm(false)}
                                        className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-all'
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        onClick={handleResetConfirm}
                                        className='flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-all'
                                    >
                                        リセットする
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* プレイヤー名の変更モーダル */}
                    {showSuccessModal && (
                        <div className='fixed inset-0 flex items-center justify-center z-50'>
                            <div className='absolute inset-0 bg-black opacity-80 -z[1]'></div>
                            <div className='bg-white rounded-lg py-12 px-6 max-w-md mx-4 text-center z-[1]'>
                                {/* <div className='text-6xl mb-4'>✨</div> */}
                                <h3 className='text-xl font-bold mb-4'>保存完了！</h3>
                                <p className='text-gray-700'>
                                    プレイヤー名を<br />
                                    「<span className='font-bold text-red-600'>{tempUsername}</span>」に変更しました。
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer currentPage='settings' />
        </main>
    )
}
