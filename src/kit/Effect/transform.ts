const hex2RGB = (hexCode: string) => {
  const rgbArray: any = [0, 0, 0];
  if (hexCode.length !== 7) {
    return rgbArray;
  }
  const hexPure = hexCode.slice(1);
  const hexCutArr = hexPure.match(/\{1,2}/g);
  hexCutArr?.forEach((hex, index) => {
    rgbArray[index] = parseInt(hex, 16);
  });
  return rgbArray;
};

const hexOpacityToNum = (digit16Opacity: string) => {
  return parseInt(digit16Opacity, 16) / 255;
};

const opacityToHexString = (opacity: number = 1) => {
  if (typeof opacity !== 'number') {
    return '';
  }
  const o = Number(opacity);
  if (!o || o >= 1) {
    return '';
  }
  const res = Math.round(o * 255).toString(16);
  return res;
};

const validRGBAArr = (hexCode: string, opacity: number) => {
  const [r, g, b] = hex2RGB(hexCode);
  return `rgba(${r},${g},${b},${opacity})`;
};

const cssTransform = (props: any, type: 'font' | 'image' = 'font') => {
  const {
    stroke,
    strokeWidth,
    shadowOffsetX = 0,
    shadowOffsetY = 0,
    shadowColor = '#000000',
    shadowBlur = 0,
    shadowOpacity,
    fill = '#000000',
  } = props;
  const cssProperties: any = {
    color: fill,
  };

  if (stroke && strokeWidth) {
    if (type === 'font') {
      cssProperties.textStroke = `${strokeWidth}px ${stroke}`;
      cssProperties.WebkitTextStroke = `${strokeWidth}px ${stroke}`;
    } else {
      cssProperties.border = `${strokeWidth}px solid ${stroke}`;
    }
  }

  // eslint-disable-next-line max-len
  cssProperties[
    type === 'font' ? 'textShadow' : 'boxShadow'
  ] = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${validRGBAArr(
    shadowColor,
    shadowOpacity
  )}`;

  return cssProperties;
};

export { cssTransform, opacityToHexString, hexOpacityToNum };
