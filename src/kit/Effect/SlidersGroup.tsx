import { FC, useState, useEffect, useCallback } from 'react';
import { YHSlider, YHInput } from '@yh/yh-design';
import { debounce } from 'lodash';
import { Wrapper } from '../style';
import { EffectItemProps, RenderType } from './type';

interface Props extends EffectItemProps {
  changeSlide: (number: number, type: string) => void;
}

type OptionsProps = {
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
  strokeWidth: number;
};

const makeGroupArr = (options: OptionsProps, renderType: RenderType) => {
  const { strokeWidth, shadowOffsetX, shadowOffsetY, shadowBlur } = options;
  const ret = [
    {
      title: '描边粗细',
      max: 40,
      min: 0,
      step: 1,
      value: strokeWidth,
      type: 'strokeWidth',
    },
    {
      title: '水平偏移',
      max: 50,
      min: -50,
      step: 1,
      value: shadowOffsetX,
      type: 'shadowOffsetX',
    },
    {
      title: '垂直偏移',
      max: 50,
      min: -50,
      step: 1,
      value: shadowOffsetY,
      type: 'shadowOffsetY',
    },
    {
      title: '投影模糊',
      max: 40,
      min: 0,
      step: 1,
      value: shadowBlur,
      type: 'shadowBlur',
    },
  ];

  // 暂时不给图片特效设置描边的权限
  if (renderType === 'image') {
    ret.splice(0, 1);
  }

  return ret;
};

const OffsetsGroup: FC<Props> = ({ title, changeSlide, ...props }) => {
  const {
    shadowOffsetX = 0,
    shadowOffsetY = 0,
    shadowBlur = 0,
    strokeWidth = 0,
    renderType = 'font',
  } = props;
  // const [numbers,setNumbers]=useState([0,0,0])
  const [sliderGroup, setSliderGroup] = useState(
    makeGroupArr(
      { shadowOffsetX, shadowOffsetY, shadowBlur, strokeWidth },
      renderType
    )
  );

  const confirmInput = (number: number, type: string) => {
    changeSlide(number, type);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSubmit = useCallback(debounce(confirmInput, 500), []);

  const onChangeSlide = (index: number, number: number) => {
    const arrs = [...sliderGroup];
    arrs[index].value = number;
    setSliderGroup(arrs);
    const { type } = arrs[index];
    debounceSubmit(number, type);
  };

  useEffect(() => {
    setSliderGroup(
      makeGroupArr(
        { shadowOffsetX, shadowOffsetY, shadowBlur, strokeWidth },
        renderType
      )
    );
  }, [shadowOffsetX, shadowOffsetY, shadowBlur, strokeWidth, renderType]);

  if (!props.shadowColor) {
    return null;
  }

  return (
    <>
      {sliderGroup.map((slider, index) => (
        <Wrapper key={slider.type}>
          <div className="title">{slider.title}</div>
          <div className="slider">
            <YHSlider
              min={slider.min}
              max={slider.max}
              tooltipVisible={false}
              onChange={onChangeSlide.bind(null, index)}
              value={slider.value}
              step={slider.step}
            />

            <YHInput
              max={slider.max}
              min={slider.min}
              step={slider.step}
              type="number"
              value={slider.value}
              onChange={(e) => onChangeSlide(index, Number(e.target.value))}
            />
          </div>
        </Wrapper>
      ))}
    </>
  );
};

export default OffsetsGroup;
