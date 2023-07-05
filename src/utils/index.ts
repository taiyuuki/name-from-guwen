import { math_random_int } from '@taiyuuki/utils'

function removePunctuation(str: string) {
    return str.replace(/[^\u4e00-\u9fa5]/g, '')
}

function getRandomStr(s: string) {
    const pure = removePunctuation(s)
    return pure.charAt(math_random_int(0, pure.length - 1))
}

function getRandomName(s: string, k: string) {
    return Math.random() > 0.5 ? `${s}${k}` : `${k}${s}`
}

export {
    removePunctuation,
    getRandomName,
    getRandomStr,
}
