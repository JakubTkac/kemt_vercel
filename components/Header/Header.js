import { useState } from "react";
import styled from "styled-components";
import { COLOR, HEIGHT } from "../../Theme";
import { headerItems } from "./HeaderItems";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import HeaderDropdown from "./HeaderDropdown";

const HeaderContainer = styled.div`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: ${HEIGHT.S};
  flex-direction: row;
  background-color: ${COLOR.FEI_PRIMARY};
`;

const HeaderLogo = styled.div`
  width: 200px;
`;

const HeaderContent = styled.ul`
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  width: 100%;
  flex-direction: row;
  list-style-type: none;
`;

const StyledHeaderItem = styled.li`
  height: 100%;
  width: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const StyledA = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;

  font-size: 18px;
`;

const HeaderItem = ({ item }) => {
  const [displaySection, setDisplaySection] = useState(false);
  return (
    <StyledHeaderItem
      onMouseEnter={() => setDisplaySection(true)}
      onMouseLeave={() => setDisplaySection(false)}
    >
      <Link href={item.path}>
        <StyledA>
          {item.title}
          {item.dropdownItems && <RiArrowDropDownLine size={32} />}
        </StyledA>
      </Link>
      {item.dropdownItems && displaySection && (
        <HeaderDropdown dropdownItems={item.dropdownItems} />
      )}
    </StyledHeaderItem>
  );
};

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLogo />
      <HeaderContent>
        {headerItems.map((item) => (
          <HeaderItem key={item.id} item={item} />
        ))}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
