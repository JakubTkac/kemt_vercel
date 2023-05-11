import { useState } from "react";
import styled from "styled-components";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHT,
  SCREENS,
  WIDTH,
} from "../../Theme";
import { headerItems } from "./HeaderItems";
import Link from "next/link";
import { RiArrowDropDownLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import HeaderDropdown from "./HeaderDropdown";
import useBetterMediaQuery from "../../utils/useBetterMediaQuery";
import Navbar from "./Navbar";
import TranslateComponent from "../Common/TranslateComponent";
import Blank from "../Common/Blank";
import { useRouter } from "next/router";
import HeaderMobileDropdown from "./HeaderMobileDropdown";

const HeaderContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  flex: 1 3;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: ${HEIGHT.S};
  background-color: ${COLOR.PRI[500]};
  border: 1px solid ${COLOR.BLACK};
  border-top: 0;
  @media (max-width: ${SCREENS.XL}) {
    height: ${HEIGHT.XS};
    padding: 0 3.75rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    gap: 0.4rem;
    padding: 0 1.9rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    justify-content: space-between;
    padding: 0 0.25rem;
  }
  @media (max-width: ${SCREENS.SM}) {
    padding: 0 0.25rem 0 0;
  }
`;

const HeaderLogo = styled.div`
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
  color: ${COLOR.BLACK};
  font-weight: ${FONT_WEIGHT.BOLD};

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
  svg {
    font-size: ${FONT_SIZE.L};
  }
`;

const HeaderItem = ({ item, locale }) => {
  const [displaySection, setDisplaySection] = useState(false);
  return (
    <StyledHeaderItem
      onMouseEnter={() => setDisplaySection(true)}
      onMouseLeave={() => setDisplaySection(false)}
    >
      <Link href={item.path}>
        <a>
          <StyledA>
            <TranslateComponent
              Component={Blank}
              en={item.titleEN}
              sk={item.title}
              locale={locale}
            ></TranslateComponent>
            {item.dropdownItems && <RiArrowDropDownLine />}
          </StyledA>
        </a>
      </Link>
      {item.dropdownItems && displaySection && (
        <HeaderDropdown dropdownItems={item.dropdownItems} locale={locale} />
      )}
    </StyledHeaderItem>
  );
};

const StyledMobileButton = styled.button`
  z-index: 100;
  position: relative;
  height: ${HEIGHT.XXS};
  width: ${HEIGHT.XXS};
  background-color: ${COLOR.SEC[500]};
  color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.SEC[600]};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${COLOR.SEC[50]};
  }
  svg {
    font-size: ${FONT_SIZE.L};
  }
`;

const StyledMobileContainer = styled.div`
  z-index: 99;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: ${HEIGHT.DropdownSmaller};
  right: 0;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.BLACK};
  border-left: 0;
  border-right: 0;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 ${WIDTH.XXS};
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 ${WIDTH.XXXXXS};
    align-items: start;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 ${WIDTH.XXXXXXS};
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0 ${WIDTH.MOBILE};
    flex-direction: column;
  }
`;

const StyledContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
  border-top: 0px;
  width: 100%;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
  @media (max-width: ${SCREENS.XS}) {
    padding: 0;
  }
`;

const StyledNavigation = styled.ul`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 2rem 0;
`;

const MobileButton = ({ items, locale }) => {
  const [displaySection, setDisplaySection] = useState(false);

  const handleReset = () => {
    setDisplaySection(false);
  };

  return (
    <>
      <StyledMobileButton
        onClick={() => setDisplaySection(!displaySection)}
        aria-label={
          locale === "en" ? "Open Navigation Menu" : "Otvorte menu navigacie"
        }
      >
        {displaySection ? <RiCloseLine /> : <RiMenuLine />}
      </StyledMobileButton>
      {displaySection && (
        <StyledMobileContainer>
          <StyledFlex>
            <StyledContainer>
              <StyledNavigation open={displaySection}>
                {items.map((item) => {
                  return (
                    <HeaderMobileDropdown
                      handler={handleReset}
                      key={item.id}
                      locale={locale}
                      en={item.titleEN}
                      sk={item.title}
                      dropdownItems={item.dropdownItems}
                      path={item.path}
                    ></HeaderMobileDropdown>
                  );
                })}
              </StyledNavigation>
            </StyledContainer>
          </StyledFlex>
        </StyledMobileContainer>
      )}
    </>
  );
};

const Header = () => {
  const locale = useRouter().locale;
  const isLargerThan768 = useBetterMediaQuery("(min-width: 768px)");
  return (
    <>
      <Navbar />
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
            {headerItems.map((item) => {
              return <HeaderItem key={item.id} item={item} locale={locale} />;
            })}
          </HeaderContent>
        ) : (
          <MobileButton locale={locale} items={headerItems}></MobileButton>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
