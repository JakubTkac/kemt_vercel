import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, WIDTH } from "../../Theme";
import ReactMarkdown from "react-markdown";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import NoticeBanner from "./NoticeBanner";
import EventBanner from "./EventBanner";
import generateSlug from "../../utils/generateSlug";
import { useState } from "react";
import TableOfContents from "./TableOfContents";

const URL = process.env.NEXT_PUBLIC_IMG_URL;

const LandingContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 85.8vh;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 ${WIDTH.XXS};
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 ${WIDTH.XXXXXS};
    align-items: start;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 ${WIDTH.XXXXXXS};
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0 ${WIDTH.MOBILE};
    flex-direction: column;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
  width: 100%;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
`;

const StyledContent = styled.div`
  width: 100%;
  padding: 2rem;
  word-break: break-word;
  @media (max-width: ${SCREENS.MD}) {
    padding: 0;
  }
  a,
  a:visited {
    text-decoration: underline;
  }

  pre,
  blockquote {
    border: 1px solid ${COLOR.SEC[500]};
    page-break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }

  tr,
  img {
    page-break-inside: avoid;
  }

  img {
    max-width: 25% !important;
  }

  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }

  h2,
  h3 {
    page-break-after: avoid;
  }
}

pre,
code {
  font-family: Menlo, Monaco, "Courier New", monospace;
}

pre {
  padding: .5rem;
  line-height: 1.25;
  overflow-x: auto;
}

a,
a:visited {
  color: #3498db;
}

a:hover,
a:focus,
a:active {
  color: #2980b9;
}


p{
  font-size: 1rem;
  margin-bottom: 1.3rem;
}

h1,
h2,
h3,
h4
{  margin: 1.414rem 0 .5rem;
  font-weight: inherit;
  line-height: 1.42;
}

h1{
  margin-top: 0;
  font-size: 3.998rem;
}

h2{
  font-size: 2.827rem;
}

h3{
  font-size: 1.999rem;
}

h4{
  font-size: 1.414rem;
}

h5{
  font-size: 1.121rem;
}

h6{
  font-size: .88rem;
}

small{
  font-size: .707em;
}

img,
canvas,
iframe,
video,
svg,
select,
textarea {
  max-width: 100%;
}


h1,
h2,
h3 {
  border-bottom: 2px solid ${COLOR.SEC[400]};
  margin-bottom: 1.15rem;
  padding-bottom: .5rem;
  text-align: center;
}

blockquote {
  border-left: 8px solid ${COLOR.SEC[400]};
  padding: 1rem;
}

pre,
code {
  background-color: ${COLOR.PLATINUM[400]};
}
li {
  margin-left:  5px;
}
h1>a,
h2>a,
h3>a,
h4>a,
h5>a,
h6 > a {
color: ${COLOR.BLACK} !important;
  text-decoration: none;
  &:hover {
    color: ${COLOR.BLACK};
  }
}

div > ul > li > a {
  color: ${COLOR.SEC[400]} !important;
  &:hover{
    color: ${COLOR.SEC[600]}!important;
  }
}

hr {
  height: 1px;
  background-color: ${COLOR.SEC[500]};
}
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const StyledAspectRatio = styled(AspectRatio.Root)`
  padding: 2em;
  overflow: hidden;
  @media (max-width: ${SCREENS.MD}) {
    padding: 0.2em;
  }
`;

const generateHeaderComponent = (level) => {
  const Header = (props) => {
    const arr = props.children;
    let heading = "";

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]?.type !== undefined) {
        for (let j = 0; j < arr[i].props.children.length; j++) {
          heading += arr[i]?.props?.children[0];
        }
      } else heading += arr[i];
    }

    const slug = generateSlug(heading);
    const HeaderTag = `h${level}`;

    return (
      <HeaderTag id={slug}>
        <a href={`#${slug}`} {...props}></a>
      </HeaderTag>
    );
  };

  Header.displayName = `Header${level}`;

  return Header;
};

const MarkdownComponents = {
  h1: generateHeaderComponent(1),
  h2: generateHeaderComponent(2),
  h3: generateHeaderComponent(3),
  h4: generateHeaderComponent(4),
  h5: generateHeaderComponent(5),
  h6: generateHeaderComponent(6),
};

const Post = ({
  img,
  title,
  slug,
  id,
  content,
  date,
  location,
  endingDate,
  startingDate,
}) => {
  return (
    <LandingContainer>
      <StyledFlex>
        {startingDate ? (
          <EventBanner
            startingDate={startingDate}
            title={title}
            endingDate={endingDate}
            location={location}
          ></EventBanner>
        ) : (
          <NoticeBanner date={date} title={title} />
        )}
        <StyledContainer>
          {img && (
            <StyledAspectRatio ratio={16 / 9}>
              <Img src={`${URL}${img}`} alt={img}></Img>
            </StyledAspectRatio>
          )}
          <StyledContent>
            <TableOfContents markdownText={content} />
            <ReactMarkdown components={MarkdownComponents}>
              {content}
            </ReactMarkdown>
          </StyledContent>
        </StyledContainer>
      </StyledFlex>
    </LandingContainer>
  );
};

export default Post;
