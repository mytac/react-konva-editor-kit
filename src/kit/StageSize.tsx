import { FC } from 'react';
import { YHInput } from '@yh/yh-design';
import { Wrapper } from './style';

// 设置舞台的宽高
const StageSize: FC<{
  w: number;
  h: number;
  changeWidth: (a: any) => void;
  changeHeight: (a: any) => void;
  currentRef: any;
  disabled?: boolean;
}> = ({
  w,
  h,
  changeWidth = () => {},
  changeHeight = () => {},
  disabled = false,
}) => {
  const onChangeWidth = (e: any) => {
    const value = e.target.value;
    changeWidth(value);
  };

  const onChangeHeight = (e: any) => {
    const value = e.target.value;
    changeHeight(value);
  };

  return (
    <Wrapper>
      <div className="title">画布尺寸</div>
      <div>
        <div className="position-row">
          <YHInput
            suffix="W"
            value={w}
            disabled={disabled}
            onChange={onChangeWidth}
          />
          <YHInput
            suffix="H"
            value={h}
            disabled={disabled}
            onChange={onChangeHeight}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default StageSize;
