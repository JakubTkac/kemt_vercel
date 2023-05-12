import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";

const StyledBanner = styled.div`
  width: 100%;
  display: flex;
  min-height: 12rem;
  padding-top: 0.2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.SEC[500]};
  color: ${COLOR.WHITE};
  border-top: 1px solid ${COLOR.PLATINUM.DEFAULT};
  h1 {
    font-size: ${FONT_SIZE.XL};
    font-weight: 700;
  }
  span {
    color: ${COLOR.PRI.DEFAULT};
    font-size: ${FONT_SIZE.L};
    height: 100%;
  }
  time {
    height: 100%;
    font-size: ${FONT_SIZE.M};
  }
  @media (max-width: ${SCREENS.XL}) {
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
    padding: 0 1.5rem;
    align-items: flex-start;
  }
`;

const StyledBannerWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 2rem;
  @media (max-width: ${SCREENS.MD}) {
    padding: 0;
  }
  div {
    display: flex;
    justify-content: flex-start;
    gap: 1.2rem;
    align-items: center;
  }
`;

const NoticeBanner = ({ title, date }) => {
  return (
    <StyledBanner>
      <StyledBannerWrapper>
        <h1>{title}</h1>
        <div>
          <span>-</span>
          <time dateTime={date}>{`${date.getDate()}.${
            date.getMonth() + 1
          }.${date.getFullYear()}`}</time>
        </div>
      </StyledBannerWrapper>
    </StyledBanner>
  );
};

export default NoticeBanner;
