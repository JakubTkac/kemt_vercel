import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, WIDTH } from "../../Theme";
import ReactMarkdown from "react-markdown";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import NoticeBanner from "./NoticeBanner";
import EventBanner from "./EventBanner";

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
  padding: 2rem;
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

const Post = ({
  img,
  type,
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
            <ReactMarkdown>{content}</ReactMarkdown>
          </StyledContent>
        </StyledContainer>
      </StyledFlex>
    </LandingContainer>
  );
};

export default Post;
