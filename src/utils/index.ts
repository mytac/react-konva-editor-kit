import { isObject } from 'lodash'
const reactColor2Hex = (c: any) => {
    if (c.hex === 'transparent') return c.hex
    const alpha = c.rgb.a.toFixed(1)
    const finalString = `${c.hex}${
        alpha < 0.01 ? '00' : Math.round(255 * alpha).toString(16)
    }`
    return { hexCode: finalString, origin: c, alpha }
}

// 保留两位小数
const to2Decimal = (n: number) => {
    return Math.round(n)
}

// 将对象中的数值字符串变为数值类型
const numbericalObjectValues = (obj: any) => {
    if (!isObject(obj)) {
        return obj
    }
    const keys = Object.keys(obj)
    keys.forEach((key) => {
        const current = obj[key]
        if (!isNaN(current)) {
            obj[key] = Number(current)
        }
    })
    return obj
}

export { reactColor2Hex, to2Decimal, numbericalObjectValues }
