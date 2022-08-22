import { FC } from 'react'
import { StopOutlined } from '@ant-design/icons'
import { cssTransform } from './transform'
import imgIcon from '../image/image-icon.png'
import { EffectItemWrapper } from '../style'
import { EffectItemProps } from './type'

const EffectItem: FC<EffectItemProps> = ({ title, renderType, ...props }) => {
    const style = cssTransform(props, renderType)

    return (
        <EffectItemWrapper>
            {renderType === 'font' ? (
                <div className="font" style={style}>
                    A
                </div>
            ) : (
                <div className="img-wrapper">
                    {title === '无特效' ? (
                        <StopOutlined />
                    ) : (
                        <img
                            className="image"
                            src={imgIcon}
                            style={style}
                            alt=""
                        />
                    )}
                </div>
            )}

            <div className="title">{title}</div>
        </EffectItemWrapper>
    )
}

export default EffectItem
