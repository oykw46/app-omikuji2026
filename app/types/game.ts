// Shopページ「商品情報」
export type Item = {
    id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    category?: string
}

export type UseDate = {
    points: number,
    ownedItem: string[] // アイテムIDの配列
}
