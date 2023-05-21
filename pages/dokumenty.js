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
import { remove as removeAccents } from "remove-accents";
import { useEffect, useState } from "react";
import StyledInputWrapper from "../components/Styled/StyledInputWrapper";

const URL = process.env.STRAPI_URL;
const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

export async function getStaticProps({ locale }) {
  const data = await fetcher(`${URL}/documents?sort=title%3Adesc&populate=*`);
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
  const [titleValue, setNameValue] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState(pageData.data);
  const handleTitleChange = (event) => {
    const inputValue = event.target.value;
    setNameValue(inputValue);
  };
  const filterDocuments = () => {
    const titleFilter = pageData.data.filter((item) => {
      if (locale === "en") {
        return (
          titleValue === "" ||
          removeAccents(item.attributes.titleEN.toLowerCase()).includes(
            removeAccents(titleValue.toLowerCase())
          )
        );
      } else {
        return (
          titleValue === "" ||
          removeAccents(item.attributes.title.toLowerCase()).includes(
            removeAccents(titleValue.toLowerCase())
          )
        );
      }
    });

    setFilteredDocuments(titleFilter);
  };

  useEffect(() => {
    filterDocuments();
  }, [titleValue, locale]);

  const SEO = pageData.data.attributes?.seo;
  const { t } = useTranslation("common");
  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <StyledHeadingH1>{t("documents")}</StyledHeadingH1>
      <StyledInputWrapper>
        <input
          type="text"
          value={titleValue}
          onChange={handleTitleChange}
          placeholder={t("name")}
        />
      </StyledInputWrapper>
      <StyledList>
        {filteredDocuments.map((item) => {
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
