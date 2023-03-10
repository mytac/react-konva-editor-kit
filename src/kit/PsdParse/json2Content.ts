import { isArray } from 'lodash'
//@ts-ignore
/**
 * 解析color数组
 */
const parseColorArr = (arr: any) => {
    if (isArray(arr) && arr.length > 0) {
        const [a, b, c] = arr[0]
        return `rgb(${a},${b},${c})`
    }
    return 'rgb(255,255,255)'
}
/**
 * 解析文本图层样式
 */
const parseTextStyle = (font: any) => {
    const {
        alignment = ['left'],
        colors,
        sizes = [40],
        textDecoration = ['none'],
        weights = ['normal'],
    } = font
    console.log('sizes', sizes, font)
    const res = {
        textAlign: alignment[0],
        fill: parseColorArr(colors),
        fontSize: sizes[0],
        textDecoration: textDecoration[0],
        fontWeight: weights[0],
    }

    if (res.textDecoration === 'none') {
        delete res.textDecoration
    }

    if (res.fontWeight === 'normal') {
        delete res.fontWeight
    }
    return res
}

// 是否为layer类型
const isLayer = (node: any) => node.type === 'layer'
const isGroup = (node: any) => node.type === 'group'

// 不是text类型就是image
const isText = (layer: any) => {
    return !!layer.text
}

/**
 * 解析定位
 */
const parsePos = (layer: any) => {
    const { top, left, height, width, name } = layer
    return { y: top, x: left, height, width, name }
}

/**
 * 解析文字图层
 */
const textLayer2Konva = (layer: any) => {
    const { text, id } = layer
    const { value, font } = text
    const pos = parsePos(layer)
    const { x, y, name } = pos
    return {
        type: 'text',
        value,
        x,
        y,
        name,
        id,
        ...parseTextStyle(font),
    }
}

/**
 * 解析图片图层
 */
const imageLayer2Konva = (layer: any) => {
    const pos = parsePos(layer)
    return {
        type: 'image',
        id: layer.id,
        ...pos,
    }
}

/**
 * 解析图层
 */
const parseLayer = (layer: any) => {
    if (isLayer(layer)) {
        if (isText(layer)) {
            return textLayer2Konva(layer)
        }
        return imageLayer2Konva(layer)
    }
}

// 输入类型为group的item，转换为需要的content格式
const parseGroup = (node: any) => {
    return {
        type: 'group',
        id: node.id,
        elements: node?.children
            .map((subNode: any) => {
                if (isGroup(subNode)) {
                    return {
                        type: 'group',
                        id: subNode.id,
                        elements: parseGroup(subNode),
                    }
                } else {
                    return parseLayer(subNode)
                }
            })
            .reverse(),
    }
}

/**
 * 解析json
 */
const json2content = (json: any) => {
    let content: any = []
    // const { children } = json;
    json.forEach((child: any) => {
        if (isLayer(child)) {
            content.push(parseLayer(child))
        } else if (isGroup(child)) {
            content.push(parseGroup(child))
        }
    })

    // children.forEach((child: any) => {
    //   const layer =
    //     child.type === 'group' ? parseGroup(child) : parseLayer(child);
    //   if (layer) {
    //     if (isArray(layer)) {
    //       content.push(...layer);
    //     } else {
    //       content.push(layer);
    //     }
    //   }
    // });
    return content
}

export default json2content
