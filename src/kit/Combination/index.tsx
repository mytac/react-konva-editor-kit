import { FC } from 'react'
import { AlignLeftOutlined } from '@ant-design/icons'
// import { Iinfo } from '@/components/KonvaCanvas/type';
import handleAlign, { AlignType } from './aligns'
import { Wrapper } from '../style'

export type CombinationProps = {
    layers: Array<any>
    handleChange: (layers: Array<any>) => void
}

// 多选组合
const Combination: FC<CombinationProps> = ({ layers, handleChange }) => {
    const changeLayer = (type: AlignType) => {
        const layerUpdates = handleAlign(layers, type)
        if (layerUpdates) {
            handleChange(layerUpdates)
        }
    }

    return (
        <Wrapper>
            <div className="title">对齐</div>
            <div>
                <AlignLeftOutlined onClick={changeLayer.bind(null, 'left')} />
            </div>
        </Wrapper>
    )
}

export default Combination
