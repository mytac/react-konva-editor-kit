import { isNumber } from 'lodash';
import { FC, useState, useEffect, useCallback } from 'react';
import { YHInput } from '@yh/yh-design';
import { debounce } from 'lodash';
import { Wrapper } from './style';

const PositionLocker: FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  changeXYWH: (a: any) => void;
  currentRef: any;
}> = ({ x, y, w, h, changeXYWH = () => {} }) => {
  const [xx, setX] = useState(0);
  const [yy, setY] = useState(0);
  const onChange = (e: any, key: string) => {
    const value = e.target.value;
    if (key === 'x') {
      setX(value);
    } else if (key === 'y') {
      setY(value);
    }
    const p = { [key]: Number(value) };
    debounceConfirm(p);
  };

  const confirmInput = (obj: any) => {
    changeXYWH(obj);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceConfirm = useCallback(debounce(confirmInput, 300), []);

  useEffect(() => {
    if (isNumber(x) || isNumber(y)) {
      setX(Math.round(x));
      setY(Math.round(y));
    }
  }, [x, y]);

  return (
    <Wrapper>
      <div className="title">位置</div>
      <div>
        <div className="position-row">
          <YHInput
            suffix="X"
            type="number"
            value={xx}
            onChange={(e) => onChange(e, 'x')}
          />
          <YHInput
            suffix="Y"
            type="number"
            value={yy}
            onChange={(e) => onChange(e, 'y')}
          />
        </div>
        {/* <div className="position-row">
          <YHInput suffix="W" value={w} onChange={(e) => onChange(e, 'w')} />
          <YHInput suffix="H" value={h} onChange={(e) => onChange(e, 'h')} />
        </div> */}
      </div>
    </Wrapper>
  );
};

export default PositionLocker;
