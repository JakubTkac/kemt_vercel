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

const URL = process.env.STRAPI_URL;
export async function getServerSideProps({ query: { page }, locale }) {
  const newsResponse = await fetcher(
    `${URL}/news?locale=${locale}&populate=*&sort=date%3Adesc&pagination[page]=${
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
  margin-top: 3rem;
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

const StyledPaginationButton = styled.button`
  width: 16rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: ${COLOR.SEC.DEFAULT};
  color: ${COLOR.WHITE};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${FONT_SIZE.M};
  height: ${SPACE.XL};
  border: ${COLOR.SEC[600]} 1px solid;
  @media (max-width: ${SCREENS.XL}) {
    height: ${SPACE.L};
    width: 12rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    height: ${SPACE.XL};
    width: 8rem;
  }
  @media (max-width: ${SCREENS.XS}) {
    height: ${SPACE.L};
    font-size: ${FONT_SIZE.S};
    width: 6rem;
  }
  &:hover {
    background-color: ${COLOR.SEC[300]};
  }
  &:disabled {
    color: ${COLOR.BLACK};
    background-color: ${COLOR.SEC[50]};
    cursor: not-allowed;
  }
\`;
`;
const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;
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
        `${URL}/news?locale=${locale}&populate=*&sort=date%3Adesc&pagination[page]=${pageNum}&pagination[pageSize]=${pagination.pageSize}`
      );
      setPageItems(tempPageItems);
    };
    fetchPageItems();
  }, [pageNum, currentLocale]);

  const totalPages = pagination.pageCount;

  const handlePrevClick = () => {
    if (pageNum > 1) {
      router.push(`/novinky/?page=${pageNum - 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNum < totalPages) {
      router.push(`/novinky/?page=${pageNum + 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum + 1);
    }
  };

  return (
    <>
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
      <StyledButtonWrapper>
        <StyledPaginationButton
          onClick={handlePrevClick}
          disabled={pageNum === 1}
        >
          {t("previous")}
        </StyledPaginationButton>
        <StyledPaginationButton
          onClick={handleNextClick}
          disabled={pageNum === totalPages}
        >
          {t("next")}
        </StyledPaginationButton>
      </StyledButtonWrapper>
    </>
  );
};

export default Index;
