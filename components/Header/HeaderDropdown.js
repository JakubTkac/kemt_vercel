import styled from "styled-components";
import Link from "next/link";
import { COLOR, HEIGHT, SCREENS } from "../../Theme";
import TranslateComponent from "../Common/TranslateComponent";

const DropdownContainer = styled.div`
  border: 1px solid ${COLOR.FEI_PRIMARY};
  align-items: start;
  display: flex;
  z-index: 10;
  /* gap: 2rem;
  padding-left: 2rem; */
  top: ${HEIGHT.S};
  position: absolute;
  width: 15%;
  height: auto;
  flex-direction: column;
  @media (max-width: ${SCREENS.XL}) {
    top: ${HEIGHT.XS};
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
`;

const DropdownItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 3rem;
  width: auto;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.GRAY};
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
