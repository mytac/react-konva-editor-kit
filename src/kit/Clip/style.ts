import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .left {
    width: 576px;
    display: flex;
    justify-content: center;
    align-items: center;
    .crop {
      img {
        max-width: 400px;
        max-height: 400px;
      }
    }
  }
`;
const RightCol = styled.div`
  width: 200px;
`;
export { Wrapper, RightCol };
