import styled from "styled-components";

const WIDTH = 50;
const Tab = styled.div`
  border-radius: 35px;
  background: #fffae6;
  position: absolute;
  top: -${80 - 35}px;
  left: ${(100 - WIDTH) / 2}%;
  width: ${WIDTH}%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    padding: 1rem;
  }
`;

export default Tab;
