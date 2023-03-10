// reference https://github.com/meltingice/psd.js/issues/204
//@ts-ignore
import PSD from 'psd.js/dist/psd'
import json2content from './json2Content'
import { parsedResultType } from './type'

const isPSDExt = (filename: string) => {
    if (filename) {
        const s = filename.split('.')
        const ext = s[s.length - 1]
        return ext === 'psd'
    }
    return false
}

const isPSD = (file: File) => {
    const { name } = file
    return isPSDExt(name)
}

const base64ToBlob = (b64: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64)
    const byteArrays: any = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
}

const base64ToFile = (b64String: string, name: string) => {
    const str = b64String.substring(b64String.indexOf(',') + 1)
    const blob = base64ToBlob(str, 'image/png')
    const file = new File([blob], name + '.png', {
        type: 'image/png',
        lastModified: new Date().getTime(),
    })
    return file
}

// 解析psd中的图片
const getImages = (root: any) => {
    const base64Arr: any = []
    const handler = (tree: any) => {
        if (tree?.layer.image) {
            const { layer } = tree
            const { image, name, visible } = layer
            if (visible) {
                try {
                    const imgElement = image.toPng()
                    const base64String = imgElement.getAttribute('src')
                    base64Arr.push({ id: name, base64String })
                } catch (err) {
                    console.log('err in toPng', name, err)
                }
            }
        }
        if (tree._children) {
            tree._children.forEach((node: any) => {
                // group类型
                if (node?._children?.length) {
                    node?._children.forEach((nodeChild: any) => {
                        handler(nodeChild)
                    })
                } else {
                    handler(node)
                }
            })
        }
    }
    handler(root)
    return base64Arr
}

// 生成独一无二的id
// const genUniqueId = (idBook: any = {}, name: string) => {
//   let id = name;
//   if (idBook[name]) {
//     // id重复则向后追加
//     const duplicateNum = idBook[name];
//     // 当 duplicateNum 为1 时，则证明重复id只有1个，向后追加'_1'；xxx 类型
//     if (duplicateNum === 1) {
//       id = name + '__1';
//       idBook[id] = 1;
//     } else {
//       // xxx_1 类型，duplicateNum 为1 时 重复值为2个
//       id = name + '__' + duplicateNum;
//       idBook[id] = 1;
//     }
//     idBook[name]++;
//   } else {
//     idBook[name] = 1;
//   }
//   return id;
// };

// 为psd tree 的每个叶子节点生成独有的id
const handleRawTree = (nodes: any) => {
    console.log('nodes', nodes)
    // const uniqueIdBook: any = {};
    let seq = 1001
    const handler = (node: any) => {
        // node.name = node.name;
        node.id = seq++
        if (node.children) {
            node.children.forEach((n: any) => {
                handler(n)
            })
        }
    }
    nodes.forEach((node: any) => {
        handler(node)
    })
    return nodes
}

const getPSDFromEvent = (evt: any) => {
    const { files } = evt.target
    const fileArr: any = Array.from(files).filter((f: any) => isPSD(f))
    return fileArr
}

const parsePSDThumbnail = async (evt: any) => {
    try {
        const newE = { ...evt }
        const fileArr = getPSDFromEvent(evt)
        if (!fileArr.length) {
            return
        }
        newE.dataTransfer = {
            files: fileArr,
        }
        const psdName = fileArr[0].name.split('.')[0]
        const psd = await PSD.fromEvent(newE)
        const tree = psd.tree()
        const { width, height } = tree
        const thumbNail = tree.psd.image.toBase64()
        // const thumbNailFile = base64ToFile(thumbNail, psdName);
        return {
            thumbNail,
            width,
            height,
            name: psdName + 'thumbnail',
        }
    } catch (err) {
        console.log('err in parsePSDThumbnail', err)
    }
}

const parsePSD = async (evt: any) => {
    try {
        const newE = { ...evt }
        const fileArr = getPSDFromEvent(evt)
        if (!fileArr.length) {
            return
        }
        newE.dataTransfer = {
            files: fileArr,
        }
        // @ts-ignpre
        const psdName = fileArr[0].name.split('.')[0]
        const psd = await PSD.fromEvent(newE)
        const tree = psd.tree()
        // handleRawTree(tree);
        console.log('tree', tree)
        const { width, height } = tree
        const fileArray = getImages(tree)
        // layerid对应的file映射
        const fileLayerMap: { [id: string]: File } = {}

        fileArray.forEach((item: any) => {
            const { base64String, id } = item
            if (base64String) {
                const file = base64ToFile(base64String, id)
                // 写入映射
                fileLayerMap[id] = file
            }
        })

        // const json = tree._children;
        const origin = handleRawTree(tree.export().children)
        const json = [...origin].reverse()
        const thumbNail = tree.psd.image.toBase64()
        const thumbNailFile = base64ToFile(thumbNail, psdName)
        return {
            json: json2content(json),
            thumbNail: thumbNailFile,
            fileLayerMap,
            width,
            height,
            name: psdName,
        }
    } catch (err) {
        console.log('errinparse', err)
        return false
    }
}

// // 获取预览图
// const getThumbnail = (psd: any) => {
//   return psd.image.toBase64(); // get PNG object
// };

// 将上传后的url回填到json中
const urlBackfillToJson = (urls: Array<string>, result: parsedResultType) => {
    const { json, fileLayerMap } = result
    const ids = Object.keys(fileLayerMap)

    const layerUrlMap: any = {}
    if (ids.length === urls.length) {
        ids.forEach((id: string, index: number) => {
            layerUrlMap[id] = urls[index]
        })

        const handler = (node: any, index: number) => {
            const { name, type } = node
            if (type === 'group') {
                return { ...node, elements: node.elements.map(handler) }
            } else if (type === 'image') {
                return {
                    ...node,
                    value: layerUrlMap[name],
                }
            } else return node
        }

        // 回填json
        // const content = json.map((layer: any, index: number) => {
        //   const { name, type } = layer;
        //   if (type === 'text') return { ...layer, id: 1001 + index };
        //   if (type==='group') {

        //   }
        //   return {
        //     ...layer,
        //     value: layerUrlMap[name],
        //     id: 1001 + index,
        //   };
        // });
        const content = json.map(handler)
        console.log('content', content)
        return JSON.stringify(content)
    }
}

export {
    parsePSD,
    urlBackfillToJson,
    getPSDFromEvent,
    isPSD,
    parsePSDThumbnail,
    base64ToFile,
    isPSDExt,
}
