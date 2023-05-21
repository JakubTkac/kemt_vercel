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
import StyledInputWrapper from "../components/Styled/StyledInputWrapper";
import { remove as removeAccents } from "remove-accents";
import { useEffect, useState } from "react";

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

  const [titleValue, setTitleValue] = useState("");
  const [filteredAnnualReports, setFilteredAnnualReports] = useState(
    pageData.data
  );

  const handleTitleChange = (event) => {
    const inputValue = event.target.value;
    setTitleValue(inputValue);
  };

  const filterAnnualReports = () => {
    const titleFilter = pageData.data.filter((item) => {
      return (
        titleValue === "" ||
        removeAccents(item.attributes.title.toLowerCase()).includes(
          removeAccents(titleValue.toLowerCase())
        )
      );
    });
    setFilteredAnnualReports(titleFilter);
  };
  useEffect(() => {
    filterAnnualReports();
  }, [titleValue, locale]);

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <StyledHeadingH1>{t("annualReports")}</StyledHeadingH1>
      <StyledInputWrapper>
        <input
          type="text"
          value={titleValue}
          onChange={handleTitleChange}
          placeholder={t("name")}
        />
      </StyledInputWrapper>
      <StyledList>
        {filteredAnnualReports.map((item) => {
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
