import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 14px;
  width: 100%;
  margin-bottom: 12px;

  .title {
    margin-bottom: 8px;
  }
  .position-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .ant-input-affix-wrapper {
      width: 100px;
    }
  }
  .fontSizer {
    display: flex;
    align-items: center;
    & > span {
      margin-left: 10px;
    }
  }
  .fontStyler {
    display: flex;
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 16px;

    .button1 {
      height: 32px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        color: #525865;
      }
    }
    .button1:nth-child(2),
    .button1:nth-child(3) {
      border-left: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
    }

    .selected {
      border: 1px solid #3c7af7;
      span {
        color: #3c7af7;
      }
    }
  }
  .slider {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > .ant-slider {
      width: 120px;
      margin-right: 20px;
    }
    & > span {
      width: 80px;
    }
    & > .ant-input {
      width: 56px;
    }
  }
  .flip {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  .picWrapper {
    width: 228px;
    .imgWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      & > img {
        max-width: 228px;
        max-height: 228px;
      }

      margin-bottom: 19px;
    }
    .btn-wrapper {
      display: flex;
      /* justify-content: space-between; */
      flex-direction: column;
      .btn-row {
        display: flex;
        flex-direction: row;
      }
      & > div:first-child {
        margin-bottom: 10px;
      }
      .operate-btn {
        background-color: #f0f7ff;
        color: #3c7af7;
        border: 0px;
      }
      .operate-btn-disable {
        color: #e7e8eb;
        background-color: #f5f6f7;
      }
      .ant-btn {
        flex: 1;
        margin: 0 7px !important;
      }
    }
  }
  .file-wrapper {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;
    opacity: 0;
  }
`;

const ColorBlockWrapper = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const LayerLockerWrapper = styled.div`
  width: 256px;
  color: #525865;

  .selected {
    background-color: #f0f7ff;
    color: #3c7af7;
  }

  .layer-title {
    padding: 0 16px;
    display: flex;
    height: 56px;
    align-items: center;
    color: #525865;
    font-size: 16px;
    font-weight: bold;
  }
  .layer-infos {
    max-height: 300px;
    overflow-y: auto;
  }
  .layerInfo {
    padding: 0 16px;
    height: 40px;
    display: flex;
    flex: 1;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    .element-title {
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .move {
      span {
        margin-right: 8px;
      }
    }
    .lock {
      cursor: pointer;
    }
    .element-title {
      cursor: pointer;
    }
    .element-icon {
      height: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const EffectItemWrapper = styled.div`
  width: 232px;
  height: 56px;
  display: flex;
  font-size: 16px;
  align-items: center;
  .title {
    margin-bottom: 0;
  }
  .font {
    background-color: #f5f6f7;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin-right: 10px;
  }
  .img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    margin-right: 14px;
    background-color: #f2f3f5;
    width: 32px;
    height: 32px;
    & > span {
      font-size: 24px;
      color: #ccc;
    }
  }
`;

const EffectColorGroupWrapper = styled.div`
  margin: 8px 0;
  .color-group {
    display: flex;
    justify-content: space-between;
    .color-box {
      flex: 1;
      min-width: 64px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 4px;
      border: 1px solid #d9d9d9;
    }
  }
`;

const EffectSelectWrapper = styled.div`
  .ant-select-selector {
    height: 64px !important;
  }
`;

export {
  Wrapper,
  ColorBlockWrapper,
  LayerLockerWrapper,
  EffectItemWrapper,
  EffectColorGroupWrapper,
  EffectSelectWrapper,
};
