import styled from "styled-components";
import { COLOR, SCREENS } from "../../Theme";

const StyledContainer = styled.div`
  width: 100%;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  transition: width 2s, height 4s;
  border: 1px solid ${COLOR.PLATINUM[600]};
  background-color: ${COLOR.WHITE};
  @media (max-width: ${SCREENS.SM}) {
    margin: 0;
  }
`;

const StyledSingleItemContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default StyledSingleItemContainer;
