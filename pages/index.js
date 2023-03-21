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

const URL = process.env.STRAPI_URL;

export async function getStaticProps() {
  const noticeResponse = await fetcher(`${URL}/notices`);
  const newsResponse = await fetcher(`${URL}/news?populate=*`);
  return {
    props: {
      news: newsResponse,
      notices: noticeResponse,
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
    margin: 0 ${WIDTH.XS};
    align-items: start;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 ${WIDTH.XXXXS};
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0 ${WIDTH.MOBILE};
    flex-direction: column;
  }
`;
export default function Home({ notices, news }) {
  return (
    <LandingContainer>
      <StyledFlex>
        <Hero />
        <Notices data={notices} heading="oznamy" />
        <News data={news} heading="novinky" />
      </StyledFlex>
    </LandingContainer>
  );
}
