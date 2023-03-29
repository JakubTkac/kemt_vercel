import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, SPACE } from "../../Theme";

//
//bug: doest react on mouse wheel click
const StyledShowAllButton = styled.button`
  width: 100%;
  margin-bottom: 2rem;
  background-color: ${COLOR.SEC.DEFAULT};
  color: ${COLOR.WHITE};
  text-align: center;
  font-weight: 500;
  font-size: ${FONT_SIZE.M};
  height: ${SPACE.XL};
  border: ${COLOR.SEC[600]} 1px solid;
  @media (max-width: ${SCREENS.XL}) {
    height: ${SPACE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    height: ${SPACE.XL};
  }
  @media (max-width: ${SCREENS.XS}) {
    height: ${SPACE.L};
  }
  &:hover {
    background-color: ${COLOR.SEC[300]};
  }
`;

export default StyledShowAllButton;
