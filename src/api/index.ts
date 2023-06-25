import axios from 'axios'

export interface GuWen {
    content: string
    title:   string
    author:  string
    book:    string
    dynasty: string
}

export interface Result {
    content: string[]
    title:   string
    author:  string
    book:    string
    dynasty: string
}

export type NameData = GuWen & { name: string }

type Category = 'chuci' | 'cifu' | 'gushi' | 'shijing' | 'songci' | 'yuefu'

const api = axios.create({
    baseURL: process.env.BASE_URL,
})

let last = ''
let data: GuWen[] = []
async function getAll(url: Category) {
    if (last !== url || data.length === 0) {
        last = url
        const res = await api.get<GuWen[]>(`/json/${url}.json`)
        data = res.data
    }
    return data
}

async function getGuwen(url: Category, filter?: string) {
    const data = await getAll(url)
    return data.map(item => {
        const content = item.content
            .replace(/(。|？|！|；)/g, '|')
            .replace(/(“|”)/g, '')
            .replace(/(\(|（).+?(\)|）)/g, '')
            .replace(/\|$/, '')
            .split('|')
            .map(s => s.trim())
        return {
            ...item,
            author: item.author || '佚名',
            content: filter ? content.filter(s => s.includes(filter)) : content,
        }
    }).filter(item => item.content.length > 3)
}

export { getGuwen }
