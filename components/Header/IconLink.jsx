import { useState } from "react";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

const StyledA = styled.a`
  position: relative;
  @media (max-width: ${SCREENS.SM}) {
    height: 100%;
    text-align: center;
    svg {
      height: 100%;
    }
  }
  span {
    padding: 0.2rem;
    z-index: 200;
    position: absolute;
    background-color: ${COLOR.WHITE};
    font-size: ${FONT_SIZE.M};
    color: ${COLOR.BLACK};
    border: ${COLOR.SEC[600]} 1px solid;
    font-weight: ${FONT_WEIGHT.BOLD};
    @media (max-width: ${SCREENS.SM}) {
      left: -5px;
    }
  }
`;

const IconLink = ({ Icon, url, children, label, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <StyledA
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon>{children}</Icon>
      {isHovered && <span>{name}</span>}
    </StyledA>
  );
};

export default IconLink;
