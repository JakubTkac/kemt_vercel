import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

const StyledReport = styled.a`
  text-decoration: underline;
  color: ${COLOR.SEC[400]};
  font-size: ${FONT_SIZE.L};
  font-weight: ${FONT_WEIGHT.BOLD};
  &:hover {
    color: ${COLOR.SEC[700]};
  }
  &:visited {
    color: ${COLOR.SEC[700]};
  }
  li {
    list-style: none;
  }
  @media (max-width: ${SCREENS.SM}) {
    font-size: ${FONT_SIZE.M};
  }
`;

const DocumentPDF = ({ children, url }) => {
  return (
    <StyledReport href={url} target="_blank" rel="noopener noreferrer">
      <li>{children}</li>
    </StyledReport>
  );
};

export default DocumentPDF;
