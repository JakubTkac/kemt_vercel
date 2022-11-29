import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { fetcher } from "../lib/api";
import styled from "styled-components";
import Notices from "../components/Notices";
import { Flex } from "@chakra-ui/react";
import { SCREENS } from "../Theme";

const URL = process.env.STRAPI_URL;

export async function getStaticProps() {
  const noticeResponse = await fetcher(`${URL}/notices`);
  const newsResponse = await fetcher(`${URL}/news`);
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
  justify-content: center;
  align-items: center;
  margin: 0 4rem;
  min-height: 81vh;
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 2em;
    min-height: 88vh;
    align-items: start;
    padding-top: 4rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 0.5em;
    padding-top: 6rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;
export default function Home({ notices, news }) {
  return (
    <LandingContainer>
      <StyledFlex>
        <Notices data={notices} heading="oznamy" />
        <Notices data={news} heading="novinky" />
      </StyledFlex>
    </LandingContainer>
  );
}
