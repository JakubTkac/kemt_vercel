import { fetcher } from "../lib/api";
import styled from "styled-components";
import Notices from "../components/Notices/Notices";
import { SCREENS, WIDTH } from "../Theme";
import Hero from "../components/Hero/Hero";
import News from "../components/News/News";
import Events from "../components/Events/Events";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Seo from "../components/Common/Seo";

const URL = process.env.STRAPI_URL;
const today = new Date().toISOString();

export async function getStaticProps({ locale }) {
  const noticeResponse = await fetcher(
    `${URL}/notices?locale=${locale}&populate=*&sort=date%3Adesc&pagination[limit]=6`
  );
  const newsResponse = await fetcher(
    `${URL}/news?locale=${locale}&populate=*&sort=date%3Adesc&pagination[limit]=3`
  );
  const eventsResponse = await fetcher(
    `${URL}/events?locale=${locale}&populate=*&filters[startingDate][$gt]=${today}&sort=startingDate%3Aasc&pagination[limit]=3`
  );
  return {
    props: {
      locale: locale,
      news: newsResponse,
      notices: noticeResponse,
      events: eventsResponse,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 10,
  };
}

const StyledNewsEventsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: ${SCREENS.LG}) {
    flex-direction: column;
  }
`;
export default function Home({ notices, news, events, locale }) {
  const { t } = useTranslation("common");
  return (
    <>
      <Hero />
      <Notices data={notices} heading={t("notices")} locale={locale} />
      <StyledNewsEventsWrapper>
        <News data={news} heading={t("news")} locale={locale} />
        <Events data={events} heading={t("events")} locale={locale}></Events>
      </StyledNewsEventsWrapper>
    </>
  );
}
