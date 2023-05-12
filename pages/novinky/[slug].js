import { fetcher } from "../../lib/api";
import Post from "../../components/Post/Post";
import Seo from "../../components/Common/Seo";

const URL = process.env.STRAPI_URL;

export async function getStaticPaths() {
  const news = await fetcher(`${URL}/news`);
  const paths = news.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const news = await fetcher(`${URL}/news/${params.slug}?populate=*`);
  return {
    props: { params, news, locale },
  };
}

function Content({ news, locale }) {
  const props = {
    sk: news.data.attributes,
    en: news.data.attributes.localizations.data[0]?.attributes,
  };
  const { sk, en } = props;

  const SEO = news.data.attributes?.seo;

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      {locale === "en" ? (
        <Post
          title={en.title}
          slug={en.slug}
          content={en.content}
          date={new Date(sk.date)}
          img={sk.image.data.attributes.url}
          locale={locale}
        ></Post>
      ) : (
        <Post
          title={sk.title}
          slug={sk.slug}
          content={sk.content}
          date={new Date(sk.date)}
          img={sk.image.data.attributes.url}
          locale={locale}
        ></Post>
      )}
    </>
  );
}

export default Content;
