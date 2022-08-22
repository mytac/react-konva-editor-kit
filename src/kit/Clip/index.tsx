import { FC, useState, useEffect } from 'react'
import ReactCrop, { Crop, PixelCrop, PercentCrop } from 'react-image-crop'
import { Modal, Input } from 'antd'
import 'react-image-crop/dist/ReactCrop.css'
import useImage from 'use-image'
import { to2Decimal, numbericalObjectValues } from '../../utils'
import { realCropToShowCrop, showCropToRealCrop } from './handleDefaultCrop'
import back from '../../image/back.png'
import { Wrapper, RightCol } from './style'

export interface ICrop extends Crop {
    originWidth?: number
    originHeight?: number
}

interface IClip {
    url: string
    visible: boolean
    onCancel: () => void
    onChangeCrop: (a: any) => void
    defaultCrop?: ICrop
}

const Clip: FC<IClip> = ({
    url,
    visible,
    onCancel,
    onChangeCrop,
    defaultCrop,
}) => {
    // eslint-disable-next-line max-len
    const [cropReult, setCropResult] = useState<ICrop | undefined>() // cropResult是最后传给konva的，单位是px
    // eslint-disable-next-line max-len
    const [crop, setCrop] = useState<ICrop | undefined>(defaultCrop) // crop是再ReactCrop中使用的，单位是%
    const [image /* status */] = useImage(url, 'anonymous')

    useEffect(() => {
        if (image) {
            if (defaultCrop) {
                const showCrop = realCropToShowCrop(defaultCrop, image)
                setCrop({ ...showCrop, unit: 'px' })
                setCropResult({ ...defaultCrop, unit: 'px' })
            } else {
                // 没有预设crop就直接计算一个crop框，取宽高的80%
                const newCrop: ICrop = {
                    unit: '%',
                    width: 50,
                    height: 50,
                    x: 25,
                    y: 25,
                }
                setCrop(newCrop)
                setCropResult({
                    width: to2Decimal(image.width * 0.5),
                    height: to2Decimal(image.height * 0.5),
                    x: to2Decimal(image.width * 0.25),
                    y: to2Decimal(image.height * 0.25),
                    unit: 'px',
                })
            }
        }
    }, [defaultCrop, image])

    const onChangeInput = (e: any, type: string) => {
        const { value } = e.target
        if (image) {
            const newCrop = { ...cropReult }
            // @ts-ignore
            newCrop[type] = value
            setCropResult(newCrop as ICrop)
            const crop = realCropToShowCrop(newCrop as ICrop, image)
            setCrop(crop)
        }
    }

    const changeCrop = (c: any) => {
        const { width, height, x, y } = c
        if (image) {
            const crop = {
                ...c,
                x: to2Decimal(x),
                y: to2Decimal(y),
                width: to2Decimal(width),
                height: to2Decimal(height),
            }
            setCrop(crop)
            const realCrops = showCropToRealCrop(crop, image)
            setCropResult(realCrops)
        }
    }

    const onComplete = (crop: PixelCrop, b: PercentCrop) => {
        if (image) {
            const transformCrop = showCropToRealCrop(crop, image)
            setCropResult(transformCrop)
        } else {
            setCropResult(crop)
        }
    }

    const onSubmit = () => {
        if (image) {
            const result = {
                originWidth: image?.width,
                originHeight: image?.height,
                ...cropReult,
            }
            onChangeCrop(numbericalObjectValues(result))
        }
    }
    return (
        <Modal
            width={880}
            title="图片裁剪"
            visible={visible}
            onCancel={onCancel}
            onOk={onSubmit}
        >
            <Wrapper>
                <div
                    className="left"
                    style={{ backgroundImage: `url(${back})` }}
                >
                    <ReactCrop
                        className="crop"
                        crop={crop}
                        onChange={changeCrop}
                        onComplete={onComplete}
                    >
                        <img src={url} alt="" />
                    </ReactCrop>
                </div>
                <RightCol>
                    宽度:
                    <Input
                        suffix="W"
                        value={cropReult?.width}
                        onChange={(e) => onChangeInput(e, 'width')}
                    />
                    高度:
                    <Input
                        suffix="H"
                        value={cropReult?.height}
                        onChange={(e) => onChangeInput(e, 'height')}
                    />
                </RightCol>
            </Wrapper>
        </Modal>
    )
}

export default Clip
