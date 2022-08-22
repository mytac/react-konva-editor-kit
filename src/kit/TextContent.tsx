import { FC } from 'react';
import { YHInput } from '@yh/yh-design';
import { Wrapper } from './style';

const { TextArea } = YHInput;

const TextContent: FC<{
  value: string;
  changeText: (a: any) => void;
}> = ({ value = '', changeText }) => {
  const onChange = (e: any) => {
    const text = e.target.value;
    changeText({ value: text });
  };

  return (
    <Wrapper>
      <div className="title">文本内容</div>
      <div>
        <TextArea
          onChange={onChange}
          value={value}
          disabled /* onBlur={onBlur} */
        />
      </div>
    </Wrapper>
  );
};

export default TextContent;
