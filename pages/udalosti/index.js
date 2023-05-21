import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, SPACE, WIDTH } from "../../Theme";
import { fetcher } from "../../lib/api";
import EventPreview from "../../components/Events/EventPreview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Capitalize } from "../../lib/typography";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import Pagination from "../../components/Common/Pagination";

const URL = process.env.STRAPI_URL;
const today = new Date().toISOString();
const pagesize = 4;

export async function getServerSideProps({ query: { page }, locale }) {
  const eventsResponse = await fetcher(
    `${URL}/events?locale=${locale}&populate=*&filters[startingDate][$gt]=${today}&sort[0]=startingDate%3Adesc&sort[1]=title%3Adesc%3Aasc&pagination[page]=${
      page || 1
    }&pagination[pageSize]=${pagesize}`
  );
  return {
    props: {
      events: eventsResponse,
      pagination: eventsResponse.meta.pagination,
      locale: locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
const StyledListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
`;

const StyledButtonSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;

const StyledSelectButton = styled.button`
  transition: background-color 0.2s ease;
  width: 12rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: ${(props) =>
    props.selected ? COLOR.PRI[400] : COLOR.SEC[400]};
  color: ${(props) => (props.selected ? COLOR.BLACK : COLOR.WHITE)};
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
    width: 10rem;
  }
  @media (max-width: ${SCREENS.XS}) {
    height: ${SPACE.L};
    font-size: ${FONT_SIZE.S};
    width: 8rem;
  }
  &:hover {
    background-color: ${COLOR.PRI[400]};
    color: ${COLOR.BLACK};
  }
`;

const Index = ({ events, pagination, locale }) => {
  const router = useRouter();
  const { page } = router.query;
  const currentLocale = router.locale;
  const [pageNum, setPageNum] = useState(parseInt(page) || 1);
  const [pageItems, setPageItems] = useState(events);
  const { t } = useTranslation("common");

  useEffect(() => {
    const fetchPageItems = async () => {
      const tempPageItems = await fetcher(
        `${URL}/events?locale=${locale}&populate=*&filters[startingDate][$gt]=${today}&sort[0]=startingDate%3Adesc&sort[1]=title%3Adesc&pagination[page]=${pageNum}&pagination[pageSize]=${pagination.pageSize}`
      );
      setPageItems(tempPageItems);
    };
    fetchPageItems();
  }, [pageNum, currentLocale]);

  const totalPages = pagination.pageCount;

  const handlePageReset = () => {
    router.push(`/udalosti/?page=1`, undefined, {
      shallow: true,
    });
    setPageNum(1);
  };

  const SEO = {
    title: "KEMT - Udalosti",
    description: "KEMT Udalosti",
    openGraph: {
      locale: locale,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <StyledHeadingH1>{Capitalize(t("events"))}</StyledHeadingH1>
      <StyledButtonSelectWrapper>
        <Link href={"/udalosti"} passHref>
          <StyledSelectButton onClick={handlePageReset} selected={true}>
            {t("coming")}
          </StyledSelectButton>
        </Link>
        <Link href={"/udalosti/minule"} passHref>
          <StyledSelectButton selected={false}>{t("past")}</StyledSelectButton>
        </Link>
      </StyledButtonSelectWrapper>
      <StyledListWrapper>
        {pageItems.data.map(({ attributes, id }) => {
          return (
            <EventPreview
              key={id}
              heading={attributes.title}
              slug={
                locale === "en"
                  ? attributes.localizations.data[0]?.attributes.slug
                  : attributes.slug
              }
              startingDate={new Date(attributes.startingDate)}
              endingDate={attributes.endingDate}
              content={attributes.content}
            ></EventPreview>
          );
        })}
      </StyledListWrapper>
      <Pagination
        totalPages={totalPages}
        pageNum={pageNum}
        setter={setPageNum}
        url="/udalosti/?page="
        locale={locale}
      ></Pagination>
    </>
  );
};

export default Index;
