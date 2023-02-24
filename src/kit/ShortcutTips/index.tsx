import React, { FC, useState, useEffect } from 'react'
import { Popover } from '../../third-part'
import { InfoCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { Wrapper, Content } from './styled'
import { CONFIG, getSystem } from './config'

const ShortcutTip: FC<{ style?: any }> = ({ style = {} }) => {
    const [isFold, setFold] = useState(true)
    const [system, setSystem] = useState('mac')

    useEffect(() => {
        setSystem(getSystem())
    }, [])

    const content = (
        <Content>
            {CONFIG.map((config) => (
                <div className="group" key={config.title}>
                    <p className="head">{config.title}</p>
                    {config.children.map((info: any) => (
                        <div className="info" key={info.title}>
                            <span>{info.title}</span>
                            <span>{info[system]}</span>
                        </div>
                    ))}
                </div>
            ))}
        </Content>
    )
    return (
        <Wrapper style={style}>
            <Popover
                content={content}
                placement="bottomRight"
                title="快捷键"
                trigger="click"
            >
                <div className="btn" onClick={setFold.bind(null, !isFold)}>
                    {isFold ? <InfoCircleOutlined /> : <CloseOutlined />}
                </div>
            </Popover>
        </Wrapper>
    )
}

export default ShortcutTip
