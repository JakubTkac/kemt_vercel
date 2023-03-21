import Link from "next/link";
import styled from "styled-components";
import { COLOR, SCREENS, SPACE } from "../Theme";
import { OrganizaciaItems } from "../components/Organizacia/OrganizaciaItems";

const StyledFlex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  margin: 6rem 10rem;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  @media (max-width: ${SCREENS.XL}) {
    margin: 4rem 6rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 2rem 4rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 2rem;
  }
`;

const StyledShowAllButton = styled.button`
  width: 100%;
  margin: 2rem 0;
  background-color: ${COLOR.FEI_PRIMARY};
  color: ${COLOR.BLACK};
  text-align: center;
  height: ${SPACE.XL};
  border: black 1px solid;
  border-radius: 5px;
  @media (max-width: ${SCREENS.XL}) {
    height: ${SPACE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    height: ${SPACE.XL};
  }
  @media (max-width: ${SCREENS.XS}) {
    height: ${SPACE.L};
  }
`;

const Organizacia = () => {
  return (
    <>
      <StyledFlex>
        <StyledContainer>
          {OrganizaciaItems.map(({ slug, id, title }) => {
            return (
              <Link href={`/organizacia/${slug}`} id={id} key={id}>
                <StyledShowAllButton>{title}</StyledShowAllButton>
              </Link>
            );
          })}
        </StyledContainer>
      </StyledFlex>
    </>
  );
};

export default Organizacia;
