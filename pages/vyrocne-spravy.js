import { fetcher } from "../lib/api";
import StyledHeadingH1 from "../components/Styled/StyledHeadingH1";
import TranslateComponent from "../components/Common/TranslateComponent";
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../Theme";
import Link from "next/link";

const URL = process.env.STRAPI_URL;
const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  const data = await fetcher(
    `${URL}/annual-reports?sort=title%3Adesc&populate=*`
  );
  return {
    props: {
      pageData: data,
      locale: locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
`;

const StyledReport = styled.a`
  text-decoration: underline;
  color: ${COLOR.SEC[400]};
  font-size: ${FONT_SIZE.L};
  font-weight: ${FONT_WEIGHT.BOLD};
  &:hover {
    color: ${COLOR.SEC[700]};
  }
  &:visited {
    color: ${COLOR.SEC[700]};
  }
  li {
    list-style: none;
  }
  @media (max-width: ${SCREENS.SM}) {
    font-size: ${FONT_SIZE.M};
  }
`;

const Report = ({ children, url }) => {
  return (
    <StyledReport href={url} target="_blank" rel="noopener noreferrer">
      <li>{children}</li>
    </StyledReport>
  );
};

function Content({ pageData, locale }) {
  const { t } = useTranslation("common");
  return (
    <>
      <StyledHeadingH1>{t("annualReports")}</StyledHeadingH1>
      <StyledList>
        {pageData.data.map((item) => {
          return (
            <TranslateComponent
              key={item.id}
              Component={Report}
              locale={locale}
              sk={item.attributes.title}
              url={`${imgURL}${item.attributes.pdf.data.attributes.url}`}
            ></TranslateComponent>
          );
        })}
      </StyledList>
    </>
  );
}

export default Content;
