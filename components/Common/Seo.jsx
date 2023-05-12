import { ArticleJsonLd, NextSeo } from "next-seo";

const Seo = ({ seo, locale }) => {
  if (!seo) {
    return null;
  }
  const { canonicalURL, keywords, metaDescription, metaTitle, structuredData } =
    seo;
  const SEO = {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      locale: locale,
      url: canonicalURL,
    },
    keywords: keywords,
  };

  return (
    <>
      <NextSeo {...SEO}></NextSeo>
      <ArticleJsonLd {...structuredData}></ArticleJsonLd>
    </>
  );
};

export default Seo;
