import { fetcher } from "../lib/api";
import ReactMarkdown from "react-markdown";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Theme, { COLOR } from "../Theme";
import styled from "styled-components";

const URL = process.env.STRAPI_URL;

export async function getStaticProps() {
  const newsResponse = await fetcher(`${URL}/news`);
  return {
    props: {
      news: newsResponse,
    },
  };
}

const StyledMoreButton = styled.text`
  cursor: pointer;
  color: ${COLOR.DANGER};
`;

const StyledPostContainer = styled.div`
  display: flex;
  border: 1px solid black;
  width: 100%;
  min-height: 85.8vh;
  padding: 6rem 36vw;
  flex-direction: column;
`;

export default function ({ news }) {
  const data = news.data.sort((prev, next) => prev.id - next.id);
  return (
    <StyledPostContainer>
      <Heading as="h1" size="xl" mb="2rem">
        Novinky
      </Heading>
      <VStack>
        {data.map((news) => (
          <Box key={news.id} alignItems="start" width="100%">
            <Heading as="h6" size="s">
              {news.attributes.title}
            </Heading>
            <Text fontSize="m" noOfLines={2}>
              {news.attributes.content}
            </Text>
            <Link href={`/novinky/${news.attributes.slug}`}>
              <StyledMoreButton>Čítaj ďalej...</StyledMoreButton>
            </Link>
          </Box>
        ))}
      </VStack>
    </StyledPostContainer>
  );
}
