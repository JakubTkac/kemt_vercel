import { fetcher } from "../lib/api";
import ReactMarkdown from "react-markdown";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Theme, { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS, SPACE } from "../Theme";
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

const StyledFlex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  margin: 6rem 10rem;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  @media (max-width: ${SCREENS.XL}) {
    margin: 4rem 6rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 2rem 4rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 2rem;
  }
`;

const StyledHeading = styled.h1`
  font-size: ${FONT_SIZE.XL};
  width: 100%;
  padding-bottom: 1.5rem;
  font-weight: ${FONT_WEIGHT.BOLD};
  @media (max-width: ${SCREENS.LG}) {
    padding-bottom: 1rem;
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.L};
  }
`;

const StyledMoreButton = styled.text`
  cursor: pointer;
  color: ${COLOR.DANGER};
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.XS};
  }
`;

const StyledVerticalStack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: start;
  justify-items: start;
`;

const StyledSubHeading = styled.h2`
  font-size: ${FONT_SIZE.M};
  font-weight: ${FONT_WEIGHT.BOLDER};
  padding-top: 1rem;
  @media (max-width: ${SCREENS.XL}) {
    font-size: ${FONT_SIZE.S};
    padding-top: 0.6rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.M};
    padding-top: 0.6rem;
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.S};
    padding-top: 0.6rem;
  }
`;

const StyledDate = styled.span`
  font-weight: ${FONT_WEIGHT.LIGHT};
  color: ${COLOR.DARKGRAY};
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.XS};
  }
`;

const StyledText = styled.p`
  font-size: ${FONT_SIZE.S};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  @media (max-width: ${SCREENS.LG}) {
    font-size: ${FONT_SIZE.XS};
  }
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.XS};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.XS};
  }
`;

const StyledWrapper = styled.div``;

export default function novinky({ news }) {
  const data = news.data.sort((prev, next) => prev.id - next.id);
  return (
    <StyledFlex>
      <StyledContainer>
        <StyledHeading>Novinky</StyledHeading>
        <StyledVerticalStack>
          {data.map((news) => (
            <StyledWrapper key={news.id}>
              <StyledSubHeading>{news.attributes.title}</StyledSubHeading>
              <StyledDate>{news.attributes.date}</StyledDate>
              <StyledText>{news.attributes.content}</StyledText>
              <Link href={`/novinky/${news.attributes.slug}`}>
                <StyledMoreButton>Čítaj ďalej...</StyledMoreButton>
              </Link>
            </StyledWrapper>
          ))}
        </StyledVerticalStack>
      </StyledContainer>
    </StyledFlex>
  );
}
