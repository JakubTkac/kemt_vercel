import Post from "../../components/Post/Post";

const URL = process.env.STRAPI_URL;

const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getStaticPaths() {
  const notices = await fetcher(`${URL}/notices`);
  const paths = notices.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { props: paths, revalidate: 60 };
}

export async function getStaticProps({ params }) {
  const notices = await fetcher(`${URL}/notices/${params.slug}`);
  return {
    props: { params, notices },
  };
}

function Content({ notices }) {
  const props = notices.data.attributes;
  return (
    <Post
      title={props.title}
      slug={props.slug}
      content={props.content}
      date={new Date(props.date)}
    ></Post>
  );
}

export default Content;
