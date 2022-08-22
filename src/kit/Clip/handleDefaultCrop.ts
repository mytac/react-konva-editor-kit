import { ICrop } from './index';
import { to2Decimal } from '@/utils/utils';

// 计算原图和400宽的模态框的缩放比例
const getScaleRatioCrop = (image: any) => {
  const BASE = 400;
  if (image) {
    const imageWidth = image.width;
    const imageHeight = image.height;
    const imgRatio = imageWidth / imageHeight;
    if (imgRatio > 1) {
      // 宽比高长，高按照宽缩放
      return imageWidth / BASE;
    } else {
      return imageHeight / BASE;
    }
  }
  return 1;
};

const showCropToRealCrop = (crop: ICrop, image: HTMLImageElement) => {
  if (image) {
    const { width, height, x, y } = crop;
    const ratio = getScaleRatioCrop(image);
    const w = ratio > 1 ? ratio * width : width; // 原图比现在展示的大，就直接乘这个数
    const h = ratio > 1 ? ratio * height : height; // 原图比现在展示的大，就直接乘这个数
    const xx = ratio > 1 ? ratio * x : x;
    const yy = ratio > 1 ? ratio * y : y;
    const transformCrop: ICrop = {
      width: to2Decimal(w),
      height: to2Decimal(h),
      x: to2Decimal(xx),
      y: to2Decimal(yy),
      unit: 'px',
    };
    return transformCrop;
  }
  return crop;
};

const realCropToShowCrop = (crop: ICrop, image: HTMLImageElement) => {
  if (image) {
    const { width, height, x, y } = crop;
    const ratio = getScaleRatioCrop(image);
    const w = ratio > 1 ? width / ratio : width; // 原图比现在展示的大，就直接乘这个数
    const h = ratio > 1 ? height / ratio : height; // 原图比现在展示的大，就直接乘这个数
    const xx = ratio > 1 ? x / ratio : x;
    const yy = ratio > 1 ? y / ratio : y;
    const transformCrop: ICrop = {
      width: to2Decimal(w),
      height: to2Decimal(h),
      x: to2Decimal(xx),
      y: to2Decimal(yy),
      unit: 'px',
    };
    return transformCrop;
  }
  return crop;
};

export { showCropToRealCrop, realCropToShowCrop, getScaleRatioCrop };
