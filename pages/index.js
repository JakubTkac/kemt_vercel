import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { fetcher } from "../lib/api";
import styled from "styled-components";
import Notices from "../components/Notices";
import { Flex } from "@chakra-ui/react";

const URL = process.env.STRAPI_URL;

// export async function getStaticProps() {
//   const noticeResponse = await fetcher(`${URL}/notices`);
//   const newsResponse = await fetcher(`${URL}/news`);
//   return {
//     props: {
//       news: newsResponse,
//       notices: noticeResponse,
//     },
//   };
// }

const LandingContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default function Home({ notices, news }) {
  return (
    <LandingContainer>
      <Flex
        align="top"
        justifyContent="center"
        alignItems="center"
        mx="4rem"
        minHeight="81vh"
      >
        <Notices data={notices} heading="oznamy" />
        <Notices data={news} heading="novinky" />
      </Flex>
    </LandingContainer>
  );
}
