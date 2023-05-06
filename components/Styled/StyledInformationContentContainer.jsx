import styled from "styled-components";
import { COLOR, FONT_WEIGHT, SCREENS } from "../../Theme";

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
    min-width: 15rem;
    font-weight: ${FONT_WEIGHT.BOLD};
    @media (max-width: ${SCREENS.SM}) {
      min-width: auto;
    }
  }
  p {
  }
  a {
    color: ${COLOR.SEC[400]};
    text-decoration: underline;
  }
`;
const StyledInformationContentContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default StyledInformationContentContainer;
