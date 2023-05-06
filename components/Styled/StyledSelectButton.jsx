import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, HEIGHT, SCREENS } from "../../Theme";

const StyledButton = styled.button`
  position: relative;
  width: 100%;
  padding: 0.5rem;
  font-weight: ${FONT_WEIGHT.BOLD};
  min-height: ${HEIGHT.S};
  font-size: ${FONT_SIZE.L};
  background-color: ${COLOR.WHITE};
  border: 1px ${COLOR.PLATINUM[600]} solid;
  background-color: ${(props) =>
    props.selected ? COLOR.PRI[400] : COLOR.WHITE};
  color: ${(props) => (props.selected ? COLOR.BLACK : COLOR.BLACK)};
  &:hover {
    background-color: ${(props) =>
      props.selected ? COLOR.PRI[200] : COLOR.SEC[50]};
  }
  &:before {
    opacity: ${(props) => (props.selected ? 1 : 0)};
    margin-left: -20px;
    border-width: 20px 20px 0;
    border-style: solid;
    border-color: ${COLOR.PRI[400]} rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
  }
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.M};
  }
  @media (max-width: ${SCREENS.SM}) {
    font-size: ${FONT_SIZE.S};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.XS};
    padding: 0.2rem;
  }
`;

const SelectButton = ({ children, selected, onClickHandler }) => {
  return (
    <StyledButton onClick={onClickHandler} selected={selected}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;
