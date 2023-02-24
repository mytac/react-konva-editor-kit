import { FC } from 'react'
import { Input } from '../third-part'
import { Wrapper } from './style'

const { TextArea } = Input

const TextContent: FC<{
    value: string
    changeText: (a: any) => void
}> = ({ value = '', changeText }) => {
    const onChange = (e: any) => {
        const text = e.target.value
        changeText({ value: text })
    }

    return (
        <Wrapper>
            <div className="title">文本内容</div>
            <div>
                <TextArea
                    onChange={onChange}
                    value={value}
                    disabled /* onBlur={onBlur} */
                />
            </div>
        </Wrapper>
    )
}

export default TextContent
