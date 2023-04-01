import { fetcher } from "../../lib/api";
import styled from "styled-components";
import { FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";
import Post from "../../components/Post/Post";

const URL = process.env.STRAPI_URL;

export async function getStaticPaths() {
  const news = await fetcher(`${URL}/events`);
  const paths = news.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const events = await fetcher(`${URL}/events/${params.slug}`);
  return {
    props: {
      params,
      events,
    },
  };
}

function Content({ events }) {
  const props = events.data.attributes;
  return (
    <Post
      title={props.title}
      slug={props.slug}
      content={props.content}
      startingDate={new Date(props.startingDate)}
      endingDate={new Date(props.endingDate)}
      location={props.location}
    ></Post>
  );
}

export default Content;
