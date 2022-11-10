import { fetcher } from "../lib/api";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import styled from "styled-components";
import { COLOR } from "../Theme";

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

export default function oznamy({ notices }) {
  const data = notices.data.sort((prev, next) => prev.id - next.id);
  return (
    <StyledPostContainer>
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
              <StyledMoreButton>Čítaj ďalej...</StyledMoreButton>
            </Link>
          </Box>
        ))}
      </VStack>
    </StyledPostContainer>
  );
}
