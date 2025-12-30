// ショップ店員さんの表情・セリフ
import { useGameData } from '../hooks/useGameData'
export type ShopkeeperState = 'normal' | 'thanks' | 'sad'

type ShopkeeperMessage = {
    image: string,
    message: JSX.Element
}

export const getShopkeeperMessage = (
    state: ShopkeeperState,
    itemName?: string,
    username?: string
): ShopkeeperMessage => {
    // ユーザー名が「あなた」の場合は「ゲスト」に変換
    const displayName = username === 'あなた' ? 'ゲスト' : username

    switch (state) {
        case 'thanks':
        return {
            image: '/assets/shop/shop-miko-thanks.webp',
            message: (
                <>
                    お買い上げ ありがとうございます！<br />
                    {displayName}さんに 良い運気が訪れますように✨
                </>
            )
        }

        case 'sad':
        return {
            image: '/assets/shop/shop-miko-sad.webp',
            message: (
                <>
                    ポイントが<span className="text-red-600 font-bold">足りない</span>ようです。<br />
                    おみくじを引いてポイントを<br/>貯めてくださいね！
                </>
            )
        }

        case 'normal':
        default:
            return {
            image: '/assets/shop/shop-miko-normal.webp',
            message: (
                <>
                    {displayName}さん いらっしゃいませ！<br />
                    おみくじで貯めたポイントで<br />
                    <span className='text-red-600 font-bold'>幸運のお守り</span>が買えますよ！
                </>
            )
            }
    }
}