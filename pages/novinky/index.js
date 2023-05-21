import { fetcher } from "../../lib/api";
import { COLOR, FONT_SIZE, SCREENS, SPACE, WIDTH } from "../../Theme";
import styled from "styled-components";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import NewsShowAllPreview from "../../components/News/NewsShowAllPreview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Capitalize } from "../../lib/typography";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Pagination from "../../components/Common/Pagination";

const URL = process.env.STRAPI_URL;
export async function getServerSideProps({ query: { page }, locale }) {
  const newsResponse = await fetcher(
    `${URL}/news?locale=${locale}&populate=*&sort[0]=date%3Adesc&sort[1]=title%3Adesc&pagination[page]=${
      page || 1
    }&pagination[pageSize]=4`
  );
  return {
    props: {
      locale: locale,
      news: newsResponse,
      pagination: newsResponse.meta.pagination,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const StyledNewsWrapper = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 2rem;
  @media (max-width: ${SCREENS.MD}) {
    justify-content: center;
    gap: 1em;
  }
`;

const Index = ({ news, pagination, locale }) => {
  const router = useRouter();
  const { page } = router.query;
  const currentLocale = router.locale;
  const [pageNum, setPageNum] = useState(parseInt(page) || 1);
  const [pageItems, setPageItems] = useState(news);
  const { t } = useTranslation("common");

  useEffect(() => {
    const fetchPageItems = async () => {
      const tempPageItems = await fetcher(
        `${URL}/news?locale=${locale}&populate=*&sort[0]=date%3Adesc&sort[1]=title%3Adesc&pagination[page]=${pageNum}&pagination[pageSize]=${pagination.pageSize}`
      );
      setPageItems(tempPageItems);
    };
    fetchPageItems();
  }, [pageNum, currentLocale]);

  const totalPages = pagination.pageCount;

  const SEO = {
    title: "KEMT - Novinky",
    description: "KEMT - Novinky",
    openGraph: {
      locale: locale,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <StyledHeadingH1>{Capitalize(t("news"))}</StyledHeadingH1>
      <StyledNewsWrapper>
        {pageItems.data.map(({ id, attributes }) => {
          return (
            <NewsShowAllPreview
              key={id}
              date={new Date(attributes.date)}
              title={attributes.title}
              slug={
                locale === "en"
                  ? attributes.localizations.data[0]?.attributes.slug
                  : attributes.slug
              }
              content={attributes.content}
              img={attributes.image.data?.attributes}
            ></NewsShowAllPreview>
          );
        })}
      </StyledNewsWrapper>
      <Pagination
        url={"/novinky/?page="}
        pageNum={pageNum}
        totalPages={totalPages}
        locale={locale}
        setter={setPageNum}
      ></Pagination>
    </>
  );
};

export default Index;
