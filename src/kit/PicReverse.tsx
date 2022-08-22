import { FC } from 'react'
import { Checkbox } from 'antd'
import { Wrapper } from './style'

const PicReverse: FC<{
    scaleX: number
    scaleY: number
    offsetX: number
    offsetY: number
    onChangeScale: (a: any) => void
    currentRef: any
}> = ({
    scaleX,
    scaleY,
    onChangeScale,
    currentRef,
    offsetX = 0,
    offsetY = 0,
}) => {
    const onReverse = (type: string, isSelected: boolean) => {
        let scale = { scaleX: scaleX, scaleY: scaleY }
        let offset = {}

        if (type === 'horizontal') {
            scale.scaleX = scaleX * -1

            offset = {
                offsetX: isSelected
                    ? offsetX + currentRef.width()
                    : offsetX - currentRef.width(),
            }
        } else {
            scale.scaleY = scaleY * -1
            offset = {
                offsetY: isSelected
                    ? offsetY + currentRef.height()
                    : offsetY - currentRef.height(),
            }
        }
        onChangeScale({ ...scale, ...offset })
    }
    return (
        <Wrapper>
            <div className="flip">
                <Checkbox
                    onChange={(e: any) =>
                        onReverse('horizontal', e.target.checked)
                    }
                >
                    左右翻转
                </Checkbox>
                <Checkbox
                    onChange={(e: any) =>
                        onReverse('vertical', e.target.checked)
                    }
                >
                    上下翻转
                </Checkbox>
            </div>
        </Wrapper>
    )
}

export default PicReverse
