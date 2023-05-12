import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

const StyledTitleButton = styled.button`
  width: 100%;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  text-align: left;
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  @media (max-width: ${SCREENS.XS}) {
    padding: 0.2rem;
  }
  h2 {
    font-size: ${FONT_SIZE.L};
    color: ${COLOR.SEC[500]};
    font-weight: ${FONT_WEIGHT.EXTRABOLD};
    @media (max-width: ${SCREENS.MD}) {
      font-weight: ${FONT_WEIGHT.BOLDER};
      font-size: ${FONT_SIZE.M};
    }
  }
  svg {
    font-size: ${FONT_SIZE.XL};
    color: ${COLOR.SEC[500]};
  }
`;

export default StyledTitleButton;
