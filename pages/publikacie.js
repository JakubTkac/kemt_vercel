import { fetcher } from "../lib/api";
import StyledHeadingH1 from "../components/Styled/StyledHeadingH1";
import TranslateComponent from "../components/Common/TranslateComponent";
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../Theme";
import DocumentPDF from "../components/Common/DocumentPDF";
import StyledList from "../components/Styled/StyledList";

const URL = process.env.STRAPI_URL;
const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  const data = await fetcher(`${URL}/publications?sort=title%3Aasc&populate=*`);
  return {
    props: {
      pageData: data,
      locale: locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

function Content({ pageData, locale }) {
  const { t } = useTranslation("common");
  console.log(pageData);
  return (
    <>
      <StyledHeadingH1>{t("annualReports")}</StyledHeadingH1>
      <StyledList></StyledList>
    </>
  );
}

export default Content;
