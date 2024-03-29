import { FC, useEffect, useState } from 'react'
import {
    PictureOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    LockFilled,
    UnlockFilled,
} from '@ant-design/icons'
import { Tooltip } from '../third-part'

import { FontSvg, ShopBag, GroupSvg } from '../icons'

import { LayerLockerWrapper } from './style'
import { isNumber } from 'lodash'

//TODO: type LayerType = IimageInfo | ItextInfo | IgroupInfo

const LayerLocker: FC<{
    layers: any[]
    onMoveUp?: () => void
    onMoveDown?: () => void
    onLock?: (i: number) => void
    onSelected?: (index: number) => void
    currentLayerId?: number
}> = ({
    layers,
    onMoveUp = () => {},
    onMoveDown = () => {},
    onLock = () => {},
    onSelected = () => {},
    currentLayerId,
}) => {
    const [layerList, setLayerList] = useState<any[]>([])
    const [selectedId, setSelected] = useState<number | null>(null)

    const onSelect = (id: number) => {
        setSelected(id)
        onSelected(id)
    }

    useEffect(() => {
        const list = layers.map(
            // @ts-ignore
            ({ id, value, banDrag, type, mType, elementName }) => ({
                id,
                value,
                banDrag,
                type,
                mType,
                elementName,
            })
        )
        setLayerList(list.reverse())
    }, [layers])

    useEffect(() => {
        // 支持外部选中
        if (isNumber(currentLayerId)) {
            setSelected(currentLayerId)
        }
    }, [currentLayerId])

    const swapLayer = (oldIndex: number, newIndex: number) => {
        const layerListCopy = [...layerList]
        const item = layerListCopy[oldIndex]
        layerListCopy[oldIndex] = layerListCopy[newIndex]
        layerListCopy[newIndex] = item
        setLayerList(layerListCopy)
    }

    const onUp = (id: number, index: number) => {
        onSelect(id)
        if (index === 0) return
        swapLayer(index, index - 1)
        onMoveUp()
    }

    const onDown = (id: number, index: number) => {
        onSelect(id)
        if (index === layers.length - 1) return
        swapLayer(index, index + 1)
        onMoveDown()
    }

    const onLockClick = (id: number, index: number) => {
        onSelect(id)
        const layerListCopy = [...layerList]
        const item = layerListCopy[index]
        item.banDrag = !item.banDrag
        layerListCopy[index] = item
        setLayerList(layerListCopy)
        onLock(id)
    }

    return (
        <LayerLockerWrapper>
            <div className="layer-title">图层管理</div>
            <div className="layer-infos">
                {layerList.map((layer: any, index: number) => (
                    <div
                        className={`layerInfo ${
                            selectedId === layer.id ? 'selected' : ''
                        }`}
                        key={layer.id}
                    >
                        <div
                            className="element-icon"
                            onClick={onSelect.bind(null, layer.id)}
                        >
                            {layer.type === 'image' &&
                                (layer.mType === 3 ? (
                                    <ShopBag />
                                ) : (
                                    <PictureOutlined />
                                ))}
                            {layer.type === 'text' && <FontSvg />}
                            {layer.type === 'group' && <GroupSvg />}
                        </div>
                        <div
                            className="element-title"
                            onClick={onSelect.bind(null, layer.id)}
                        >
                            {layer.type === 'group' && layer.elementName}
                            {layer.type === 'text' && layer.value}
                            {(layer.type === 'image' && layer.elementName) ||
                                layer.value}
                        </div>
                        <div className="move">
                            <ArrowUpOutlined
                                onClick={onUp.bind(null, layer.id, index)}
                            />
                            <ArrowDownOutlined
                                onClick={onDown.bind(null, layer.id, index)}
                            />
                        </div>
                        <Tooltip
                            title={layer.banDrag ? '解锁' : '锁定'}
                            placement="bottom"
                        >
                            <div
                                className="lock"
                                onClick={onLockClick.bind(
                                    null,
                                    layer.id,
                                    index
                                )}
                            >
                                {layer.banDrag ? (
                                    <LockFilled />
                                ) : (
                                    <UnlockFilled />
                                )}
                            </div>
                        </Tooltip>
                    </div>
                ))}
            </div>
        </LayerLockerWrapper>
    )
}

export default LayerLocker
