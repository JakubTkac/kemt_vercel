import { Capitalize } from "../../lib/typography";
import styled from "styled-components";
import { COLOR, SCREENS } from "../../Theme";
import NewsPreview from "./NewsPreview";
import Link from "next/link";
import StyledShowAllButton from "../Styled/StyledShowAllButton";
import StyledHeadingH1 from "../Styled/StyledHeadingH1";

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
  display: flex;
  gap: 1.5rem;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 2rem;
  @media (max-width: ${SCREENS.LG}) {
    justify-content: center;
  }
`;
const News = ({ heading, data }) => {
  return (
    <StyledContainer>
      <StyledHeadingH1>{Capitalize(heading)}</StyledHeadingH1>
      <StyledNewsWrapper>
        {data.data.slice(0, 3).map(({ attributes, id }) => (
          <NewsPreview
            key={id}
            heading={attributes.title}
            slug={attributes.slug}
            date={new Date(attributes.date)}
            img={attributes.image.data.attributes.url}
          ></NewsPreview>
        ))}
      </StyledNewsWrapper>
      <Link href="/novinky">
        <StyledShowAllButton>Zobraziť všetky {heading}</StyledShowAllButton>
      </Link>
    </StyledContainer>
  );
};

export default News;
