function removePunctuation(str: string) {
    return str.replace(/[^\u4e00-\u9fa5]/g, '')
}

function getRandomName(s: string, k: string) {
    return Math.random() > 0.5 ? `${s}${k}` : `${k}${s}`
}

export {
    removePunctuation,
    getRandomName,
}
