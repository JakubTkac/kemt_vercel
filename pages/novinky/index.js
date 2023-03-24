import { fetcher } from "../../lib/api";
import Link from "next/link";
import Theme, {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREENS,
  SPACE,
  WIDTH,
} from "../../Theme";
import styled from "styled-components";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";

const URL = process.env.STRAPI_URL;

export async function getStaticProps() {
  const newsResponse = await fetcher(`${URL}/news`);
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

export default function index({ news }) {
  const data = news.data.sort((prev, next) => prev.id - next.id);
  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledHeadingH1>Novinky</StyledHeadingH1>
          <ul>
            <li>
              <article>
                <a href="">
                  <img src="" alt="" />
                  <div>
                    <div>
                      <time></time>
                      <h3></h3>
                    </div>
                    <p></p>
                  </div>
                </a>
              </article>
            </li>
          </ul>
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
