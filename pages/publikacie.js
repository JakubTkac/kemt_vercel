import { fetcher } from "../lib/api";
import StyledHeadingH1 from "../components/Styled/StyledHeadingH1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, HEIGHT } from "../Theme";
import { useEffect, useState } from "react";
import Publication from "../components/Publikacie/Publication";
import Seo from "../components/Common/Seo";
import { remove as removeAccents } from "remove-accents";
import StyledInputWrapper from "../components/Styled/StyledInputWrapper";

const URL = process.env.STRAPI_URL;

export async function getStaticProps({ locale }) {
  const data = await fetcher(
    `${URL}/publications?sort=title%3Aasc&populate=*&pagination[limit]=200`
  );
  return {
    props: {
      pageData: data,
      locale: locale,
      ...(await serverSideTranslations(locale, ["publications"])),
    },
    revalidate: 10,
  };
}

const StyledPublicationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  select {
    background-color: ${COLOR.WHITE};
    border: 1.5px solid ${COLOR.PLATINUM[600]};
    min-height: ${HEIGHT.XS};
    margin-bottom: 1rem;
    padding: 0 1.5em;
    font-size: ${FONT_SIZE.M};
    font-weight: ${FONT_WEIGHT.BOLD};
  }
`;

const StyledWrapper = styled.div`
  display: flex;

  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid ${COLOR.PLATINUM[600]};
  margin-bottom: 2rem;
`;

function Content({ pageData, locale }) {
  const { t } = useTranslation("publications");

  const SEO = pageData.data.attributes?.seo;

  const [yearValue, setYearValue] = useState("");
  const [titleValue, setNameValue] = useState("");
  const [authorValue, setauthorValue] = useState("");
  const [publisherValue, setPublisherValue] = useState("");
  const [isbnValue, setIsbnValue] = useState("");
  const [doiValue, setDoiValue] = useState("");
  const [filteredPublications, setFilteredPublications] = useState(
    pageData.data
  );

  const handleYearChange = (event) => {
    const inputValue = event.target.value;
    setYearValue(inputValue);
  };
  const handleTitleChange = (event) => {
    const inputValue = event.target.value;
    setNameValue(inputValue);
  };
  const handleAuthorChange = (event) => {
    const inputValue = event.target.value;
    setauthorValue(inputValue);
  };
  const handlePublisherChange = (event) => {
    const inputValue = event.target.value;
    setPublisherValue(inputValue);
  };
  const handleIsbnChange = (event) => {
    const inputValue = event.target.value;
    setIsbnValue(inputValue);
  };
  const handleDoiChange = (event) => {
    const inputValue = event.target.value;
    setDoiValue(inputValue);
  };

  const filterPublications = () => {
    const yearFilter = pageData.data.filter((item) => {
      return yearValue === "" || item.attributes.year === parseInt(yearValue);
    });
    const titleFilter = yearFilter.filter((item) => {
      return (
        titleValue === "" ||
        removeAccents(item.attributes.title.toLowerCase()).includes(
          removeAccents(titleValue.toLowerCase())
        )
      );
    });
    const authorFilter = titleFilter.filter((item) => {
      if (authorValue === "") {
        return titleFilter;
      }
      return (
        item.attributes?.authors.data?.some((author) => {
          return removeAccents(author.attributes.name.toLowerCase()).includes(
            removeAccents(authorValue.toLowerCase())
          );
        }) ||
        item.attributes?.authorsOther.some((author) => {
          return removeAccents(author.name.toLowerCase()).includes(
            removeAccents(authorValue.toLowerCase())
          );
        })
      );
    });
    const publisherFilter = authorFilter.filter((item) => {
      return (
        publisherValue === "" ||
        removeAccents(item.attributes.publisher.toLowerCase()).includes(
          removeAccents(publisherValue.toLowerCase())
        )
      );
    });
    const isbnFilter = publisherFilter.filter((item) => {
      if (isbnValue === "") {
        return publisherFilter;
      }
      if (item.attributes.isbn === null) {
        return false;
      }
      return (
        isbnValue === "" ||
        removeAccents(item.attributes.isbn.toLowerCase()).includes(
          removeAccents(isbnValue.toLowerCase())
        )
      );
    });
    const doiFilter = isbnFilter.filter((item) => {
      if (doiValue === "") {
        return isbnFilter;
      }
      if (item.attributes.doi === null) {
        return false;
      }
      return (
        doiValue === "" ||
        removeAccents(item.attributes.doi.toLowerCase()).includes(
          removeAccents(doiValue.toLowerCase())
        )
      );
    });
    setFilteredPublications(doiFilter);
  };
  useEffect(() => {
    filterPublications();
  }, [
    titleValue,
    authorValue,
    yearValue,
    locale,
    publisherValue,
    isbnValue,
    doiValue,
  ]);

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <StyledHeadingH1>{t("publications")}</StyledHeadingH1>
      <StyledInputWrapper>
        <input
          type="text"
          value={titleValue}
          onChange={handleTitleChange}
          placeholder={t("name")}
        />
        <input
          type="number"
          value={yearValue}
          onChange={handleYearChange}
          placeholder={t("year")}
        />
        <input
          type="text"
          value={authorValue}
          onChange={handleAuthorChange}
          placeholder={t("authors")}
        />
        <input
          type="text"
          value={publisherValue}
          onChange={handlePublisherChange}
          placeholder={t("publisher")}
        />
        <input
          type="text"
          value={isbnValue}
          onChange={handleIsbnChange}
          placeholder="ISBN:"
        />
        <input
          type="text"
          value={doiValue}
          onChange={handleDoiChange}
          placeholder="DOI:"
        />
      </StyledInputWrapper>
      <StyledPublicationsWrapper>
        <StyledWrapper>
          {filteredPublications.map((publication, index) => {
            return (
              <Publication
                key={index}
                locale={locale}
                attributes={publication.attributes}
              ></Publication>
            );
          })}
        </StyledWrapper>
      </StyledPublicationsWrapper>
    </>
  );
}

export default Content;
