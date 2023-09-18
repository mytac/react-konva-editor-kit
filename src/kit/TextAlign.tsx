import React,{ FC } from 'react';
import { Wrapper } from './style';
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';

const TextAlign: FC<{
  textAlign: string;
  onChangeTextAlign: (a: any) => void;
}> = ({ textAlign = 'left', onChangeTextAlign = () => {} }) => {
  const onChange = (align: string) => {
    onChangeTextAlign({ align });
  };

  return (
    <Wrapper>
      <div className="title">对齐方式</div>
      <div className="fontStyler">
        <div
          className={`button1${textAlign === 'left' ? ' selected' : ''}`}
          onClick={onChange.bind(null, 'left')}
        >
          <AlignLeftOutlined />
        </div>
        <div
          className={`button1${textAlign === 'center' ? ' selected' : ''}`}
          onClick={onChange.bind(null, 'center')}
        >
          <AlignCenterOutlined />
        </div>
        <div
          className={`button1${textAlign === 'right' ? ' selected' : ''}`}
          onClick={onChange.bind(null, 'right')}
        >
          <AlignRightOutlined />
        </div>
      </div>
    </Wrapper>
  );
};

export default TextAlign;
