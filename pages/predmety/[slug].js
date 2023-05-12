import { fetcher } from "../../lib/api";
import styled from "styled-components";
import { COLOR, FONT_SIZE, HEIGHT, SCREENS, WIDTH } from "../../Theme";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import Subject from "../../components/Subjects/Subject";
import TranslateComponent from "../../components/Common/TranslateComponent";
import Seo from "../../components/Common/Seo";

const URL = process.env.STRAPI_URL;

export async function getStaticPaths() {
  const subject = await fetcher(`${URL}/subjects`);
  const paths = subject.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const subject = await fetcher(`${URL}/subjects/${params.slug}?populate=*`);
  return {
    props: {
      params,
      subject,
      locale,
      ...(await serverSideTranslations(locale, ["subjects"])),
    },
  };
}

function Content({ subject, locale }) {
  const { t } = useTranslation("employees");

  const { title, titleEN } = subject.data.attributes;

  const SEO = subject.data.attributes?.seo;

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <TranslateComponent
        Component={StyledHeadingH1}
        locale={locale}
        sk={title}
        en={titleEN}
      ></TranslateComponent>
      <Subject data={subject.data.attributes} locale={locale}></Subject>
    </>
  );
}

export default Content;
