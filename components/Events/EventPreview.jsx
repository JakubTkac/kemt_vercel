import Link from "next/link";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";

const StyledNoticePreview = styled.li`
  display: flex;
  position: relative;
  width: 100%;
  background-color: ${COLOR.BACKGROUND};
  &:hover {
    background-color: ${COLOR.SEC[50]};
  }
  @media (max-width: ${SCREENS.XL}) {
  }

  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
  a {
    width: 100%;
    padding: 0.4em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    @media (max-width: ${SCREENS.XL}) {
    }
    @media (max-width: ${SCREENS.LG}) {
    }
    @media (max-width: ${SCREENS.MD}) {
    }
    &:after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 20px 0 0 20px;
      border-color: ${COLOR.PLATINUM.DEFAULT} transparent transparent
        ${COLOR.SEC.DEFAULT};
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  span {
    text-transform: uppercase;
    font-size: ${FONT_SIZE.XS};
    @media (max-width: ${SCREENS.XL}) {
    }
    @media (max-width: ${SCREENS.LG}) {
    }
    @media (max-width: ${SCREENS.MD}) {
    }
  }
  h3 {
    padding-left: 0.5em;
    font-weight: 700;
    font-size: ${FONT_SIZE.M};
    @media (max-width: ${SCREENS.XL}) {
    }
    @media (max-width: ${SCREENS.LG}) {
    }
    @media (max-width: ${SCREENS.MD}) {
    }
  }
`;

const EventPreview = ({ slug, heading, date }) => {
  return (
    <StyledNoticePreview>
      <Link href={`/udalosti/${slug}`}>
        <a>
          <span>{`${date.getDate()}.${
            date.getMonth() + 1
          }.${date.getFullYear()}`}</span>
          <h3>{heading}</h3>
        </a>
      </Link>
    </StyledNoticePreview>
  );
};
export default EventPreview;
