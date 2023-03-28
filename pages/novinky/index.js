import { fetcher } from "../../lib/api";
import Link from "next/link";
import Theme, { COLOR, SCREENS, WIDTH } from "../../Theme";
import styled from "styled-components";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import NewsShowAllPreview from "../../components/News/NewsShowAllPreview";
import NewsPreview from "../../components/News/NewsPreview";

const URL = process.env.STRAPI_URL;

export async function getServerSideProps() {
  const newsResponse = await fetcher(
    `${URL}/news?populate=*&pagination[page]=1&pagination[pageSize]=10`
  );
  return {
    props: {
      news: newsResponse,
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
  width: 100%;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
`;

const StyledNewsWrapper = styled.ul`
  margin-top: 3rem;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 2rem;
  @media (max-width: ${SCREENS.SM}) {
    justify-content: center;
    gap: 1em;
  }
`;

export default function index({ news }) {
  console.log(news);
  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledHeadingH1>Novinky</StyledHeadingH1>
          <StyledNewsWrapper>
            {news.data.map(({ id, attributes }) => {
              console.log(attributes);
              return (
                <NewsShowAllPreview
                  key={id}
                  date={new Date(attributes.date)}
                  title={attributes.title}
                  slug={attributes.slug}
                  content={attributes.content}
                  img={attributes.image.data.attributes.url}
                ></NewsShowAllPreview>
              );
            })}
          </StyledNewsWrapper>
        </StyledContainer>
        {/*{data.map((news) => (*/}
        {/*  <StyledWrapper key={news.id}>*/}
        {/*    <StyledSubHeading>{news.attributes.title}</StyledSubHeading>*/}
        {/*    <StyledDate>{news.attributes.date}</StyledDate>*/}
        {/*    <StyledText>{news.attributes.content}</StyledText>*/}
        {/*    <Link href={`/novinky/${news.attributes.slug}`}>*/}
        {/*      <StyledMoreButton>Čítaj ďalej...</StyledMoreButton>*/}
        {/*    </Link>*/}
        {/*  </StyledWrapper>*/}
        {/*))}*/}
      </StyledFlex>
    </LandingContainer>
  );
}
