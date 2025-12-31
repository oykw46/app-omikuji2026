// アイテムデータ
export type Item = {
    id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string
}

export const shopItems: Item[] = [
    {
        id: 'item_1',
        name: '葉っぱのお守り',
        description: 'ちょっとした幸運を呼ぶお守り',
        price: 20,
        imageUrl: '/assets/items/item-leaf.webp'
    },
    {
        id: 'item_2',
        name: '万能お守り',
        description: '健康運や金運、ありとあらゆる運を呼ぶお守り',
        price: 50,
        imageUrl: '/assets/items/item-almighty.webp'
    },
    {
        id: 'item_3',
        name: '稲荷神のお守り',
        description: '人生のすべてが上手くいく、稲荷神の御加護があるお守り',
        price: 100,
        imageUrl: '/assets/items/item-inari.webp'
    },
    {
        id: 'item_4',
        name: '御伽狐の御朱印帳',
        description: '参拝の証と共に幸運を集め、持つ者に加護をもたらす不思議な御朱印帳',
        price: 500,
        imageUrl: '/assets/items/item-goshuincho.webp'
    }
]
