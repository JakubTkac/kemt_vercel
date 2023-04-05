import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHT,
  SCREENS,
  SPACE,
} from "../../Theme";
import { fetcher } from "../../lib/api";
import Post from "../../components/Post/Post";

const URL = process.env.STRAPI_URL;

export async function getStaticPaths() {
  const news = await fetcher(`${URL}/news`);
  const paths = news.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const news = await fetcher(`${URL}/news/${params.slug}?populate=*`);
  return {
    props: { params, news },
  };
}

function Content({ news }) {
  const props = news.data.attributes;
  return (
    <Post
      title={props.title}
      slug={props.slug}
      content={props.content}
      date={new Date(props.date)}
      img={props.image.data.attributes.url}
      type="news"
    ></Post>
  );
}

export default Content;
