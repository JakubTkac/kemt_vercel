import styled from "styled-components";
import Link from "next/link";
import { COLOR, HEIGHT, SCREENS } from "../../Theme";

const DropdownContainer = styled.div`
  border: 1px solid ${COLOR.FEI_PRIMARY};
  align-items: start;
  display: flex;

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

const HeaderDropdown = ({ dropdownItems }) => {
  return (
    <DropdownContainer>
      <DropdownList>
        {dropdownItems.map((item) => {
          return (
            <DropdownItem key={item.id}>
              <Link href={item.path}>{item.title}</Link>
            </DropdownItem>
          );
        })}
      </DropdownList>
    </DropdownContainer>
  );
};

export default HeaderDropdown;
