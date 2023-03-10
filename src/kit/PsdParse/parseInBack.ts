import { isPSD, parsePSDThumbnail, base64ToFile } from './parse'

class BackParse {
    psds: Array<File>
    constructor(files: Array<File>) {
        const validPsds = files.filter((file) => isPSD(file))
        if (validPsds.length) {
            this.psds = validPsds
        } else {
            throw new Error('invalid file list')
        }
    }

    /**
     * 批量预览文件
     */
    public async getPreviewFiles() {
        let i = 0
        const files = this.psds
        const result: any = []
        try {
            while (i < files.length) {
                const file = await this.getPreviewFile(files[i])
                result.push(file)
                i++
            }
            return result
        } catch (err) {
            console.error('err in getPreviewFiles')
            return result
        }
    }

    public async getPreviewFile(psd: File) {
        try {
            const filename = psd.name + '@psdthumbnail'
            console.log('psd', psd)
            const { thumbNail } = await this.getPreview(psd)
            const file = base64ToFile(thumbNail, filename)
            return file
        } catch (err) {
            console.log(err)
        }
    }

    public async getPreview(psd: File) {
        const event: any = { ...new Event('click') }
        //@ts-ignore
        event.target = {
            files: [psd],
        }
        const result: any = await parsePSDThumbnail(event)
        // const { thumbNail, width, height, name } = result;
        return result
    }
}

export default BackParse
