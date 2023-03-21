import styled from "styled-components";
import { FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

const StyledHeadingH1 = styled.h1`
  font-size: ${FONT_SIZE.XL};
  text-align: center;
  font-weight: ${FONT_WEIGHT.BOLD};
  @media (max-width: ${SCREENS.XL}) {
    padding-bottom: 1rem;
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.XL};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.L};
  }
`;

export default StyledHeadingH1;
