import styled from "styled-components";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHT,
  SCREENS,
  WIDTH,
} from "../../Theme";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  justify-content: space-between;
  input {
    background-color: ${COLOR.WHITE};
    border: 1.5px solid ${COLOR.PLATINUM[600]};
    min-height: ${HEIGHT.XS};
    margin-bottom: 1rem;
    padding: 0 1.5em;
    font-size: ${FONT_SIZE.M};
    font-weight: ${FONT_WEIGHT.BOLD};
  }
  @media (max-width: ${SCREENS.LG}) {
    input {
      width: 100%;
    }
    flex-direction: column;
  }
`;

const StyledInputWrapper = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default StyledInputWrapper;
