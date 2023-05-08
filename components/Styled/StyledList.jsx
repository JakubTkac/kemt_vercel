import { COLOR } from "../../Theme";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
`;

const StyledList = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
export default StyledList;
