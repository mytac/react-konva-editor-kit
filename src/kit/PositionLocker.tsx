import { isNumber } from 'lodash';
import { FC, useState, useEffect, useCallback } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { Wrapper } from './style';

const PositionLocker: FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  changeXYWH: (a: any) => void;
  currentRef: any;
  showSizeInput?: boolean;
}> = ({
  x,
  y,
  width,
  height,
  changeXYWH = () => {},
  showSizeInput = false,
}) => {
  const [xx, setX] = useState(0);
  const [yy, setY] = useState(0);
  const [ww, setW] = useState(width);
  const [hh, setH] = useState(height);
  const onChange = (e: any, key: string) => {
    const value = e.target.value;

    switch (key) {
      case 'x': {
        setX(value);
        break;
      }
      case 'y': {
        setY(value);
        break;
      }
      case 'width': {
        setW(value);
        break;
      }
      case 'height': {
        setH(value);
        break;
      }
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
          <Input
            suffix="X"
            type="number"
            value={xx}
            onChange={(e) => onChange(e, 'x')}
          />
          <Input
            suffix="Y"
            type="number"
            value={yy}
            onChange={(e) => onChange(e, 'y')}
          />
        </div>
        {showSizeInput && (
          <div className="position-row">
            <Input
              suffix="W"
              type="number"
              value={ww}
              onChange={(e) => onChange(e, 'width')}
            />
            <Input
              suffix="H"
              type="number"
              value={hh}
              onChange={(e) => onChange(e, 'height')}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default PositionLocker;
