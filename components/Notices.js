import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { COLOR, HEIGHT, SPACE } from "../Theme";
import styled from "styled-components";

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const StyledShowAllButton = styled.button`
  width: 100%;
  margin: 2rem 0;
  background-color: ${COLOR.FEI_PRIMARY};
  color: ${COLOR.BLACK};
  text-align: center;
  height: ${SPACE.XL};
  border: black 1px solid;
  border-radius: 5px;
`;

const StyledMoreButton = styled.text`
  cursor: pointer;
  color: ${COLOR.DANGER};
`;

const Notices = (props) => {
  return (
    <Container maxW="md" m="3rem" justifyContent="start" alignItems="start">
      <Heading as="h1" size="xl" pb="2rem">
        {Capitalize(props.heading)}
      </Heading>
      <VStack justifyContent="start" alignItems="start">
        {props.data.data.slice(0, 3).map((notice) => (
          <Box key={notice.id}>
            <Heading as="h6" size="s" pb="1rem">
              {notice.attributes.title}
            </Heading>
            <Text>{notice.attributes.date}</Text>
            <Text fontSize="m" noOfLines={2}>
              {notice.attributes.content}
            </Text>
            <Link
              href={`/${props.heading}/${
                props.data.data[notice.id - 1].attributes.slug
              }`}
            >
              <StyledMoreButton color={COLOR.DANGER}>
                Zobraziť viac...
              </StyledMoreButton>
            </Link>
          </Box>
        ))}
      </VStack>
      <Link href={props.heading}>
        <StyledShowAllButton>
          Zobraziť všetky {props.heading}
        </StyledShowAllButton>
      </Link>
    </Container>
  );
};

export default Notices;
