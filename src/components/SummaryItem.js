import styled from "styled-components";
import { COLOR } from "../helper/contants";

const Outer = styled.div`
  padding: 1rem 0;
  margin-bottom: 1.5rem;
`;
const Line = styled.div`
  display: block;
  width: 30%;
  background: #ccc;
  height: 3px;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-weight: 600;
  color: black;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-weight: 600;
  color: ${COLOR.SUCCESS};
`;

const SummaryItem = (p) => {
  return (
    <Outer>
      <Line />
      <Label>{p.label}</Label>
      <Value>{p.value}</Value>
    </Outer>
  );
};

export default SummaryItem;
