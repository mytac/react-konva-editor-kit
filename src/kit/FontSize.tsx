import { FC, useEffect, useState, useCallback } from 'react'
import { Input } from '../third-part'
import { debounce } from 'lodash'

import { Wrapper } from './style'

const FontFamily: FC<{
    value: string
    onChangeFontSize: (a: any) => void
    scaleX?: number
}> = ({ value, onChangeFontSize, scaleX = 1 }) => {
    const [fSize, setFSize] = useState(40)

    const confirmInput = (input: number) => {
        const realSize = input / scaleX
        onChangeFontSize({ fontSize: realSize })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceConfirm = useCallback(debounce(confirmInput, 500), [])

    const onChange = (e: any) => {
        const v = e.target.value
        setFSize(v)
        debounceConfirm(v)
    }

    useEffect(() => {
        setFSize(Number(value) * scaleX)
    }, [value, scaleX])

    return (
        <Wrapper>
            <div className="title">字号</div>
            <div className="fontSizer">
                <Input
                    onChange={onChange}
                    type="number"
                    value={Math.round(fSize)}
                    style={{ width: '232px' }}
                    min={12}
                    max={150}
                />
                <span>px</span>
            </div>
        </Wrapper>
    )
}

export default FontFamily
