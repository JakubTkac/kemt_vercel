import { fetcher } from "../lib/api";
import StyledHeadingH1 from "../components/Styled/StyledHeadingH1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, HEIGHT } from "../Theme";
import { useState } from "react";
import Publication from "../components/Publikacie/Publication";
import Seo from "../components/Common/Seo";

const URL = process.env.STRAPI_URL;

export async function getStaticProps({ locale }) {
  const data = await fetcher(`${URL}/projects?sort=title%3Aasc&populate=*`);
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
  margin-top: 3rem;
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

  const [filter, setFilter] = useState("all");
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPublications =
    filter === "all"
      ? pageData.data
      : pageData.data.filter((project) => {
          return project.attributes.typeEN === filter;
        });

  const SEO = pageData.data.attributes?.seo;

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <StyledHeadingH1>{t("projects")}</StyledHeadingH1>
      <StyledPublicationsWrapper>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">{t("all")}</option>
          <option value="Active">{t("active")}</option>
          <option value="Finished">{t("finished")}</option>
        </select>
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
