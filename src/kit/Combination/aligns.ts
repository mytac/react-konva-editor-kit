// import { Iinfo } from '@/components/KonvaCanvas/type';
export type AlignType = 'left'

// 得到layer中最小的x
const getXMin = (layers: any[]) => {
    return layers.reduce(
        (prev, cur) => (prev < cur.x ? prev : cur.x),
        layers[0].x
    )
}

const handleAlign = (layers: any[], type: AlignType) => {
    const newLayers = [...layers]
    switch (type) {
        case 'left': {
            const minLeft = getXMin(layers)
            return newLayers.map((layer: any) => ({
                ...layer,
                x: minLeft,
            }))
        }
    }
    return []
}

export default handleAlign
