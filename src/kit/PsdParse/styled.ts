import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    margin-bottom: 8px;
    span {
      color: #fa5140;
    }
  }
  .tips {
    font-size: 12px;
    color: #838b98;
    margin-bottom: 8px;
  }
`;
const Box = styled.div`
  display: flex;
  margin-bottom: 16px;
  .icon {
    font-size: 80px;
    color: #e7e8eb;
  }
`;
const P1 = styled.div`
  font-size: 16px;
  text-align: center;
  color: #525865;
  span {
    color: #3c7af7;
  }
`;
const P2 = styled.div`
  font-size: 14px;
  text-align: center;
  color: #838b98;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 0 auto;
  .icon {
    font-size: 42px;
    width: 42px;
    height: 42px;
  }
  .head {
    margin-top: 15px;
    color: #2b354a;
    font-size: 16px;
    font-weight: bold;
  }
  .content {
    font-size: 14px;
    color: #525865;
    text-align: center;
  }
`;

const InnerWrapper = styled.div`
  font-size: 14px;
  color: #2b354a;
  border: 1px dashed #aaafb9;
  display: flex;
  flex-direction: column;
  width: 592px;
  height: 190px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .input-file {
    display: none;
  }
`;

export { Wrapper, Box, P1, P2, Loading, InnerWrapper };
