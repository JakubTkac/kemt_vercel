import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import NewsShowAllPreview from "../../components/News/NewsShowAllPreview";
import styled from "styled-components";
import { COLOR, SCREENS, WIDTH } from "../../Theme";
import { fetcher } from "../../lib/api";

const URL = process.env.STRAPI_URL;

export async function getServerSideProps() {
  const eventResponse = await fetcher(`${URL}/events`);
  return {
    props: {
      events: eventResponse,
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

export default function index({ events }) {
  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledHeadingH1>Udalosti</StyledHeadingH1>
        </StyledContainer>
      </StyledFlex>
    </LandingContainer>
  );
}
