import React, { FC } from 'react'
import { Select } from 'antd'
import { FONT_PRESETS, IMAGE_PRESETS } from './configs'
import EffectItem from './EffectItem'
import ColorGroup from './ColorGroup'
import SlidersGroup from './SlidersGroup'
import { Wrapper, EffectSelectWrapper } from '../style'

const EffectPresets: FC<{
    value: number
    onChangeEffect: (obj: any) => void
    disabled?: boolean
    fill: string
    renderType?: 'font' | 'image' // 是图片阴影还是字体
}> = ({
    value,
    onChangeEffect,
    disabled = false,
    renderType = 'font',
    ...props
}) => {
    const presets = renderType === 'font' ? FONT_PRESETS : IMAGE_PRESETS
    const onSelect = (index: number) => {
        const fontProperties = presets[index]
        onChangeEffect({ effectType: index, ...fontProperties })
    }

    const changeColor = (color: string, type: string, alpha?: number) => {
        if (type !== 'shadowColor') {
            onChangeEffect({ [type]: color })
        } else if (alpha) {
            onChangeEffect({
                [type]: color.slice(0, -2),
                shadowOpacity: Number(alpha),
            })
        }
    }

    const changeSlide = (number: number, type: string) => {
        onChangeEffect({ [type]: number })
    }

    return (
        <Wrapper>
            <div className="title">特效</div>
            <EffectSelectWrapper>
                <Select
                    value={value}
                    onChange={onSelect}
                    style={{ width: '232px' }}
                    disabled={disabled}
                >
                    {presets.map((f, index) => (
                        <Select.Option value={index} key={f.title}>
                            <EffectItem {...f} renderType={renderType} />
                        </Select.Option>
                    ))}
                </Select>
            </EffectSelectWrapper>
            <ColorGroup
                {...props}
                changeColor={changeColor}
                renderType={renderType}
            />
            <SlidersGroup
                {...props}
                changeSlide={changeSlide}
                renderType={renderType}
            />
        </Wrapper>
    )
}

export default EffectPresets
