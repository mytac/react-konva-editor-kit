import React, { FC, useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { EffectColorGroupWrapper } from '../style';
import { opacityToHexString } from './transform';
import { BLACK, TRANSPARENT, OPACITY_VALID } from './constants';
import { EffectItemProps } from './type';
import { reactColor2Hex } from '../../utils';

type OptionProps = {
  fill: string;
  stroke?: string;
  shadowColor?: string;
  shadowOpacity?: number;
};
const makeGroupArr = (opts: OptionProps, renderType: 'font' | 'image') => {
  const { fill, stroke, shadowColor, shadowOpacity } = opts;
  const res = [
    {
      type: 'fill',
      value: fill,
      title: renderType === 'font' ? '文本颜色' : '填充颜色',
    },
    {
      type: 'stroke',
      value: stroke,
      title: '描边颜色',
    },
    {
      type: 'shadowColor',
      value: shadowColor + opacityToHexString(shadowOpacity),
      title: '阴影颜色',
    },
  ];
  if (renderType === 'image') {
    res.splice(1, 1);
  }

  if (typeof shadowColor === 'undefined') {
    const index = res.findIndex((opt) => opt.type === 'shadowColor');
    if (~index) {
      res.splice(index, 1);
    }
  }
  return res;
};

interface Props extends EffectItemProps {
  changeColor: (color: string, type: string, alpha?: number) => void;
}

const ColorGroup: FC<Props> = ({
  title,
  renderType,
  changeColor,
  ...props
}) => {
  const {
    fill = renderType === 'font' ? BLACK : TRANSPARENT,
    stroke,
    shadowColor,
    shadowOpacity,
  } = props;

  const [colorGroup, setColorGroup] = useState(
    makeGroupArr({ fill, stroke, shadowColor, shadowOpacity }, renderType)
  );
  const [visible, setVisible] = useState(false);
  const [pickColor, setPickColor] = useState('');
  const [active, setActive] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);

  const openPicker = (color: string, index: number) => {
    // const arr = [...colorGroup];
    setPickColor(color);
    setVisible(true);
    setActive(index);
  };

  const onChangeColorPicker = (color: any) => {
    const { hexCode } = reactColor2Hex(color);
    const group = [...colorGroup];
    setPickColor(hexCode);
    colorGroup[active].value = hexCode;
    setColorGroup(group);
  };

  const onChangeColorPickerFinish = (color: any) => {
    const { hexCode, alpha } = reactColor2Hex(color);
    changeColor(hexCode, colorGroup[active].type, alpha);
  };

  // 监听鼠标移出有效区域后，关闭颜色选择框
  const hideListener = (e: MouseEvent) => {
    if (ref && visible) {
      const ele = e.target as Node;
      const validArea = ref.current;
      if (validArea && ele && !validArea.contains(ele)) {
        setVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', hideListener);
    return () => {
      document.removeEventListener('click', hideListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, pickColor]);

  useEffect(() => {
    const colorGroup = makeGroupArr(
      { fill, stroke, shadowColor, shadowOpacity },
      renderType
    );
    setColorGroup(colorGroup);
  }, [fill, stroke, shadowColor, renderType, shadowOpacity]);

  return (
    <EffectColorGroupWrapper>
      <div className="title">颜色</div>
      <div ref={ref}>
        <div className="color-group">
          {colorGroup.map(
            (color, index) =>
              color.value && (
                <div
                  key={color.type}
                  title={color.title}
                  className="color-box"
                  style={{ backgroundColor: color.value }}
                  onClick={openPicker.bind(null, color.value, index)}
                ></div>
              )
          )}
        </div>
        {visible && (
          <ChromePicker
            color={pickColor}
            disableAlpha={
              !OPACITY_VALID[renderType].includes(colorGroup[active].type)
            }
            onChange={onChangeColorPicker}
            onChangeComplete={onChangeColorPickerFinish}
          />
        )}
      </div>
    </EffectColorGroupWrapper>
  );
};

export default ColorGroup;
