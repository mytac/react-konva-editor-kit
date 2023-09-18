import React,{ FC } from 'react';
import { Wrapper } from './style';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
} from '@ant-design/icons';

const TextStyle: FC<{
  fontStyle: string;
  textDecoration: string;
  onChangeFontStyle: (a: any) => void;
}> = ({
  fontStyle = '',
  textDecoration = '',
  onChangeFontStyle = () => {},
}) => {
  const isBold = fontStyle.includes('bold');
  const isUnderline = textDecoration.includes('underline');
  const isItalic = fontStyle.includes('italic');
  const isLineThrough = textDecoration.includes('line-through');

  const onChange = (key: string, isExsit: boolean) => {
    const isDecor = key === 'underline' || key === 'line-through';
    let s: string = isDecor ? textDecoration : fontStyle;

    if (isExsit) {
      // 存在就删除
      const reg = new RegExp(key);
      s = s.replace(reg, '');
    } else {
      // 不存在就加上
      s += ' ' + key;
    }
    onChangeFontStyle({ [isDecor ? 'textDecoration' : 'fontStyle']: s });
  };

  return (
    <Wrapper>
      <div className="title">文本样式</div>
      <div className="fontStyler">
        <div
          className={`button1${isBold ? ' selected' : ''}`}
          onClick={onChange.bind(null, 'bold', isBold)}
        >
          <BoldOutlined />
        </div>
        <div
          className={`button1${isUnderline ? ' selected' : ''}`}
          onClick={onChange.bind(null, 'underline', isUnderline)}
        >
          <UnderlineOutlined />
        </div>
        <div
          className={`button1${isItalic ? ' selected' : ''}`}
          onClick={onChange.bind(null, 'italic', isItalic)}
        >
          <ItalicOutlined />
        </div>
        <div
          className={`button1${isLineThrough ? ' selected' : ''}`}
          onClick={onChange.bind(null, 'line-through', isLineThrough)}
        >
          <StrikethroughOutlined />
        </div>
      </div>
    </Wrapper>
  );
};

export default TextStyle;
