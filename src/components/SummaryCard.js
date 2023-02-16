import styled from "styled-components";
import { COLOR } from "../helper/contants";

const SummaryCard = styled.div`
  border-left: 0.5px solid ${COLOR.PRIMARY};
  padding: 1rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    border-left: 0px;
  }
`;

export default SummaryCard;
