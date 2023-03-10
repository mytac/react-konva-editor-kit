export type uploadPromise = (files: Array<File>) => Promise<Array<String>>

export type parsedResultType = {
    thumbNail: File
    json: Array<any> // 图层信息
    fileLayerMap: { [id: string]: File } // layer与image的映射
    width: number
    height: number
    name: string // psd文件名
}

export enum UploadStatus {
    Pending = 2,
    Success = 1,
    Fail = 0,
    Prepare = -1,
}
