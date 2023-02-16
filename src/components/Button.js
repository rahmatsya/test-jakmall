import styled from "styled-components";
import { COLOR } from "../helper/contants";

const Button = styled.button`
  background-color: ${COLOR.PRIMARY};
  border: 0;
  display: block;
  padding: 1.25rem;
  color: #fff;
  width: 100%;
  font-weight: 600;
  &: hover {
    cursor: pointer;
  }
`;

export default Button;
