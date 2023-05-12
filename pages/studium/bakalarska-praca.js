import { fetcher } from "../../lib/api";
import TranslateComponent from "../../components/Common/TranslateComponent";
import PageMarkdownConverter from "../../components/Common/PageMarkdownConverter";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import Seo from "../../components/Common/Seo";

const URL = process.env.STRAPI_URL;

export async function getStaticProps({ locale }) {
  const data = await fetcher(`${URL}/bachelors-work?populate=*`);
  return {
    props: {
      pageData: data,
      locale: locale,
    },
    revalidate: 10,
  };
}

function Content({ pageData, locale }) {
  const SEO = pageData.data.attributes?.seo;

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
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
