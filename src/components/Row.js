import styled from "styled-components";

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-right: ${(p) => (p.gap ? "-16px" : 0)};
  margin-left: ${(p) => (p.gap ? "-16px" : 0)};
  & > div {
    padding: ${(p) => (p.gap ? "16px" : 0)};
  }
`;

export default Row;
