// ユーザーデータを「localStrage」に保管する（おみくじの結果・購入状況など）
'use client'

import { useState, useEffect } from 'react'

type FortuneStats = {
    [key: string]: number // '大吉': 3, '中吉': 5 など
}

type Achievement = {
    id: string,
    name: string,
    description: string,
    unlocked: boolean,
    unlockedAt?: string
}

type UserData = { // ローカルストレージに保管する情報
    points: number, // 所持ポイント
    ownedItems: string[], // アイテムIDの配列
    username: string, // ユーザーネーム
    fortuneStats: FortuneStats, // おみくじの結果
    totalDraws: number, // おみくじを引いた回数
    totalPointsEarned: number, // ポイント総獲得数
    totalPointsSpent: number, // ポイントを消費した数
    achievements: Achievement[], // 実績
    bgmEnabled: boolean // BGM設定
}

const defaultData: UserData = {
    points: 0,
    ownedItems: [],
    username: 'あなた',
    fortuneStats: {},
    totalDraws: 0,
    totalPointsEarned: 0,
    totalPointsSpent: 0,
    achievements: [
        { id: 'first_draw', name: '初めてのおみくじ', description: 'おみくじを1回引く', unlocked: false },
        { id: 'draw_10', name: '10回挑戦', description: 'おみくじを10回引く', unlocked: false },
        { id: 'draw_50', name: '50回挑戦', description: 'おみくじを50回引く', unlocked: false },
        { id: 'first_purchase', name: '初めての買い物', description: 'ショップで初めて購入', unlocked: false },
        { id: 'all_items', name: 'コンプリート', description: '全てのアイテムを購入', unlocked: false },
        { id: 'daikichi', name: '大吉を引いた', description: '大吉を引く', unlocked: false }
    ],
    bgmEnabled: true
}

export const useGameData = () => {
    const [userData, setUserData] = useState<UserData>(defaultData)

    // 初回読み込み時
    useEffect(() => {
        const saved = localStorage.getItem('gameData')
        if (saved) {
            const parsedData = JSON.parse(saved)
            // 新しいフィールドをマージ
            setUserData({ ...defaultData, ...parsedData })
        }
    }, [])

    // データを保存
    const saveData = (data: UserData) => {
        console.log('💾 saveData 実行')
        console.log('💾 保存内容:', data)
        setUserData(data)
        localStorage.setItem('gameData', JSON.stringify(data))
        console.log('💾 保存完了')
      }

    // ポイントを追加
    const addPoints = (amount: number) => {
        console.log('💰 addPoints 開始')
        console.log('💰 現在のポイント:', userData.points)
        console.log('💰 追加:', amount)

        const newData = {
            ...userData,
            points: userData.points + amount,
            totalPointsEarned: userData.totalPointsEarned + amount
        }
        console.log('💰 新しいポイント:', newData.points)
        saveData(newData)
    }

    // おみくじの結果を記録
    const recordFortuneWithPoints = (level: string, points: number) => {
        console.log('🎁 recordFortuneWithPoints 開始')
        console.log('🎁 運勢:', level)
        console.log('🎁 付与ポイント:', points)

        const newStats = { ...userData.fortuneStats }
        newStats[level] = (newStats[level] || 0) + 1
        const newTotalDraws = userData.totalDraws + 1

        // 実績チェック
        const newAchievements = [...userData.achievements]

        if (newTotalDraws === 1) { // おみくじを1回引く
            const idx = newAchievements.findIndex(a => a.id === 'first_draw')
            if (idx !== -1 && !newAchievements[idx].unlocked) {
                newAchievements[idx] = { ...newAchievements[idx], unlocked: true, unlockedAt: new Date().toISOString() }
            }
        }

        if (newTotalDraws === 10) { // おみくじを10回引く
            const idx = newAchievements.findIndex(a => a.id === 'draw_10')
            if (idx !== -1 && !newAchievements[idx].unlocked) {
                newAchievements[idx] = { ...newAchievements[idx], unlocked: true, unlockedAt: new Date().toISOString()}
            }
        }

        if (newTotalDraws === 50) { // おみくじを50回引く
            const idx = newAchievements.findIndex(a => a.id === 'draw_50')
            if (idx !== -1 && !newAchievements[idx].unlocked) {
                newAchievements[idx] = { ...newAchievements[idx], unlocked: true, unlockedAt: new Date().toISOString()}
            }
        }

        if (level === '大吉') { // 大吉を出す
            const idx = newAchievements.findIndex(a => a.id === 'daikichi')
            if (idx !== -1 && !newAchievements[idx].unlocked) {
                newAchievements[idx] = { ...newAchievements[idx], unlocked: true, unlockedAt: new Date().toISOString() }
            }
        }

        const newData = {
            ...userData,
            points: userData.points + points,
            totalPointsEarned: userData.totalPointsEarned + points,
            fortuneStats: newStats,
            totalDraws: newTotalDraws,
            achievements: newAchievements
        }
        console.log('🎁 新しいデータ:', newData)
        saveData(newData)
    }

    // アイテムを購入
    const buyItem = (itemId: string, price: number, totalItems: number) => {
        if (userData.points < price) {
            return { success: false, message: 'ポイントが足りません' }
        }
        if (userData.ownedItems.includes(itemId)) {
            return { success: false, message: 'すでに購入済みです' }
        }

        const newOwnedItems = [...userData.ownedItems, itemId]
        const newAchievements = [...userData.achievements]

        // 初回購入実績
        if (newOwnedItems.length === 1) {
            const idx = newAchievements.findIndex(a => a.id === 'first_purchase')
            if (idx !== -1 && !newAchievements[idx].unlocked) {
                newAchievements[idx] = { ...newAchievements[idx], unlocked: true, unlockedAt: new Date().toISOString() }
            }
        }

        // 全アイテムの購入実績
        if (newOwnedItems.length === totalItems) {
            const idx = newAchievements.findIndex(a => a.id === 'all_items')
            if (idx !== -1 && !newAchievements[idx].unlocked) {
                newAchievements[idx] = { ...newAchievements[idx], unlocked: true, unlockedAt: new Date().toISOString()}
            }
        }

        const newData = {
            ...userData,
            points: userData.points - price,
            totalPointsSpent: userData.totalPointsSpent + price,
            ownedItems: newOwnedItems,
            achievements: newAchievements
        }
        saveData(newData)
        return { success: true, message: '購入しました！' }
    }

    // アイテムを所持しているか？
    const hasItem = (itemId: string) => {
        return userData.ownedItems.includes(itemId)
    }

    // ユーザー名を設定
    const setUsername = (name: string) => {
        const newData = { ...userData, username: name }
        saveData(newData)
    }

    // BGM設定を切り替え
    const toggleBGM = () => {
        const newData = { ...userData, bgmEnabled: !userData.bgmEnabled }
        saveData(newData)
    }

    // データをリセット
    const resetData = () => {
        setUserData(defaultData)
        localStorage.removeItem('gameData')
        localStorage.removeItem('fortuneCount')
    }

    return {
        points: userData.points,
        ownedItems: userData.ownedItems,
        username: userData.username,
        fortuneStats: userData.fortuneStats,
        totalDraws: userData.totalDraws,
        totalPointsEarned: userData.totalPointsEarned,
        totalPointsSpent: userData.totalPointsSpent,
        achievements: userData.achievements,
        bgmEnabled: userData.bgmEnabled,
        addPoints,
        recordFortuneWithPoints, 
        buyItem,
        hasItem,
        setUsername,
        toggleBGM,
        resetData
    }
}