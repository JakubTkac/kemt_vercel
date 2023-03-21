import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHT,
  SCREENS,
  SPACE,
} from "../../Theme";
import styled from "styled-components";
import NoticePreview from "./NoticePreview";
import { Capitalize } from "../../lib/typography";
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
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
`;

const StyledGridWrapper = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  padding: 2rem 0;
  @media (max-width: ${SCREENS.XL}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${SCREENS.MD}) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${SCREENS.XS}) {
  }
`;

const Notices = ({ data, heading }) => {
  return (
    <StyledContainer>
      <StyledHeadingH1>{Capitalize(heading)}</StyledHeadingH1>
      <StyledGridWrapper>
        {data.data.slice(0, 9).map((dataItem) => (
          <NoticePreview
            key={dataItem.id}
            heading={dataItem.attributes.title}
            slug={dataItem.attributes.slug}
            date={dataItem.attributes.date}
          ></NoticePreview>
        ))}
      </StyledGridWrapper>
      <Link href={heading}>
        <StyledShowAllButton>Zobraziť všetky {heading}</StyledShowAllButton>
      </Link>
    </StyledContainer>
  );
};

export default Notices;
