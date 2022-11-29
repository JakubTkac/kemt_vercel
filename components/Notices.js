import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHT,
  SCREENS,
  SPACE,
} from "../Theme";
import styled from "styled-components";

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const StyledContainer = styled.div`
  margin: 3rem;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  @media (max-width: ${SCREENS.XL}) {
    margin: 2rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 1rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0.5rem;
  }
`;

const StyledHeading = styled.h1`
  font-size: ${FONT_SIZE.XL};
  padding-bottom: 1.5rem;
  font-weight: ${FONT_WEIGHT.BOLD};
  @media (max-width: ${SCREENS.XL}) {
    padding-bottom: 1rem;
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.XL};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.L};
  }
`;

const StyledShowAllButton = styled.button`
  width: 100%;
  margin: 2rem 0;
  background-color: ${COLOR.FEI_PRIMARY};
  color: ${COLOR.BLACK};
  text-align: center;
  height: ${SPACE.XL};
  border: black 1px solid;
  border-radius: 5px;
  @media (max-width: ${SCREENS.XL}) {
    height: ${SPACE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    height: ${SPACE.XL};
  }
  @media (max-width: ${SCREENS.XS}) {
    height: ${SPACE.L};
  }
`;

const StyledMoreButton = styled.text`
  cursor: pointer;
  color: ${COLOR.DANGER};
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
`;

const StyledText = styled.p`
  font-size: ${FONT_SIZE.S};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media (max-width: ${SCREENS.LG}) {
    font-size: ${FONT_SIZE.XS};
  }
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.S};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.XS};
  }
`;

const StyledWrapper = styled.div``;

const Notices = (props) => {
  return (
    <StyledContainer>
      <StyledHeading>{Capitalize(props.heading)}</StyledHeading>
      <StyledVerticalStack>
        {props.data.data.slice(0, 3).map((notice) => (
          <StyledWrapper key={notice.id}>
            <StyledSubHeading>{notice.attributes.title}</StyledSubHeading>
            <StyledDate>{notice.attributes.date}</StyledDate>
            <StyledText>{notice.attributes.content}</StyledText>
            <Link
              href={`/${props.heading}/${
                props.data.data[notice.id - 1].attributes.slug
              }`}>
              <StyledMoreButton color={COLOR.DANGER}>
                Zobraziť viac...
              </StyledMoreButton>
            </Link>
          </StyledWrapper>
        ))}
      </StyledVerticalStack>
      <Link href={props.heading}>
        <StyledShowAllButton>
          Zobraziť všetky {props.heading}
        </StyledShowAllButton>
      </Link>
    </StyledContainer>
  );
};

export default Notices;
