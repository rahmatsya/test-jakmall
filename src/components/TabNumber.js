import styled from "styled-components";
import { COLOR } from "../helper/contants";

const TabNumber = styled.div`
  color: ${(props) => (props.isActive ? "#fff" : COLOR.PRIMARY)};
  font-size: 18px;
  font-weight: 500;
  background-color: ${(props) =>
    props.isActive ? COLOR.PRIMARY : "#FF8A002b"};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
`;

export default TabNumber;
