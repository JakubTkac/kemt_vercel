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

export async function getStaticProps({ locale }) {
  const data = await fetcher(
    `${URL}/annual-reports?sort=title%3Adesc&populate=*`
  );
  return {
    props: {
      pageData: data,
      locale: locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 10,
  };
}

function Content({ pageData, locale }) {
  const { t } = useTranslation("common");
  const SEO = pageData.data.attributes?.seo;

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <StyledHeadingH1>{t("annualReports")}</StyledHeadingH1>
      <StyledList>
        {pageData.data.map((item) => {
          return (
            <TranslateComponent
              key={item.id}
              Component={DocumentPDF}
              locale={locale}
              sk={item.attributes.title}
              url={`${imgURL}${item.attributes.pdf.data.attributes.url}`}
            ></TranslateComponent>
          );
        })}
      </StyledList>
    </>
  );
}

export default Content;
