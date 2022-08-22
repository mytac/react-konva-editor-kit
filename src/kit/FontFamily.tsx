import { FC } from 'react';
import { YHSelect } from '@yh/yh-design';
import { Wrapper } from './style';

const { Option } = YHSelect;

const FontFamily: FC<{
  value: string;
  fontList: any[];
  onChangeFont: (fontName: string) => void;
  disabled?: boolean;
  onSearchFont: (searchText: string) => void;
  loading: boolean;
}> = ({
  value,
  onChangeFont,
  fontList,
  disabled = false,
  onSearchFont,
  loading,
}) => {
  return (
    <Wrapper>
      <div className="title">字体</div>
      <div>
        <YHSelect
          showSearch
          value={value}
          onChange={onChangeFont}
          onSearch={onSearchFont}
          loading={loading}
          style={{ width: '232px' }}
          disabled={disabled}
          allowClear
        >
          {fontList &&
            fontList.map((f) => (
              <Option value={f.fontFamily} key={f.fontFamily}>
                {f.fontFamily}
              </Option>
            ))}
        </YHSelect>
      </div>
    </Wrapper>
  );
};

export default FontFamily;
