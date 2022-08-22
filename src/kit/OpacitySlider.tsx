import { FC, useState, useEffect, useCallback } from 'react';
import { Wrapper } from './style';
import { YHSlider, YHInput } from '@yh/yh-design';
import { debounce } from 'lodash';

const OpacitySlider: FC<{
  opacity: number;
  onChangeOpacity: (a: any) => void;
}> = ({ opacity = 0, onChangeOpacity = () => {} }) => {
  const [inputvalue, setInputValue] = useState(0);

  const confirmInput = (alpha: any) => {
    onChangeOpacity({ opacity: alpha / 100 });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceConfirm = useCallback(debounce(confirmInput, 500), []);

  const onChangeSlide = (e: number) => {
    setInputValue(e);
    debounceConfirm(e);
  };

  useEffect(() => {
    setInputValue(Math.round(opacity * 100)); // opacity是0-1的小数
  }, [opacity]);

  return (
    <Wrapper>
      <div className="title">不透明度</div>
      <div className="slider">
        <YHSlider
          min={0}
          max={100}
          tooltipVisible={false}
          onChange={onChangeSlide}
          value={inputvalue}
          step={1}
        />

        <YHInput
          max={100}
          min={0}
          step={1}
          type="number"
          value={inputvalue}
          suffix="%"
          //@ts-ignore
          onChange={(e) => onChangeSlide(e.target.value)}
        />
      </div>
    </Wrapper>
  );
};

export default OpacitySlider;
