import Link from "next/link";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";

const URL = process.env.STRAPI_URL;

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
    width: 80%;
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
    span {
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
`;

const NewsPreview = ({ heading, slug, date, img }) => {
  return (
    <StyledNewsWrapper>
      <Link href={`/novinky/${slug}`}>
        <a>
          <AspectRatio.Root ratio={3 / 2}>
            <Img src={`http://194.233.172.84${img}`} alt={img}></Img>
          </AspectRatio.Root>
          <span>{`${date.getDate()}.${
            date.getMonth() + 1
          }.${date.getFullYear()}`}</span>
          <h3>{heading}</h3>
        </a>
      </Link>
    </StyledNewsWrapper>
  );
};

export default NewsPreview;
