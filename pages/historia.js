import { fetcher } from "../lib/api";
import StyledHeadingH1 from "../components/Styled/StyledHeadingH1";
import TranslateComponent from "../components/Common/TranslateComponent";
import PageMarkdownConverter from "../components/Common/PageMarkdownConverter";

const URL = process.env.STRAPI_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  const data = await fetcher(`${URL}/history?populate=*`);
  return {
    props: {
      pageData: data,
      locale: locale,
    },
  };
}

function Content({ pageData, locale }) {
  return (
    <>
      <TranslateComponent
        Component={StyledHeadingH1}
        locale={locale}
        en={pageData.data.attributes.page.titleEN}
        sk={pageData.data.attributes.page.title}
      ></TranslateComponent>
      <PageMarkdownConverter
        locale={locale}
        content={pageData.data.attributes.page.content}
        contentEN={pageData.data.attributes.page.contentEN}
      ></PageMarkdownConverter>
    </>
  );
}

export default Content;
