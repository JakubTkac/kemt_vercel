import { useState } from "react";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, HEIGHT, SCREENS } from "../../Theme";
import { headerItems } from "./HeaderItems";
import Link from "next/link";
import { RiArrowDropDownLine, RiMenuLine } from "react-icons/ri";
import HeaderDropdown from "./HeaderDropdown";
import useBetterMediaQuery from "../../utils/useBetterMediaQuery";
import Navbar from "./Navbar";

const HeaderContainer = styled.div`
  padding: 0 5%;
  display: flex;
  flex: 1 3;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: ${HEIGHT.S};
  background-color: ${COLOR.FEI_PRIMARY};
  @media (max-width: ${SCREENS.XL}) {
    height: ${HEIGHT.XS};
  }
  @media (max-width: ${SCREENS.LG}) {
    gap: 0.4rem;
    padding: 0 2.5%;
  }
  @media (max-width: ${SCREENS.MD}) {
    justify-content: space-between;
    padding: 0 3rem;
  }
`;

const HeaderLogo = styled.div`
  // width: 200px;
  // cursor: pointer;
  // @media (max-width: ${SCREENS.XL}) {
  //   width: 160px;
  // }
  // @media (max-width: ${SCREENS.LG}) {
  //   width: 100px;
  // }
  max-height: ${HEIGHT.S};
  margin-right: 1rem;
  @media (max-width: ${SCREENS.XL}) {
    max-height: ${HEIGHT.XS};
  }
`;

const StyledHeaderLogo = styled.img`
  width: auto;
  height: 78px;
  @media (max-width: ${SCREENS.XL}) {
    height: 58px;
  }
`;

const HeaderContent = styled.ul`
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  list-style-type: none;

  @media (max-width: ${SCREENS.XL}) {
    justify-content: end;
    gap: 1rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    gap: 0.4rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    display: none;
  }
`;

const StyledHeaderItem = styled.li`
  height: 100%;
  width: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledA = styled.a`
  cursor: pointer;
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: flex-end;
  font-size: ${FONT_SIZE.MM};
  @media (max-width: ${SCREENS.XL}) {
    font-size: ${FONT_SIZE.S};
  }
  @media (max-width: ${SCREENS.LG}) {
    font-size: ${FONT_SIZE.SS};
  }
  @media (max-width: ${SCREENS.LG}) {
    font-size: ${FONT_SIZE.SS};
    gap: 0.1em;
  }
`;

const HeaderItem = ({ item }) => {
  const [displaySection, setDisplaySection] = useState(false);
  return (
    <StyledHeaderItem
      onMouseEnter={() => setDisplaySection(true)}
      onMouseLeave={() => setDisplaySection(false)}
    >
      <Link href={item.path}>
        <a>
          <StyledA>
            {item.title}
            {item.dropdownItems && <RiArrowDropDownLine size={32} />}
          </StyledA>
        </a>
      </Link>
      {item.dropdownItems && displaySection && (
        <HeaderDropdown dropdownItems={item.dropdownItems} />
      )}
    </StyledHeaderItem>
  );
};

const StyledMobileButton = styled.button`
  z-index: 100;
  position: relative;
  height: ${HEIGHT.XXS};
  width: ${HEIGHT.XXS};
  background-color: ${COLOR.BLACK};
  border-radius: 2rem;
  color: ${COLOR.FEI_PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${COLOR.WHITE};
  }
`;

const StyledMobileContainer = styled.div`
  z-index: 99;
  display: flex;
  flex-direction: column;
  width: 100%;
  //height: 86vh;
  height: 94%;
  position: absolute;
  top: ${HEIGHT.XS};
  right: 0;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.BLACK};
  padding: 2rem 4rem;
  @media (max-width: ${SCREENS.SM}) {
    padding: 2rem 2.5rem;
  }
  @media (max-width: ${SCREENS.XS}) {
    padding: 2rem 1rem;
  }
`;

const StyledMobileUl = styled.ul`
  width: 100%;
  border: 1px solid black;
  background-color: ${COLOR.FEI_PRIMARY};
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const StyledMobileHeading = styled.h1`
  font-size: ${FONT_SIZE.M};
  font-weight: ${FONT_WEIGHT.BOLDER};
  padding-bottom: 0.4rem;
`;

const StyledMobileLi = styled.li`
  width: 100%;
  border-bottom: 1px solid black;
  background-color: ${COLOR.FEI_PRIMARY};
  cursor: pointer;
  list-style: none;
  &:last-child {
    border-bottom: none;
  }
`;

const MobileButton = ({ items }) => {
  const [displaySection, setDisplaySection] = useState(false);
  return (
    <>
      <StyledMobileButton onClick={() => setDisplaySection(!displaySection)}>
        <RiMenuLine Size={32} />
      </StyledMobileButton>
      {displaySection && (
        <StyledMobileContainer>
          {items.map((item) => (
            <StyledMobileUl key={item.id}>
              <StyledMobileHeading>{item.title}</StyledMobileHeading>
              {item.dropdownItems &&
                item.dropdownItems.map((dropdownItem) => (
                  <Link href={dropdownItem.path} key={dropdownItem.id}>
                    <StyledMobileLi
                      onClick={() => setDisplaySection(!displaySection)}
                    >
                      {dropdownItem.title}
                    </StyledMobileLi>
                  </Link>
                ))}
            </StyledMobileUl>
          ))}
        </StyledMobileContainer>
      )}
    </>
  );
};

const Header = () => {
  const isLargerThan768 = useBetterMediaQuery("(min-width: 768px)");
  return (
    <>
      <Navbar></Navbar>
      <HeaderContainer>
        <HeaderLogo>
          <Link href="/">
            <a>
              <StyledHeaderLogo src={"/kemt_logo_kemt2.jpg"} alt="logo kemt" />
            </a>
          </Link>
        </HeaderLogo>
        {isLargerThan768 ? (
          <HeaderContent>
            {headerItems.map((item) => (
              <HeaderItem key={item.id} item={item} />
            ))}
          </HeaderContent>
        ) : (
          <MobileButton items={headerItems}></MobileButton>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
