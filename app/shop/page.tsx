// Shopページ
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useGameData } from '../hooks/useGameData'
import { shopItems } from '../data/items'
import { Footer } from '../components/Footer'
import { getShopkeeperMessage, type ShopkeeperState } from '../utils/shopkeeperMessages'

export default function ShopPage() {
    const { points, buyItem, hasItem, username } = useGameData()
    const [shopkeeperState, setShopkeeperState] = useState<ShopkeeperState>('normal')
    const [lastPurchasedItem, setLastPurchasedItem] = useState<string>('')
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [purchasedItem, setPurchasedItem] = useState<{ name: string; imageUrl: string } | null>(null)

    const handleBuy = (itemId: string, itemName: string, price: number, imageUrl: string) => {
        const result = buyItem(itemId, price, shopItems.length)

        if (result.success) {
            // 購入成功
            setLastPurchasedItem(itemName)
            setShopkeeperState('thanks')
            setPurchasedItem({ name: itemName, imageUrl: imageUrl })
            setShowSuccessModal(true)
        } else {
            // ポイント不足または購入済み
            if (result.message === 'ポイントが足りません') {
                setShopkeeperState('sad')
            }
        }

        // 3秒後に通常状態に戻す
        setTimeout(() => {
            setShowSuccessModal(false)
            setShopkeeperState('normal')
            setLastPurchasedItem('')
        }, 3000)
    }

    // 店員さんの状態に応じたメッセージと画像を取得
    const shopkeeper = getShopkeeperMessage(shopkeeperState, lastPurchasedItem, username)

    return (
        <main className='min-h-screen max-h-screen relative overflow-hidden max-w-3xl mx-auto'>
            <div className='relative max-w-4xl w-full'>
                {/* 所持ポイント */}
			    <div className='text-yellow-900 overflow-hidden shadow-lg rounded-r-full py-1 pl-4 pr-5 absolute left-0 absolute top-6 z-[1] flex items-center gap-1 font-bold'>
                    <div className='bg-white absolute inset-0 opacity-90 -z-[1]'></div>
                    <Image
                        src='/assets/coin.webp'
                        alt='コイン'
                        height={16}
                        width={16}
                        className='h-auto max-w-5 w-auto'
                    />
                    <span className='text-base'>{points}</span><span className="text-sm">pt</span>
                </div>

                {/* 店員さん */}
                <div className='relative header-img border-b border-gray-100'>
                    <Image
                        src={shopkeeper.image}
                        alt='ショップの巫女さん（ミク）'
                        height={305}
                        width={390}
                        className='h-full w-full transition-all duration-500 object-cover'
                        key={shopkeeper.image} // 画像が変わるときにアニメーション
                    />

                    {/* 店員さんのセリフ */}
                    <div className='miko-message rounded-lg shadow-lg p-4 mt-4 max-w-md mx-auto absolute bottom-3 left-14 right-14'>
                        <div className='absolute inset-0 bg-white opacity-80 rounded-2xl'></div>
                        <p className='text-gray-800 relative text-sm'>
                            {shopkeeper.message}
                        </p>
                        {/* 吹き出しの三角 */}
                        <div className='absolute -top-2 left-2/3 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white opacity-90'></div>
                    </div>
                </div>

                <div className='overflow-y-scroll bg-gray-100 shop-item-list pb-12'>
                    {/* 商品リスト */}
                    <div className='flex flex-col pt-4'>
                        {shopItems.map((item) => {
                            const owned = hasItem(item.id)
                            const canBuy = points >= item.price && !owned

                            return (
                                <div
                                    key={item.id}
                                    className='bg-white rounded-xl p-6 mx-4 mb-4 relative shadow-lg'
                                >
                                    {/* 購入済みバッジ */}
                                    {owned && (
                                        <div className='absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold'>購入済み</div>
                                    )}
                                    <div className='flex items-center justify-between'>
                                        <div className='shop-item w-1/5'>
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                height={200}
                                                width={200}
                                                className='h-auto w-auto'
                                            />
                                        </div>

                                        <div className='w-3/4'>
                                            <h3 className='text-lg font-bold mb-2 text-orange-900'>{item.name}</h3>
                                            <p className='text-gray-600 text-sm whitespace-normal'>{item.description}</p>
                                            <div className={`flex items-center justify-between mt-4
                                                ${ owned ? 'hidden' : canBuy ? '' : '' }`}
                                            >
                                                <div className='w-1/5 flex gap-2 items-center'>
                                                    <Image
                                                        src='/assets/coin.webp'
                                                        alt='コイン'
                                                        height={16}
                                                        width={16}
                                                        className='h-auto max-w-7 w-auto'
                                                    />
                                                    <span className='text-2xl font-bold text-yellow-600'>{item.price}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleBuy(item.id, item.name, item.price, item.imageUrl)}
                                                    disabled={owned}
                                                    className={`py-2 rounded-lg font-bold transition-all w-3/5 ${
                                                        owned
                                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed hidden'
                                                            : canBuy
                                                            ? 'bg-red-500 hover:bg-red-600 text-white transform hover:scale-105'
                                                            : 'bg-red-500 hover:bg-red-600 text-white transform hover:scale-105'
                                                    }`}
                                                >
                                                        {owned ? '購入済み': '購入する'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* アイテム獲得モーダル */}
            {showSuccessModal && purchasedItem && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className='absolute inset-0 bg-black opacity-80 -z[1]'></div>
                    <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center relative">
                        {/* <div className="absolute top-2 right-2 text-3xl animate-spin">✨</div> */}
                        {/* <div className="absolute bottom-2 left-2 text-3xl animate-spin">✨</div> */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-30 animate-ping"></div>
                        <Image
                            src={purchasedItem.imageUrl}
                            alt={purchasedItem.name}
                            width={150}
                            height={150}
                            className="mx-auto relative z-10"
                        />
                        <p className="text-gray-700 mt-2">
                            <span className='font-bold text-red-600'>{purchasedItem.name}</span>を獲得しました！
                        </p>
                    </div>
                </div>
            )}

            <Footer currentPage='shop' />
        </main>
    )
}
