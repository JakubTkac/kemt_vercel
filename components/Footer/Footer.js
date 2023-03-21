import styled from "styled-components";
import { COLOR, FONT_SIZE, HEIGHT, SCREENS } from "../../Theme";
import { Flex } from "@chakra-ui/react";
import { footerItems } from "./FooterItems";

const StyledFooterContainer = styled.div`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: ${HEIGHT.S};
  flex-direction: row;
  background-color: ${COLOR.FEI_PRIMARY};
  @media (max-width: ${SCREENS.XL}) {
    height: ${HEIGHT.XS};
  }
`;

const StyledFooterParagraph = styled.p`
  text-align: center;
  font-size: ${FONT_SIZE.M};
  @media (max-width: ${SCREENS.LG}) {
    font-size: ${FONT_SIZE.S};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.XS};
  }
`;

const StyledFooterNav = styled.div`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: ${HEIGHT.L};
  flex-direction: row;
  background-color: ${COLOR.FEI_PRIMARY};
  padding: 0 15rem;
`;

const StyledFooterNavContent = styled.ul`
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0 5rem;
`;

const StyledFooterItem = styled.li`
  height: 100%;
  width: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZE.M};
`;

const Footer = () => {
  return (
    <>
      {/*<StyledFooterNav>*/}
      {/*  {footerItems.map((footerLu) => {*/}
      {/*    return (*/}
      {/*      <StyledFooterNavContent key={footerItems.id}>*/}
      {/*        {footerLu.data.map((footerLi) => {*/}
      {/*          return (*/}
      {/*            <StyledFooterItem key={footerLi.id}>*/}
      {/*              {footerLi.title}*/}
      {/*            </StyledFooterItem>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </StyledFooterNavContent>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</StyledFooterNav>*/}
      <StyledFooterContainer>
        <Flex alignItems="center" justifyContent="center" width="100%">
          <StyledFooterParagraph>
            © 2022 Technická univerzita v Košiciach. Všetky práva vyhradené.
          </StyledFooterParagraph>
        </Flex>
      </StyledFooterContainer>
    </>
  );
};

export default Footer;
