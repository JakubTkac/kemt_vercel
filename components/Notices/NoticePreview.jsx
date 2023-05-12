import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";
import Link from "next/link";

const StyledNoticePreview = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.BACKGROUND};
  border: 1px ${COLOR.PLATINUM[600]} solid;
  min-height: 130px;
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
    padding-top: 0.2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media (max-width: ${SCREENS.XL}) {
    }
    @media (max-width: ${SCREENS.LG}) {
    }
    @media (max-width: ${SCREENS.MD}) {
    }
    &:hover > h3 {
      text-decoration: none;
    }
  }
  time {
    text-align: center;
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
    text-align: center;
    font-weight: 700;
    text-decoration: underline;
    font-size: ${FONT_SIZE.M};
    @media (max-width: ${SCREENS.XL}) {
    }
    @media (max-width: ${SCREENS.LG}) {
    }
    @media (max-width: ${SCREENS.MD}) {
    }
  }
`;

const NoticePreview = ({ heading, date, slug }) => {
  const newDate = new Date(date);
  return (
    <StyledNoticePreview>
      <Link href={`/oznamy/${slug}`} passHref>
        <a>
          <time dateTime={date}>{`${date.getDate()}.${
            date.getMonth() + 1
          }.${date.getFullYear()}`}</time>
          <h3>{heading}</h3>
        </a>
      </Link>
    </StyledNoticePreview>
  );
};

export default NoticePreview;
