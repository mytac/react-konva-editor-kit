import { FC, useState, useEffect, useCallback } from 'react'
import { Slider, Input } from 'antd'
import Konva from 'konva'
import { debounce } from 'lodash'
import { Wrapper } from './style'

const rotatePoint = (position: any, rad: number) => {
    const { x, y } = position
    const rcos = Math.cos(rad)
    const rsin = Math.sin(rad)
    return { x: x * rcos - y * rsin, y: y * rcos + x * rsin }
}

const RotationSlider: FC<{
    rotation: number
    onChangeRotation: (a: any) => void
    currentRef: any
}> = ({ rotation = 0, onChangeRotation = () => {}, currentRef }) => {
    const [inputvalue, setInputValue] = useState(0)

    const handleRotation = (rot: number) => {
        if (!currentRef) return {}
        const topLeft = {
            x: -currentRef.width() / 2,
            y: -currentRef.height() / 2,
        }
        const current = rotatePoint(
            topLeft,
            //@ts-ignore
            Konva.getAngle(currentRef.rotation())
        )
        //@ts-ignore
        const rotated = rotatePoint(topLeft, Konva.getAngle(rot))
        const dx = rotated.x - current.x,
            dy = rotated.y - current.y

        const newItem = {
            rotation: Math.round(rot),
            x: currentRef.x() + dx,
            y: currentRef.y() + dy,
        }

        return newItem
    }

    const confirmInput = (deg: any) => {
        const item = handleRotation(deg)
        onChangeRotation(item)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceConfirm = useCallback(debounce(confirmInput, 300), [
        currentRef,
    ])

    const onChangeSlide = (e: number) => {
        setInputValue(e)
        debounceConfirm(e)
    }

    useEffect(() => {
        setInputValue(Math.round(rotation))
    }, [rotation])

    return (
        <Wrapper>
            <div className="title">旋转角度</div>
            <div className="slider">
                <Slider
                    // disabled
                    tooltipVisible={false}
                    min={-180}
                    max={180}
                    onChange={onChangeSlide}
                    value={inputvalue}
                    step={1}
                />

                <Input
                    min={-180}
                    max={180}
                    step={1}
                    type="number"
                    value={inputvalue}
                    suffix="°"
                    //@ts-ignore
                    onChange={(e) => onChangeSlide(e.target.value)}
                />
            </div>
        </Wrapper>
    )
}

export default RotationSlider
