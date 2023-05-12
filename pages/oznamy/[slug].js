import Post from "../../components/Post/Post";
import { fetcher } from "../../lib/api";
import Seo from "../../components/Common/Seo";

const URL = process.env.STRAPI_URL;

export async function getStaticPaths() {
  const notices = await fetcher(`${URL}/notices`);
  const paths = notices.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const notices = await fetcher(`${URL}/notices/${params.slug}?populate=*`);
  return {
    props: { params, notices, locale },
  };
}

function Content({ notices, locale }) {
  const props = {
    sk: notices.data.attributes,
    en: notices.data.attributes.localizations?.data[0]?.attributes,
  };
  const { sk, en } = props;

  const SEO = notices.data.attributes?.seo;

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      {locale === "en" ? (
        <Post
          title={en.title}
          slug={en.slug}
          content={en.content}
          date={new Date(sk.date)}
          locale={locale}
        ></Post>
      ) : (
        <Post
          title={sk.title}
          slug={sk.slug}
          content={sk.content}
          date={new Date(sk.date)}
          locale={locale}
        ></Post>
      )}
    </>
  );
}

export default Content;
