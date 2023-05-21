import { fetcher } from "../lib/api";
import StyledHeadingH1 from "../components/Styled/StyledHeadingH1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, HEIGHT } from "../Theme";
import { useEffect, useState } from "react";
import Publication from "../components/Publikacie/Publication";
import Seo from "../components/Common/Seo";
import StyledInputWrapper from "../components/Styled/StyledInputWrapper";
import { remove as removeAccents } from "remove-accents";

const URL = process.env.STRAPI_URL;

export async function getStaticProps({ locale }) {
  const data = await fetcher(
    `${URL}/projects?sort=title%3Aasc&populate=*&pagination[limit]=200`
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

  const [titleValue, setNameValue] = useState("");
  const [authorValue, setauthorValue] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(pageData.data);
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleTitleChange = (event) => {
    const inputValue = event.target.value;
    setNameValue(inputValue);
  };
  const handleAuthorChange = (event) => {
    const inputValue = event.target.value;
    setauthorValue(inputValue);
  };
  const filterProjects = () => {
    const typeFilter =
      filter === "all"
        ? pageData.data
        : pageData.data.filter(
            (project) => project.attributes.typeEN === filter
          );

    const titleFilter = typeFilter.filter((item) => {
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
    setFilteredProjects(authorFilter);
  };
  useEffect(() => {
    filterProjects();
  }, [filter, titleValue, authorValue, locale]);

  const SEO = pageData.data.attributes?.seo;

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <StyledHeadingH1>{t("projects")}</StyledHeadingH1>
      <StyledInputWrapper>
        <input
          type="text"
          value={titleValue}
          onChange={handleTitleChange}
          placeholder={t("name")}
        />
        <input
          type="text"
          value={authorValue}
          onChange={handleAuthorChange}
          placeholder={t("authors")}
        />
      </StyledInputWrapper>
      <StyledPublicationsWrapper>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">{t("all")}</option>
          <option value="Active">{t("active")}</option>
          <option value="Finished">{t("finished")}</option>
        </select>
        <StyledWrapper>
          {filteredProjects.map((project, index) => {
            return (
              <Publication
                key={index}
                locale={locale}
                attributes={project.attributes}
              ></Publication>
            );
          })}
        </StyledWrapper>
      </StyledPublicationsWrapper>
    </>
  );
}

export default Content;
