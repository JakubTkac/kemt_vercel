import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { COLOR, HEIGHT, SPACE } from "../../Theme";

const URL = process.env.STRAPI_URL;

const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getStaticPaths() {
  const notices = await fetcher(`${URL}/notices`);
  const paths = notices.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const notices = await fetcher(`${URL}/notices/${params.slug}`);
  return {
    props: { params, notices },
  };
}

const StyledPostContainer = styled.div`
  display: flex;
  border: 1px solid black;
  width: 100%;
  min-height: 85.8vh;
  flex-direction: column;
  padding: 6rem 20vw;
`;

const StyledHeadingBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeading1 = styled.h1`
  font-size: 36px;
  line-height: 40px;
  margin-bottom: 0.2rem;
`;

const StyledDate = styled.text`
  font-size: 12px;
  margin-bottom: 2rem;
`;

function Content({ notices }) {
  return (
    <StyledPostContainer>
      <StyledHeadingBox>
        <StyledHeading1>{notices.data.attributes.title}</StyledHeading1>
        <StyledDate>{notices.data.attributes.date}</StyledDate>
      </StyledHeadingBox>
      <ReactMarkdown>{notices.data.attributes.content}</ReactMarkdown>
    </StyledPostContainer>
  );
}

export default Content;
