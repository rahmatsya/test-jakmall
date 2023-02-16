import styled from "styled-components"

const WIDTH = "80";
const AppContainer = styled.div`
    background-color: #fff;
    width: ${WIDTH}%;
    padding: 2rem;
    padding-top: calc(2rem + 35px);
    border-radius: 4px;
    box-shadow: 2px 10px 20px rgba(255, 138, 0, 0.1);
    position: absolute;
    left: ${(100 - WIDTH) / 2}%;
    right: ${(100 - WIDTH) / 2}%;
    top: 80px;
`

export default AppContainer