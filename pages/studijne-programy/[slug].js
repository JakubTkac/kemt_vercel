import { fetcher } from "../../lib/api";
import styled from "styled-components";
import { COLOR, FONT_SIZE, HEIGHT, SCREENS, WIDTH } from "../../Theme";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import TranslateComponent from "../../components/Common/TranslateComponent";

const URL = process.env.STRAPI_URL;

export async function getStaticPaths() {
  const programmes = await fetcher(`${URL}/study-programmes`);
  const paths = programmes.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const program = await fetcher(
    `${URL}/study-programmes/${params.slug}?populate=*`
  );
  return {
    props: {
      params,
      program,
      locale,
      ...(await serverSideTranslations(locale, ["subjects"])),
    },
  };
}

function Content({ program, locale }) {
  const { t } = useTranslation("employees");

  const { title, titleEN } = program.data.attributes;

  console.log(program.data.attributes);
  return (
    <>
      <TranslateComponent
        Component={StyledHeadingH1}
        locale={locale}
        sk={title}
        en={titleEN}
      ></TranslateComponent>
      {/*<Subject data={program.data.attributes} locale={locale}></Subject>*/}
    </>
  );
}

export default Content;
