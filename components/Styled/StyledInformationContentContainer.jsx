import styled from "styled-components";
import { COLOR, FONT_WEIGHT, HEIGHT, SCREENS } from "../../Theme";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  transition: width 2s, height 4s;
  @media (max-width: ${SCREENS.SM}) {
    flex-direction: column;
  }
  span {
    min-width: 20rem;
    font-weight: ${FONT_WEIGHT.BOLD};
    word-wrap: break-word;
    overflow-wrap: break-word;
    min-height: ${HEIGHT.XXS};
    word-break: break-all;
    @media (max-width: ${SCREENS.SM}) {
      min-width: auto;
    }
  }
  p {
    width: 100%;
  }
  a {
    word-break: break-all;
    width: 100%;
    color: ${COLOR.SEC[400]};
    text-decoration: underline;
  }
  ul {
    list-style: none;
  }
`;
const StyledInformationContentContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default StyledInformationContentContainer;
