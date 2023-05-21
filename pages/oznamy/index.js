import { fetcher } from "../../lib/api";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, SPACE, WIDTH } from "../../Theme";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import NoticeShowAllPreview from "../../components/Notices/NoticeShowAllPreview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Capitalize } from "../../lib/typography";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import Pagination from "../../components/Common/Pagination";

const URL = process.env.STRAPI_URL;
const pagesize = 5;

export async function getServerSideProps({ query: { page }, locale }) {
  const noticeResponse = await fetcher(
    `${URL}/notices?locale=${locale}&populate=*&sort[0]=date%3Adesc&sort[1]=title%3Adesc&pagination[page]=${
      page || 1
    }&pagination[pageSize]=${pagesize}`
  );
  return {
    props: {
      locale: locale,
      notices: noticeResponse,
      pagination: noticeResponse.meta.pagination,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const StyledNoticesWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2em;
`;

function Index({ notices, pagination, locale }) {
  const router = useRouter();
  const currentLocale = router.locale;
  const { page } = router.query;
  const [pageNum, setPageNum] = useState(parseInt(page) || 1);
  const [pageItems, setPageItems] = useState(notices);
  const { t } = useTranslation("common");

  useEffect(() => {
    const fetchPageItems = async () => {
      const tempPageItems = await fetcher(
        `${URL}/notices?locale=${locale}&populate=*&sort[0]=date%3Adesc&sort[1]=title%3Adesc&pagination[page]=${pageNum}&pagination[pageSize]=${pagination.pageSize}`
      );
      setPageItems(tempPageItems);
    };
    fetchPageItems();
  }, [pageNum, currentLocale]);

  const totalPages = pagination.pageCount;

  const handlePrevClick = () => {
    if (pageNum > 1) {
      router.push(`/oznamy/?page=${pageNum - 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNum < totalPages) {
      router.push(`/oznamy/?page=${pageNum + 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum + 1);
    }
  };

  const SEO = {
    title: "KEMT - Študijné Oznamy",
    description: "KEMT - Študijné Oznamy",
    openGraph: {
      locale: locale,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <StyledHeadingH1>{Capitalize(t("notices"))}</StyledHeadingH1>
      <StyledNoticesWrapper>
        {pageItems.data?.map(({ id, attributes }) => {
          return (
            <NoticeShowAllPreview
              key={id}
              date={new Date(attributes.date)}
              title={attributes.title}
              slug={
                locale === "en"
                  ? attributes.localizations.data[0]?.attributes.slug
                  : attributes.slug
              }
              content={attributes.content}
            ></NoticeShowAllPreview>
          );
        })}
      </StyledNoticesWrapper>
      <Pagination
        locale={locale}
        pageNum={pageNum}
        totalPages={totalPages}
        url={"/oznamy/?page="}
        setter={setPageNum}
      ></Pagination>
    </>
  );
}

export default Index;
