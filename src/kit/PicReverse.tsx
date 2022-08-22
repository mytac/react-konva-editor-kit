import { FC } from 'react';
import { YHCheckbox } from '@yh/yh-design';
import { Wrapper } from './style';

const PicReverse: FC<{
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
  onChangeScale: (a: any) => void;
  currentRef: any;
}> = ({
  scaleX,
  scaleY,
  onChangeScale,
  currentRef,
  offsetX = 0,
  offsetY = 0,
}) => {
  const onReverse = (type: string, isSelected: boolean) => {
    let scale = { scaleX: scaleX, scaleY: scaleY };
    let offset = {};

    if (type === 'horizontal') {
      scale.scaleX = scaleX * -1;

      offset = {
        offsetX: isSelected
          ? offsetX + currentRef.width()
          : offsetX - currentRef.width(),
      };
    } else {
      scale.scaleY = scaleY * -1;
      offset = {
        offsetY: isSelected
          ? offsetY + currentRef.height()
          : offsetY - currentRef.height(),
      };
    }
    onChangeScale({ ...scale, ...offset });
  };
  return (
    <Wrapper>
      <div className="flip">
        <YHCheckbox
          onChange={(e: any) => onReverse('horizontal', e.target.checked)}
        >
          左右翻转
        </YHCheckbox>
        <YHCheckbox
          onChange={(e: any) => onReverse('vertical', e.target.checked)}
        >
          上下翻转
        </YHCheckbox>
      </div>
    </Wrapper>
  );
};

export default PicReverse;
