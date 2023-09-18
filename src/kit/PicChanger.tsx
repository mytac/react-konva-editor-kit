import React, { FC, useRef, useState } from 'react'
import { Button } from '../third-part'
import ClipModal from './Clip'
import { ICrop } from '../type'
import { Wrapper } from './style'
// import bgSvg from './png-bg.svg';

const PicChanger: FC<{
    url: string
    format: string
    onPick?: () => void
    onClickChange: () => void
    onChangeCrop: (a: any) => void
    onUpload?: (p: { files: File[]; values: any }) => void
    crop?: ICrop
}> = ({ onClickChange, url, format, onUpload, onChangeCrop, crop, onPick }) => {
    const [clipVisible, setClipVisible] = useState<boolean>(false)
    const ref = useRef<HTMLInputElement>(null)
    // const isPNG = format.toLowerCase() === 'png';

    const onOpenUploader = () => {
        const input = ref?.current
        if (input) {
            input.click()
        }
    }

    const onFileChange = (e: any) => {
        const { files } = e.target
        if (files?.length && onUpload) {
            onUpload({ files: Array.from(files), values: {} })
        }
    }

    const onClip = (crop: any) => {
        const { originWidth, originHeight } = crop
        onChangeCrop({
            scaleX: 1,
            scaleY: 1,
            crop,
            width: originWidth,
            height: originHeight,
            _isChangedCrop: true,
            _isAdaptStage: true,
        })
        setClipVisible(false)
    }

    return (
        <Wrapper>
            <div className="title">图片样式</div>
            <div className="picWrapper">
                <div className="btn-wrapper">
                    <div className="btn-row">
                        <Button className="operate-btn" onClick={onClickChange}>
                            替换图片
                        </Button>
                        {onUpload && (
                            <Button
                                className="operate-btn"
                                onClick={onOpenUploader}
                            >
                                本地上传
                            </Button>
                        )}
                        {onUpload && (
                            <div className="file-wrapper">
                                <input
                                    type="file"
                                    ref={ref}
                                    onChange={onFileChange}
                                />
                            </div>
                        )}
                    </div>
                    <div className="btn-row">
                        <Button
                            className="operate-btn"
                            onClick={setClipVisible.bind(null, true)}
                        >
                            裁剪图片
                        </Button>
                        {onPick && (
                            <Button className="operate-btn" onClick={onPick}>
                                一键抠图
                            </Button>
                        )}
                        {/* <YHButton className="operate-btn operate-btn-disable" disabled>
              蒙版
            </YHButton> */}
                    </div>

                    {clipVisible && (
                        <ClipModal
                            visible={clipVisible}
                            url={url}
                            onCancel={setClipVisible.bind(null, false)}
                            onChangeCrop={onClip}
                            defaultCrop={crop}
                        />
                    )}
                </div>
            </div>
        </Wrapper>
    )
}

export default PicChanger
