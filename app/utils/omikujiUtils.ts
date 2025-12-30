// おみくじの結果を生成する処理
import { fortuneLevels, fortuneMessages, type Fortune } from '../data/fortune'

// ランダムに要素を取得するヘルパー関数
const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
}

// おみくじを生成する関数
export const generateFortune = (count?: number): Fortune => {
    // 10の倍数の挑戦は必ず「大吉」
    const isSpecial = count !== undefined && count % 10 === 0

    return {
        level: isSpecial ? '大吉' : getRandomItem(fortuneLevels),
        messages: {
            願望: isSpecial ? '全ての願いが叶う！あなたは特別な存在です。' : getRandomItem(fortuneMessages.願望),
            待ち人: isSpecial ? '運命の人が現れる。心を開いて待て。' : getRandomItem(fortuneMessages.待ち人),
            旅立ち: isSpecial ? '素晴らしい旅が待っている。恐れず進め。' : getRandomItem(fortuneMessages.旅立ち),
            商い: isSpecial ? '大きな利益あり。自信を持って進め。' : getRandomItem(fortuneMessages.商い),
            学問: isSpecial ? '努力が実を結ぶ。今こそ飛躍の時。' : getRandomItem(fortuneMessages.学問),
            仕事: isSpecial ? '昇進や成功のチャンス到来。掴み取れ。' : getRandomItem(fortuneMessages.仕事),
            恋愛: isSpecial ? '最高の恋が始まる。心のままに進め。' : getRandomItem(fortuneMessages.恋愛),
            縁談: isSpecial ? '素晴らしい縁に恵まれる。迷わず進め。' : getRandomItem(fortuneMessages.縁談),
            争い事: isSpecial ? '全てが丸く収まる。平和が訪れる。' : getRandomItem(fortuneMessages.争い事),
            金運: isSpecial ? '大きな幸運が舞い込む。感謝を忘れずに。' : getRandomItem(fortuneMessages.金運),
            転居: isSpecial ? '最高の場所が見つかる。新しい門出を祝え。' : getRandomItem(fortuneMessages.転居),
            縁起物: isSpecial ? '黄金の鍵（幸運の扉を開く）' : getRandomItem(fortuneMessages.縁起物)
        }
    }
}