import { fetcher } from "../../lib/api";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import TranslateComponent from "../../components/Common/TranslateComponent";
import StudyProgramme from "../../components/Study Programmes/StudyProgramme";
import Seo from "../../components/Common/Seo";

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
  const programYear = await fetcher(
    `${URL}/study-programmes/${params.slug}?populate[subjects][populate]=studyYear`
  );
  return {
    props: {
      params,
      program,
      programYear,
      locale,
      ...(await serverSideTranslations(locale, ["programs"])),
    },
    revalidate: 10,
  };
}

function Content({ program, programYear, locale }) {
  const { t } = useTranslation("programs");
  const {
    data: {
      attributes: {
        subjects: { data: subjects },
      },
    },
  } = programYear;
  program.data.attributes.subjects.data = subjects;
  const { title, titleEN } = program.data.attributes;

  const SEO = program.data.attributes?.seo;

  return (
    <>
      <Seo seo={SEO} locale={locale}></Seo>
      <TranslateComponent
        Component={StyledHeadingH1}
        locale={locale}
        sk={title}
        en={titleEN}
      ></TranslateComponent>
      <StudyProgramme
        data={program.data.attributes}
        locale={locale}
      ></StudyProgramme>
    </>
  );
}

export default Content;
