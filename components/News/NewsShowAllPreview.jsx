import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import removeMarkdownSyntax from "../../utils/removeMarkdownSyntax";

const URL = process.env.NEXT_PUBLIC_IMG_URL;

const StyledNewsShowAllPreviewContainer = styled.li`
  list-style: none;
  width: 50%;
  display: flex;
  //flex-grow: 1;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: center;
  padding: 1.5em;
  background-color: ${COLOR.WHITE};
  border: 1.5px solid ${COLOR.PLATINUM[600]};
  &:hover > li {
    transform: scale(1.5);
  }
  @media (max-width: ${SCREENS.MD}) {
    flex-grow: 1;
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
    &:hover > div > div > img {
      transform: scale(1.5);
    }
    &:hover > div > div > h3 {
      text-decoration: none;
    }
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
`;
const StyledAspectRatio = styled(AspectRatio.Root)`
  overflow: hidden;
`;

const StyledContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    height: auto;
    justify-content: space-between;
    align-items: center;
    h3 {
      word-break: break-all;
      color: ${COLOR.SEC.DEFAULT};
      font-weight: 700;
      font-size: ${FONT_SIZE.L};
      text-decoration: underline;
      padding: 0 1em;
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
  }
  p {
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    font-size: ${FONT_SIZE.M};
    @media (max-width: ${SCREENS.LG}) {
      font-size: ${FONT_SIZE.S};
    }
    @media (max-width: ${SCREENS.MD}) {
      font-size: ${FONT_SIZE.M};
    }
    @media (max-width: ${SCREENS.XS}) {
      font-size: ${FONT_SIZE.S};
    }
  }
`;

const StyledTime = styled.time`
  top: -40px;
  margin-left: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.WHITE};
  border: 6px solid ${COLOR.SEC[50]};
  text-align: center;
  padding: 0.5em;
  box-shadow: 0 0 0 1px ${COLOR.SEC[500]};
  @media (max-width: ${SCREENS.LG}) {
    margin-left: 10px;
    top: -40px;
    padding: 0.25em;
  }
  @media (max-width: ${SCREENS.MD}) {
    top: -40px;
    margin-left: 30px;
    padding: 0.5em;
  }
  @media (max-width: ${SCREENS.XS}) {
    margin-left: 10px;
    top: -40px;
    padding: 0.25em;
  }
  > * {
    &:first-child {
      font-size: ${FONT_SIZE.L};
      font-weight: 700;
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
  }
  span {
    font-size: ${FONT_SIZE.XS};
    font-weight: 500;
    @media (max-width: ${SCREENS.LG}) {
      font-size: ${FONT_SIZE.XXS};
    }
    @media (max-width: ${SCREENS.MD}) {
      font-size: ${FONT_SIZE.XS};
    }
    @media (max-width: ${SCREENS.XS}) {
      font-size: ${FONT_SIZE.XXS};
    }
  }
`;

const NewsShowAllPreview = ({ date, id, slug, content, title, img }) => {
  return (
    <StyledNewsShowAllPreviewContainer>
      <article>
        <Link href={`/novinky/${slug}`}>
          <a>
            <StyledAspectRatio ratio={6 / 4}>
              <Img
                src={
                  img?.formats && img.formats.small?.url
                    ? `${URL}${img.formats.small?.url}`
                    : `${URL}${img?.url}`
                }
                alt={img?.alternativeText}
              ></Img>
            </StyledAspectRatio>
            <StyledContentContainer>
              <div>
                <StyledTime dateTime={date}>
                  <span>{`${date.getDate()}.`}</span>
                  <span>{`${date.getMonth() + 1}.`}</span>
                  <span>{`${date.getFullYear()}`}</span>
                </StyledTime>
                <h3>{title}</h3>
              </div>
              <p>{removeMarkdownSyntax(content)}</p>
            </StyledContentContainer>
          </a>
        </Link>
      </article>
    </StyledNewsShowAllPreviewContainer>
  );
};

export default NewsShowAllPreview;
