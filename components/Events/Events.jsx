import StyledHeadingH1 from "../Styled/StyledHeadingH1";
import { Capitalize } from "../../lib/typography";
import styled from "styled-components";
import { COLOR, SCREENS } from "../../Theme";
import StyledShowAllButton from "../Styled/StyledShowAllButton";
import EventPreview from "./EventPreview";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  width: 30%;
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
    width: 40%;
  }
  @media (max-width: ${SCREENS.LG}) {
    width: 100%;
  }
  @media (max-width: ${SCREENS.MD}) {
  }
`;

const StyledEventsWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  @media (max-width: ${SCREENS.LG}) {
    justify-content: center;
  }
`;
const Events = ({ data, heading, locale }) => {
  const { t } = useTranslation("common");
  return (
    <StyledContainer>
      <StyledHeadingH1>{Capitalize(heading)}</StyledHeadingH1>
      <StyledEventsWrapper>
        {data.data.slice(0, 3).map(({ attributes, id }) => {
          return (
            <EventPreview
              key={id}
              heading={attributes.title}
              slug={
                locale === "en"
                  ? attributes.localizations.data[0].attributes.slug
                  : attributes.slug
              }
              startingDate={new Date(attributes.startingDate)}
              endingDate={attributes.endingDate}
            ></EventPreview>
          );
        })}
      </StyledEventsWrapper>
      <Link href="/udalosti" passHref>
        <StyledShowAllButton>
          {t("showAll")} {heading}
        </StyledShowAllButton>
      </Link>
    </StyledContainer>
  );
};

export default Events;
