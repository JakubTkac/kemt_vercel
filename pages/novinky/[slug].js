import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { COLOR, HEIGHT, SPACE } from "../../Theme";

const URL = process.env.STRAPI_URL;

const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getStaticPaths() {
  const news = await fetcher(`${URL}/news`);
  const paths = news.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const news = await fetcher(`${URL}/news/${params.slug}`);
  return {
    props: { params, news },
  };
}

const StyledPostContainer = styled.div`
  display: flex;
  border: 1px solid black;
  width: 100%;
  min-height: ${HEIGHT.XXXL};
  flex-direction: column;
  padding: 6rem 12rem;
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

function Content({ news }) {
  return (
    <StyledPostContainer>
      <StyledHeadingBox>
        <StyledHeading1>{news.data.attributes.title}</StyledHeading1>
        <StyledDate>{news.data.attributes.date}</StyledDate>
      </StyledHeadingBox>
      <ReactMarkdown>{news.data.attributes.content}</ReactMarkdown>
    </StyledPostContainer>
  );
}

export default Content;
