import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { fetcher } from "../lib/api";
import styled from "styled-components";
import Notices from "../components/Notices/Notices";
import { Flex } from "@chakra-ui/react";
import { SCREENS, WIDTH } from "../Theme";
import Hero from "../components/Hero/Hero";
import News from "../components/News/News";
import Events from "../components/Events/Events";

const URL = process.env.STRAPI_URL;
const today = new Date().toISOString();

export async function getServerSideProps({ locale }) {
  const noticeResponse = await fetcher(
    `${URL}/notices?locale=${locale}&sort=date%3Adesc&pagination[limit]=6`
  );
  const newsResponse = await fetcher(
    `${URL}/news?locale=${locale}&populate=*&sort=date%3Adesc&pagination[limit]=3`
  );
  const eventsResponse = await fetcher(
    `${URL}/events?locale=sk&filters[startingDate][$gt]=${today}&sort=startingDate%3Aasc&pagination[limit]=3`
  );
  return {
    props: {
      locale: locale,
      news: newsResponse,
      notices: noticeResponse,
      events: eventsResponse,
    },
  };
}

const LandingContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 85.8vh;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 ${WIDTH.XXS};
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 ${WIDTH.XXXXXS};
    align-items: start;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 ${WIDTH.XXXXXXS};
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0 ${WIDTH.MOBILE};
    flex-direction: column;
  }
`;

const StyledNewsEventsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: ${SCREENS.LG}) {
    flex-direction: column;
  }
`;
export default function Home({ notices, news, events, locale }) {
  return (
    <LandingContainer>
      <StyledFlex>
        <Hero />
        <Notices data={notices} heading="oznamy" locale={locale} />
        <StyledNewsEventsWrapper>
          <News data={news} heading="novinky" locale={locale} />
          <Events data={events} heading="udalosti" locale={locale}></Events>
        </StyledNewsEventsWrapper>
      </StyledFlex>
    </LandingContainer>
  );
}
