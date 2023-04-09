import Link from "next/link";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";

const URL = process.env.NEXT_PUBLIC_IMG_URL;

const StyledNewsWrapper = styled.li`
  width: 30%;
  padding: 1rem;
  list-style: none;
  background-color: ${COLOR.BACKGROUND};
  border: 1px ${COLOR.PLATINUM[600]} solid;
  min-height: 130px;

  @media (max-width: ${SCREENS.XXL}) {
    width: 48%;
  }
  @media (max-width: ${SCREENS.XL}) {
    width: 47%;
  }
  @media (max-width: ${SCREENS.LG}) {
    width: 100%;
    max-width: 500px;
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
    &:hover > div > div > img {
      transform: scale(1.5);
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

const NewsPreview = ({ heading, slug, date, img }) => {
  return (
    <StyledNewsWrapper>
      <Link href={`/novinky/${slug}`}>
        <a>
          <StyledAspectRatio ratio={3 / 2}>
            <Img
              src={
                img.formats && img.formats.small?.url
                  ? `${URL}${img.formats.small.url}`
                  : `${URL}${img.url}`
              }
              alt={img.alternativeText}
            ></Img>
          </StyledAspectRatio>
          <time dateTime={date}>{`${date.getDate()}.${
            date.getMonth() + 1
          }.${date.getFullYear()}`}</time>
          <h3>{heading}</h3>
        </a>
      </Link>
    </StyledNewsWrapper>
  );
};

export default NewsPreview;
