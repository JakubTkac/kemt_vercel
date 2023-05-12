import { fetcher } from "../lib/api";
import StyledHeadingH1 from "../components/Styled/StyledHeadingH1";
import TranslateComponent from "../components/Common/TranslateComponent";
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../Theme";
import DocumentPDF from "../components/Common/DocumentPDF";
import StyledList from "../components/Styled/StyledList";
import Seo from "../components/Common/Seo";

const URL = process.env.STRAPI_URL;
const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  const data = await fetcher(`${URL}/documents?sort=title%3Adesc&populate=*`);
  return {
    props: {
      pageData: data,
      locale: locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

function Content({ pageData, locale }) {
  const SEO = pageData.data.attributes?.seo;
  const { t } = useTranslation("common");
  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <StyledHeadingH1>{t("documents")}</StyledHeadingH1>
      <StyledList>
        {pageData.data.map((item) => {
          return (
            <TranslateComponent
              key={item.id}
              Component={DocumentPDF}
              locale={locale}
              sk={item.attributes.title}
              en={item.attributes.titleEN}
              url={`${imgURL}${item.attributes.document.data.attributes.url}`}
            ></TranslateComponent>
          );
        })}
      </StyledList>
    </>
  );
}

export default Content;
