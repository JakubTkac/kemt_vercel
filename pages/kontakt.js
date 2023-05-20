import { fetcher } from "../lib/api";
import StyledHeadingH1 from "../components/Styled/StyledHeadingH1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, HEIGHT, SCREENS } from "../Theme";
import { useState } from "react";
import Publication from "../components/Publikacie/Publication";
import TranslateTitleWithContent from "../components/Common/TranslateTitleWithContent";
import Seo from "../components/Common/Seo";

const URL = process.env.STRAPI_URL;

export async function getStaticProps({ locale }) {
  const data = await fetcher(`${URL}/contact?populate[seo][populate]=*`);
  return {
    props: {
      pageData: data,
      locale: locale,
      ...(await serverSideTranslations(locale, ["contact"])),
    },
    revalidate: 10,
  };
}

const StyledContainer = styled.div`
  padding: 2rem 0;
  width: 100%;
  height: ${HEIGHT.XXXL};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${SCREENS.XL}) {
    height: ${HEIGHT.XXXL};
  }
  @media (max-width: ${SCREENS.LG}) {
    height: ${HEIGHT.XXL};
  }
  @media (max-width: ${SCREENS.MD}) {
    flex-direction: column;
    height: auto;
  }
  @media (max-width: ${SCREENS.SM}) {
  }
`;

const StyledDiv = styled.div`
  height: 100%;
  @media (max-width: ${SCREENS.MD}) {
    width: 100%;
  }
`;

const StyledMapDiv = styled.div`
  width: 80%;
  height: 100%;
  @media (max-width: ${SCREENS.XL}) {
    width: 70%;
  }
  @media (max-width: ${SCREENS.MD}) {
    width: 100%;
    height: ${HEIGHT.XXXL};
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
  h2 {
    padding-bottom: 0.5rem;
    font-weight: ${FONT_WEIGHT.BOLD};
    font-size: ${FONT_SIZE.M};
    text-decoration: underline;
  }
  span {
    font-weight: ${FONT_WEIGHT.REGULAR};
    font-size: ${FONT_SIZE.S};
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

function Content({ pageData, locale }) {
  const { t } = useTranslation("contact");
  const SEO = pageData.data.attributes?.seo;
  const addressArray = pageData.data.attributes.address.split(",");

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <StyledHeadingH1>{t("title")}</StyledHeadingH1>
      <StyledContainer>
        <StyledDiv>
          <StyledContent>
            <h2>{t("address")}</h2>
            {addressArray.map((addressPart, index) => (
              <span key={index}>{addressPart}</span>
            ))}
          </StyledContent>
          <StyledContent>
            <h2>{t("phone")}</h2>
            <a href={`tel: ${pageData.data.attributes.phoneNumber}`}>
              <span>{pageData.data.attributes.phoneNumber}</span>
            </a>
          </StyledContent>
          <StyledContent>
            <h2>Fax:</h2>
            <span>{pageData.data.attributes.fax}</span>
          </StyledContent>
          <StyledContent>
            <h2>E-mail:</h2>
            <a href={`mailto: ${pageData.data.attributes.email}`}>
              <span>{pageData.data.attributes.email}</span>
            </a>
          </StyledContent>
        </StyledDiv>
        <StyledMapDiv>
          <StyledIframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d358.7393511512147!2d21.2442232053926!3d48.72987613765806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ee058aa1cb253%3A0x6816c28c7a6d0603!2sKatedra%20KEMT%20FEI!5e0!3m2!1ssk!2ssk!4v1683634903473!5m2!1ssk!2ssk"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></StyledIframe>
        </StyledMapDiv>
      </StyledContainer>
    </>
  );
}

export default Content;
