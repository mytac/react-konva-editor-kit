import { Crop } from 'react-image-crop'

export interface ICrop extends Crop {
    originWidth?: number
    originHeight?: number
}

export interface IClip {
    url: string
    visible: boolean
    onCancel: () => void
    onChangeCrop: (a: any) => void
    defaultCrop?: ICrop
}
