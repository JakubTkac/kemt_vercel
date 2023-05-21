import { useRouter } from "next/router";
import styled from "styled-components";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHT,
  SCREENS,
  SPACE,
} from "../../Theme";
import Searchbar from "./Searchbar";
import { FiMonitor } from "react-icons/fi";
import { IoIosPeople, IoIosRestaurant } from "react-icons/io";
import { IoLibrary, IoMailSharp, IoSettings } from "react-icons/io5";
import { AiFillPhone } from "react-icons/ai";
import IconLink from "./IconLink";

const StyledBodyNavbar = styled.div`
  border: 1px solid ${COLOR.BLACK};
  border-bottom: 0;
  background-color: ${COLOR.PRI[500]};
`;

const StyledNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
  background-color: ${COLOR.SEC[500]};
  height: ${HEIGHT.XXXS};
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 3.75rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    gap: 0.4rem;
    margin: 0 1.9rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    justify-content: space-between;
    margin: 0 0.25rem;
  }
  @media (max-width: ${SCREENS.SM}) {
    margin: 0 0;
  }
  div {
    display: flex;
  }
`;

const StyledLanguageButton = styled.button`
  font-weight: ${FONT_WEIGHT.REGULAR};
  width: 100%;
  padding: 0 0.5rem;
  background-color: ${COLOR.SEC.DEFAULT};
  color: ${COLOR.WHITE};
  text-align: center;
  min-height: ${HEIGHT.XXXS};
  font-size: ${FONT_SIZE.S};
  border: ${COLOR.SEC[600]} 1px solid;
  @media (max-width: ${SCREENS.XL}) {
    min-height: ${SPACE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    min-height: ${SPACE.L};
  }
  @media (max-width: ${SCREENS.XS}) {
    min-height: ${SPACE.L};
  }
  &:hover {
    background-color: ${COLOR.SEC[300]};
  }
`;

const StyledIconsContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    &:hover {
      background-color: ${COLOR.SEC[300]};
    }
    color: ${COLOR.WHITE};
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.LG}) {
    padding: 0 1rem;
    gap: 1rem;
  }
  @media (max-width: ${SCREENS.SM}) {
    padding: 0 0.5rem;
    gap: 0.5rem;
    svg {
      font-size: ${FONT_SIZE.M};
    }
  }
`;

const Navbar = () => {
  const router = useRouter();
  const locale = router.locale;

  const onChangeLanguage = (lang) => async (e) => {
    await router.push(router.asPath, undefined, {
      locale: lang,
      shallow: false,
    });
    // router.reload();
  };

  return (
    <StyledBodyNavbar>
      <StyledNavbar>
        <div>
          <Searchbar />
        </div>
        <div>
          <StyledIconsContainer>
            <IconLink
              Icon={FiMonitor}
              url={"https://moodle.tuke.sk/"}
              label={
                locale === "en"
                  ? "Visit Moodle.tuke.sk"
                  : "Navštivte Moodle.tuke.sk"
              }
              name={"TUKE Moodle"}
            ></IconLink>
            <IconLink
              Icon={IoIosPeople}
              url={"https://mais.tuke.sk/"}
              label={
                locale === "en"
                  ? "Visit Mais.tuke.sk"
                  : "Navštivte mais.tuke.sk"
              }
              name={"TUKE Mais"}
            ></IconLink>
            <IconLink
              Icon={IoMailSharp}
              url={"https://outlook.office365.com/mail/"}
              label={
                locale === "en"
                  ? "Visit school mail outlook.com"
                  : "Navštivte školský mail outlook.com"
              }
              name={"TUKE Mail"}
            ></IconLink>
            <IconLink
              Icon={AiFillPhone}
              url={"https://zoznam.tuke.sk/"}
              label={
                locale === "en"
                  ? "Visit telephone list zoznam.tuke.sk"
                  : "Navštivte telefonný zoznam zoznam.tuke.sk"
              }
              name={
                locale === "en"
                  ? "TUKE Telephone List"
                  : "TUKE Telefonný Zoznam"
              }
            ></IconLink>
            <IconLink
              Icon={IoIosRestaurant}
              url={"https://jedalen.tuke.sk/"}
              label={
                locale === "en"
                  ? "Visit school canteen jedalen.tuke.sk"
                  : "Navštivte školskú jedaleň jedalen.tuke.sk"
              }
              name={locale === "en" ? "TUKE Canteen" : "TUKE Jedaleň"}
            ></IconLink>
            <IconLink
              Icon={IoLibrary}
              url={"https://www.lib.tuke.sk/#/dashboard"}
              label={
                locale === "en"
                  ? "Visit school library lib.tuke.sk"
                  : "Navštivte školskú knižnicu lib.tuke.sk"
              }
              name={locale === "en" ? "TUKE Library" : "TUKE Knižnica"}
            ></IconLink>
            <IconLink
              Icon={IoSettings}
              url={"https://uvt.tuke.sk/wps/portal/uv/sluzby/nastavenia"}
              label={
                locale === "en"
                  ? "Visit uvt options uvt.tuke.sk"
                  : "Navštivte uvt nastavenia uvt.tuke.sk"
              }
              name={locale === "en" ? "TUKE Options" : "TUKE Nastavenia"}
            ></IconLink>
          </StyledIconsContainer>
          <StyledLanguageButton
            onClick={onChangeLanguage("sk")}
            aria-label={
              locale === "en"
                ? "Change language of website to Slovak"
                : "Zmeňte jazyk stránky na Slovenský"
            }
          >
            SK
          </StyledLanguageButton>
          <StyledLanguageButton
            onClick={onChangeLanguage("en")}
            aria-label={
              locale === "en"
                ? "Change language of website to English"
                : "Zmeňte jazyk stránky na Anglický"
            }
          >
            EN
          </StyledLanguageButton>
        </div>
      </StyledNavbar>
    </StyledBodyNavbar>
  );
};

export default Navbar;
