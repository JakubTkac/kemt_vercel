import styled from "styled-components";
import { FONT_SIZE } from "../../Theme";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 2rem 0;
  font-size: ${FONT_SIZE.L};
  gap: 0.5rem;
`;

const StyledSelectTypesContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default StyledSelectTypesContainer;
