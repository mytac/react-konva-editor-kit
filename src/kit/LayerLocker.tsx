import { FC, useEffect, useState } from 'react';
import {
  PictureOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LockFilled,
  UnlockFilled,
} from '@ant-design/icons';
import { YHTooltip } from '@yh/yh-design';
import { FontSvg, ShopBag } from '../icons';
import { IimageInfo, ItextInfo } from '../../KonvaCanvas/type';

import { LayerLockerWrapper } from './style';
import { isNumber } from 'lodash';

type LayerType = IimageInfo | ItextInfo;

const LayerLocker: FC<{
  layers: LayerType[];
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onLock?: (i: number) => void;
  onSelected?: (index: number) => void;
  currentLayerId?: number;
}> = ({
  layers,
  onMoveUp = () => {},
  onMoveDown = () => {},
  onLock = () => {},
  onSelected = () => {},
  currentLayerId,
}) => {
  const [layerList, setLayerList] = useState<any[]>([]);
  const [selectedId, setSelected] = useState<number | null>(null);

  const onSelect = (id: number) => {
    setSelected(id);
    onSelected(id);
  };

  useEffect(() => {
    const list = layers.map(
      ({ id, value, banDrag, type, mType, elementName }) => ({
        id,
        value,
        banDrag,
        type,
        mType,
        elementName,
      })
    );
    setLayerList(list.reverse());
  }, [layers]);

  useEffect(() => {
    // 支持外部选中
    if (isNumber(currentLayerId)) {
      setSelected(currentLayerId);
    }
  }, [currentLayerId]);

  const swapLayer = (oldIndex: number, newIndex: number) => {
    const layerListCopy = [...layerList];
    const item = layerListCopy[oldIndex];
    layerListCopy[oldIndex] = layerListCopy[newIndex];
    layerListCopy[newIndex] = item;
    setLayerList(layerListCopy);
  };

  const onUp = (id: number, index: number) => {
    onSelect(id);
    if (index === 0) return;
    swapLayer(index, index - 1);
    onMoveUp();
  };

  const onDown = (id: number, index: number) => {
    onSelect(id);
    if (index === layers.length - 1) return;
    swapLayer(index, index + 1);
    onMoveDown();
  };

  const onLockClick = (id: number, index: number) => {
    onSelect(id);
    const layerListCopy = [...layerList];
    const item = layerListCopy[index];
    item.banDrag = !item.banDrag;
    layerListCopy[index] = item;
    setLayerList(layerListCopy);
    onLock(id);
  };

  return (
    <LayerLockerWrapper>
      <div className="layer-title">图层管理</div>
      <div className="layer-infos">
        {layerList.map((layer: any, index: number) => (
          <div
            className={`layerInfo ${selectedId === layer.id ? 'selected' : ''}`}
            key={layer.id}
          >
            <div
              className="element-icon"
              onClick={onSelect.bind(null, layer.id)}
            >
              {layer.type === 'image' ? (
                layer.mType === 3 ? (
                  <ShopBag />
                ) : (
                  <PictureOutlined />
                )
              ) : (
                <FontSvg />
              )}
            </div>
            <div
              className="element-title"
              onClick={onSelect.bind(null, layer.id)}
            >
              {layer.type === 'text'
                ? layer.value
                : layer.elementName || layer.value}
            </div>
            <div className="move">
              <ArrowUpOutlined onClick={onUp.bind(null, layer.id, index)} />
              <ArrowDownOutlined onClick={onDown.bind(null, layer.id, index)} />
            </div>
            <YHTooltip
              title={layer.banDrag ? '解锁' : '锁定'}
              placement="bottom"
            >
              <div
                className="lock"
                onClick={onLockClick.bind(null, layer.id, index)}
              >
                {layer.banDrag ? <LockFilled /> : <UnlockFilled />}
              </div>
            </YHTooltip>
          </div>
        ))}
      </div>
    </LayerLockerWrapper>
  );
};

export default LayerLocker;
