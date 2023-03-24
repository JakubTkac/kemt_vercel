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
import useBetterMediaQuery from "../../utils/useBetterMediaQuery";

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

const noticePreviewCount = (data, sliceCount) => {
  return data.data
    .slice(0, sliceCount)
    .map(({ attributes, id }) => (
      <NoticePreview
        key={id}
        heading={attributes.title}
        slug={attributes.slug}
        date={new Date(attributes.date)}
      ></NoticePreview>
    ));
};

const Notices = ({ data, heading }) => {
  const isLargerThan768 = useBetterMediaQuery("(min-width: 768px)");
  return (
    <StyledContainer>
      <StyledHeadingH1>{Capitalize(heading)}</StyledHeadingH1>
      <StyledGridWrapper>
        {isLargerThan768
          ? noticePreviewCount(data, 9)
          : noticePreviewCount(data, 3)}
      </StyledGridWrapper>
      <Link href={heading}>
        <StyledShowAllButton>Zobraziť všetky {heading}</StyledShowAllButton>
      </Link>
    </StyledContainer>
  );
};

export default Notices;
