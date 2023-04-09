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
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const events = await fetcher(`${URL}/events/${params.slug}?populate=*`);
  return {
    props: {
      params,
      events,
      locale,
    },
  };
}

function Content({ events, locale }) {
  const props = {
    sk: events.data.attributes,
    en: events.data.attributes.localizations.data[0]?.attributes,
  };
  const { sk, en } = props;
  return (
    <>
      {locale === "en" ? (
        <Post
          title={en.title}
          slug={en.slug}
          content={en.content}
          startingDate={new Date(sk.startingDate)}
          endingDate={new Date(sk.endingDate)}
          location={en.location}
          locale={locale}
        ></Post>
      ) : (
        <Post
          title={sk.title}
          slug={sk.slug}
          content={sk.content}
          startingDate={new Date(sk.startingDate)}
          endingDate={new Date(sk.endingDate)}
          location={sk.location}
          locale={locale}
        ></Post>
      )}
    </>
  );
}

export default Content;
