import styled from "styled-components";

const BoxSpacing = styled.div`
  width: auto;
  padding: ${(p) => (p.padding ? p.padding + "rem" : "0")};
  margin: ${(p) => (p.margin ? p.margin + "rem" : "0")};
  display: ${(p) => p.display || "block"};
  align-items: ${(p) => p.alignItems || "unset"};
  justify-content: ${(p) => p.justifyContent || "unset"};

  & p {
    margin: 0;
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    padding: 0;
    margin: 0;
  }
`;

export default BoxSpacing;
