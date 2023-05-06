import styled from "styled-components";
import { COLOR, HEIGHT } from "../../Theme";

const StyledButton = styled.button`
  position: relative;
  width: 100%;
  min-height: ${HEIGHT.S};
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
`;

const SelectButton = ({ children, selected, onClickHandler }) => {
  return (
    <StyledButton onClick={onClickHandler} selected={selected}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;
