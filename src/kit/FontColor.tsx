import { FC, useState, useEffect, useRef } from 'react'
import { Input } from 'antd'
import { ChromePicker } from 'react-color'
import { Wrapper, ColorBlockWrapper } from './style'
import { reactColor2Hex } from '../utils'

const validColor = (str: string) => {
    if (!str || str[0] !== '#') return false
    if (str.length === 4 || str.length === 7) {
        return true
    }
    return false
}

const FontColor: FC<{
    color: string
    changeColor: (a: any) => void
    type?: string
    disabled?: boolean
}> = ({ color = '#000', changeColor, type, disabled }) => {
    const [input, setInput] = useState('')
    const [visible, setVisible] = useState(false)
    const [acolor, setColor] = useState('rgba(0,0,0,0)')
    const ref = useRef<HTMLDivElement | null>(null)

    const hideListener = (e: MouseEvent) => {
        if (ref && visible) {
            const ele = e.target as Node
            const validArea = ref.current
            if (validArea && ele && !validArea.contains(ele)) {
                setVisible(false)
            }
        }
    }

    const changeInput = (e: any) => {
        const { value } = e.target
        setInput(value)
    }

    useEffect(() => {
        document.addEventListener('click', hideListener)
        return () => {
            document.removeEventListener('click', hideListener)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, acolor])

    useEffect(() => {
        setColor(color)
        setInput(color)
    }, [color])

    useEffect(() => {
        if (validColor(input)) {
            setColor(input)
            changeColor({ fill: input })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])

    return (
        <Wrapper>
            <div className="title">
                {type === 'background' ? '背景颜色' : '颜色'}
            </div>
            <div ref={ref}>
                <Input
                    disabled={disabled}
                    onChange={changeInput}
                    onFocus={setVisible.bind(null, true)}
                    type="text"
                    value={input}
                    addonAfter={
                        <ColorBlockWrapper
                            onClick={setVisible.bind(null, true)}
                            style={{ backgroundColor: acolor }}
                        ></ColorBlockWrapper>
                    }
                />
                {visible && (
                    <ChromePicker
                        color={acolor}
                        onChange={(c: any) => {
                            const { hexCode } = reactColor2Hex(c)
                            setColor(hexCode)
                        }}
                        onChangeComplete={(c: any) => {
                            const { hexCode } = reactColor2Hex(c)
                            changeColor({ fill: hexCode, _ignore: true })
                        }}
                    />
                )}
            </div>
        </Wrapper>
    )
}

export default FontColor
