import Link from "next/link";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";
import removeMarkdownSyntax from "../../utils/removeMarkdownSyntax";

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

const StyledContent = styled.span`
  padding-left: 0.5em;
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const EventPreview = ({ slug, heading, startingDate, endingDate, content }) => {
  return (
    <StyledNoticePreview>
      <Link href={`/udalosti/${slug}`} passHref>
        <a>
          <div>
            <time dateTime={startingDate}>{`${startingDate.getDate()}.${
              startingDate.getMonth() + 1
            }.${startingDate.getFullYear()}`}</time>
            {endingDate && (
              <>
                <span> - </span>
                <time dateTime={endingDate}>
                  {`${new Date(endingDate).getDate()}.${
                    new Date(endingDate).getMonth() + 1
                  }.${new Date(endingDate).getFullYear()}`}
                </time>
              </>
            )}
          </div>
          <h3>{heading}</h3>
          {content && (
            <StyledContent>{removeMarkdownSyntax(content)}</StyledContent>
          )}
        </a>
      </Link>
    </StyledNoticePreview>
  );
};
export default EventPreview;
