import Link from "next/link";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";

const StyledNoticePreview = styled.li`
  display: flex;
  width: 100%;
  background-color: ${COLOR.BACKGROUND};
  background-color: ${COLOR.WHITE};
  border: 1.5px solid ${COLOR.PLATINUM[600]};
  &:hover {
    background-color: ${COLOR.SEC[50]};
  }
  a {
    width: 100%;
    padding: 0.4em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  time {
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
    padding-left: 8px;
    color: ${COLOR.SEC.DEFAULT};
    font-weight: 700;
    font-size: ${FONT_SIZE.L};
    @media (max-width: ${SCREENS.LG}) {
      font-size: ${FONT_SIZE.M};
    }
    @media (max-width: ${SCREENS.MD}) {
      font-size: ${FONT_SIZE.L};
    }
    @media (max-width: ${SCREENS.XS}) {
      font-size: ${FONT_SIZE.M};
    }
  }
  span {
    padding-left: 8px;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const NoticeShowAllPreview = ({ date, content, title, slug }) => {
  return (
    <StyledNoticePreview>
      <Link href={slug}>
        <a>
          <time dateTime={date}>{`${date.getDate()}.${
            date.getMonth() + 1
          }.${date.getFullYear()}`}</time>
          <h3>{title}</h3>
          <span>{content}</span>
        </a>
      </Link>
    </StyledNoticePreview>
  );
};

export default NoticeShowAllPreview;
