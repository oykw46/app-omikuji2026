// Collectionページ
'use client'

import Image from 'next/image'
import { useGameData } from '../hooks/useGameData'
import { shopItems } from '../data/items'
import { Footer } from '../components/Footer'

export default function CollectionPage() {
    const { ownedItems } = useGameData()

    // 購入済みアイテムのフィルター
    const myCollection = shopItems.filter(item => ownedItems.includes(item.id))

    return (
        <main className='min-h-screen relative overflow-hidden pb-24 flex flex-col items-center'>
            <div className='relative header-img border-b shadow-lg border-gray-100'>
                <Image
                    src='/assets/collection/bg-collection.webp'
                    alt=''
                    height={305}
                    width={390}
                    className='h-full w-full transition-all duration-500 object-cover'
                />

                {/* 集めたアイテムの数 */}
                <div className='text-yellow-900 overflow-hidden shadow-lg rounded-r-full py-1 pl-4 pr-5 absolute left-0 absolute top-6 z-[1] flex items-center gap-1 font-bold'>
                    <div className='bg-white absolute inset-0 opacity-80 -z-[1]'></div>
                    <Image
                        src='/assets/items/item-almighty.webp'
                        alt='お守り'
                        height={16}
                        width={16}
                        className='h-auto max-w-5 w-auto'
                    />
                    <span className='text-base'> {myCollection.length} / {shopItems.length}</span><span className="text-sm">個</span>
                </div>
            </div>

            <div className={`relative bg-gray-100 flex-1 w-full ${
                myCollection.length === shopItems.length ? 'pb-4' : 'pb-12'
            }`}>
                {/* タイトル */}
                <div className='text-center py-8 '>
                    <p className='text-gray-700'>
                        これまでに授かったお守りが並ぶ場所。<br />一つひとつにあなたの願いと<br />幸運が込められています。
                    </p>
                </div>

                {/* コレクションが空の場合 */}
                {myCollection.length === 0 ? (
                    <div className='bg-white rounded-xl py-12 px-4 mx-auto text-center w-11/12'>
                        <p className='font-bold text-gray-400 text-xl mb-4'>
                            まだアイテムを持っていません。
                        </p>
                        <p className='text-gray-400'>
                            おみくじポイントを貯めて、<br/>
                            ショップでお守りを手に入れよう！
                        </p>
                    </div>
                ) : (
                    /* アイテムリスト */
                    <div className='grid grid-cols-2 gap-3 w-11/12 mx-auto'>
                        {myCollection.map((item) => (
                            <div
                                key={item.id}
                                className='bg-white rounded-lg shadow-lg p-4 transform transition-all hover:scale-105'
                            >
                                <div className='relative px-4 py-3'>
                                    {/* 輝きエフェクト */}
                                    {/* <div className='absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-lg opacity-20 animate-pulse'></div> */}
                                    <div className='absolute inset-0 item-flame'></div>
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        height={200}
                                        width={200}
                                        className='mx-auto mb-4 relative z-10 w-10/12'
                                    />
                                </div>
                                <h2 className='text-md font-bold text-center mt-4 mb-2 text-orange-900'>
                                    {item.name}
                                </h2>
                                <p className='text-gray-600 text-left text-sm nb-2'>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* 全て集めた時のメッセージ */}
                {myCollection.length === shopItems.length && (
                    <div className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-lg p-6 mt-15 text-center animate-bounce max-w-9/12 mx-auto'>
                        <p className='text-2xl font-bold mb-2 tracking-wider'>COMPLETE</p>
                        <p className='font-bold'>全てのアイテムを集めました<br />ここまで遊んでくれてありがとう✨</p>
                    </div>
                )}
            </div>

            <Footer currentPage='collection' />
        </main>
    )
}