import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, WIDTH } from "../../Theme";
import ReactMarkdown from "react-markdown";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import NoticeBanner from "./NoticeBanner";
import EventBanner from "./EventBanner";
import generateSlug from "../../utils/generateSlug";
import TableOfContents from "./TableOfContents";
import MarkdownContent from "../Styled/StyledMarkdownContent";

const URL = process.env.NEXT_PUBLIC_IMG_URL;

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
  locale,
  content,
  date,
  location,
  endingDate,
  startingDate,
}) => {
  return (
    <>
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
      <>
        {img && (
          <div>
            <Img src={`${URL}${img}`} alt={img}></Img>
          </div>
        )}
        <MarkdownContent>
          <TableOfContents markdownText={content} locale={locale} />
          <ReactMarkdown components={MarkdownComponents}>
            {content}
          </ReactMarkdown>
        </MarkdownContent>
      </>
    </>
  );
};

export default Post;
