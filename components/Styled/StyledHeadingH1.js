import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

const StyledHeadingH1 = styled.h1`
  font-size: ${FONT_SIZE.XXL};
  text-align: center;
  font-weight: ${FONT_WEIGHT.BOLD};
  margin: 2rem 0;
  @media (max-width: ${SCREENS.XXL}) {
    font-size: ${FONT_SIZE.XL};
  }
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.XL};
    margin: 1rem 0;
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.XL};
  }
`;

export default StyledHeadingH1;
