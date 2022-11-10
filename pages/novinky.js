import { fetcher } from "../lib/api";
import ReactMarkdown from "react-markdown";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const URL = process.env.STRAPI_URL;

export async function getStaticProps() {
  const newsResponse = await fetcher(`${URL}/news`);
  return {
    props: {
      news: newsResponse,
    },
  };
}

export default function novinky ({ news }) {
  const data = news.data.sort((prev, next) => prev.id - next.id);
  return (
    <Container mt="2rem" minHeight="81vh">
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
              Čítaj ďalej...
            </Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}
