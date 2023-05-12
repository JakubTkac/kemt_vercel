import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";

const StyledBanner = styled.div`
  min-height: 12rem;
  padding-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.SEC[500]};
  color: ${COLOR.WHITE};
  border-top: 1px solid ${COLOR.PLATINUM.DEFAULT};
  h1 {
    font-size: ${FONT_SIZE.XL};
    font-weight: 700;
  }
  @media (max-width: ${SCREENS.MD}) {
    padding: 0 1.5rem;
    align-items: flex-start;
  }
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.hasEndingDate ? "1fr 1fr 1fr" : "1fr 1fr"};
  width: 100%;
  padding: 0 12rem;
  padding-top: 2rem;
  @media (max-width: ${SCREENS.XL}) {
    padding: 2rem 6rem 0 6rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    padding: 2rem 2rem 0 2rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    grid-template-columns: 1fr;
    padding: 0.2rem;
  }
`;

const StyledContentContainer = styled.div`
  min-height: 6rem;
  display: flex;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border: 1px ${COLOR.PLATINUM[600]} solid;
  > * {
    &:first-child {
      font-size: ${FONT_SIZE.S};
      color: ${COLOR.PLATINUM[600]};
      font-weight: 700;
      }
    }
  }
`;
const EventBanner = ({ startingDate, endingDate, location, title }) => {
  const hasEndingDate = endingDate > new Date(1970, 1, 1);
  return (
    <StyledBanner>
      <h1>{title}</h1>
      <StyledWrapper hasEndingDate={hasEndingDate}>
        <StyledContentContainer>
          <span>Od kedy</span>
          <time dateTime={startingDate}>{`${startingDate.getDate()}.${
            startingDate.getMonth() + 1
          }.${startingDate.getFullYear()}`}</time>
          <time>{`${startingDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${startingDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}</time>
        </StyledContentContainer>
        {hasEndingDate && (
          <StyledContentContainer>
            <span>Do kedy</span>
            <time dateTime={endingDate}>{`${endingDate.getDate()}.${
              endingDate.getMonth() + 1
            }.${endingDate.getFullYear()}`}</time>
            <time>{`${endingDate
              .getHours()
              .toString()
              .padStart(2, "0")}:${endingDate
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}</time>
          </StyledContentContainer>
        )}
        <StyledContentContainer>
          <span>Kde</span>
          <span>{location}</span>
        </StyledContentContainer>
      </StyledWrapper>
    </StyledBanner>
  );
};

export default EventBanner;
