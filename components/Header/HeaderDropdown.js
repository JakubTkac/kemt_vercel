import styled from "styled-components";
import Link from "next/link";
import { COLOR, FONT_WEIGHT, HEIGHT, SCREENS } from "../../Theme";
import TranslateComponent from "../Common/TranslateComponent";

const DropdownContainer = styled.div`
  border: 1px ${COLOR.PLATINUM[600]} solid;
  align-items: start;
  display: flex;
  z-index: 10;
  /* gap: 2rem;
  padding-left: 2rem; */
  top: ${HEIGHT.DropdownBigger};
  position: absolute;
  width: 15%;
  height: auto;
  flex-direction: column;
  @media (max-width: ${SCREENS.XL}) {
    top: ${HEIGHT.DropdownSmaller};
    width: 20%;
  }
  @media (max-width: ${SCREENS.LG}) {
    width: 25%;
  }
`;

const DropdownList = styled.ul`
  list-style-type: none;
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${COLOR.WHITE};
  border: 1px ${COLOR.PLATINUM[600]} solid;
`;

const DropdownItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 3rem;
  width: auto;
  cursor: pointer;
  color: ${COLOR.BLACK};
  font-weight: ${FONT_WEIGHT.BOLD};
  &:hover {
    background-color: ${COLOR.SEC[50]};
  }
`;

const HeaderDropdown = ({ dropdownItems, locale }) => {
  return (
    <DropdownContainer>
      <DropdownList>
        {dropdownItems.map((item) => {
          return (
            <Link href={item.path} key={item.id}>
              <a>
                <TranslateComponent
                  Component={DropdownItem}
                  locale={locale}
                  sk={item.title}
                  en={item.titleEN}
                ></TranslateComponent>
              </a>
            </Link>
          );
        })}
      </DropdownList>
    </DropdownContainer>
  );
};

export default HeaderDropdown;
