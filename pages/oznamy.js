import { fetcher } from "../lib/api";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const URL = process.env.STRAPI_URL;

export async function getStaticProps() {
  const slug = "notices";
  const noticeResponse = await fetcher(`${URL}/notices`);
  return {
    props: {
      notices: noticeResponse,
    },
  };
}

export default function ({ notices }) {
  const data = notices.data.sort((prev, next) => prev.id - next.id);
  return (
    <Container minHeight="81vh" mt="2rem">
      <Heading as="h1" size="xl" mb="2rem">
        Oznamy
      </Heading>
      <VStack alignItems="start" justifyContent="start">
        {data.map((notice) => (
          <Box key={notice.id} alignItems="start" justifyContent="start">
            <Heading as="h6" size="s">
              {notice.attributes.title}
            </Heading>
            <Text fontSize="m" noOfLines={2}>
              {notice.attributes.content}
            </Text>
            <Link href={`/oznamy/${notice.attributes.slug}`}>
              Čítaj ďalej...
            </Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}
