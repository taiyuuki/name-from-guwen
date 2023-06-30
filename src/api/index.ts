import { deep_equal } from '@taiyuuki/utils'
import axios from 'axios'

export interface GuWen {
    content: string
    title:   string
    author:  string
    book:    string
    dynasty: string
}

export interface Result {
    all: string
    content: string[]
    title:   string
    author:  string
    book:    string
    dynasty: string
}

export type NameData = GuWen & {
    name: [string, string]
    all:  string
}

export type Category = 'tangshi' | 'chuci' | 'cifu' | 'gushi' | 'shijing' | 'songci' | 'yuefu'

export type CategoryCheck = Record<Category, boolean>

const api = axios.create({
    baseURL: process.env.BASE_URL,
})

let lastest: Category[] = []
let data: GuWen[] = []
async function getAll(list: Category[]) {
    if (!deep_equal(lastest, list) || data.length === 0) {
        data = []
        lastest = []
        lastest.push(...list)
        for await (const item of list) {
            const res = await api.get<GuWen[]>(`/json/${item}.json`)
            data.push(...res.data)
        }
    }
    return data
}

async function getGuwen(list: Category[], filter?: string) {
    const data = await getAll(list)
    return data.map(item => {
        const all = item.content
        const content = item.content
            .replace(/(。|？|！|；)/g, '$1|')
            .replace(/(“|”)/g, '')
            .replace(/(\(|（).+?(\)|）)/g, '')
            .replace(/\|$/, '')
            .split('|')
            .map(s => s.trim())
        return {
            ...item,
            all,
            author: item.author || '佚名',
            content: filter ? content.filter(s => s.includes(filter)) : content,
        }
    }).filter(item => item.content.length)
}

export { getGuwen }
