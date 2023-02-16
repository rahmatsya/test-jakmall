import styled from "styled-components";

const TabContent = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
`;

export default TabContent;
