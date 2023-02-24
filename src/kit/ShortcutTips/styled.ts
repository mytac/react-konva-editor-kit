import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  .btn {
    position: relative;
    width: 32px;
    height: 32px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 200px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #fff;
  font-size: 12px;
  .group {
    .head {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 8px;
      padding-left: 4px;
    }
    .info {
      height: 32px;
      background: #f5f6f7;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px;
      margin-bottom: 8px;
    }
  }
`;

export { Wrapper, Content };
