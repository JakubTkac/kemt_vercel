import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, SCREENS } from "../../Theme";
import StyledShowAllButton from "../../components/Styled/StyledShowAllButton";
import { fetcher } from "../../lib/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import StyledSelectTypesContainer from "../../components/Styled/StyledSelectTypesContainer";
import SelectButton from "../../components/Styled/StyledSelectButton";
import StudyProgrammeItem from "../../components/Study Programmes/StudyProgrammeItem";
import { NextSeo } from "next-seo";

const URL = process.env.STRAPI_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  const typeOfStudiesResponse = await fetcher(
    `${URL}/type-of-studies?populate[studyProgrammes][populate]=*`
  );
  return {
    props: {
      typeOfStudies: typeOfStudiesResponse,
      locale: locale,
      ...(await serverSideTranslations(locale, ["programs"])),
    },
  };
}

const StyledContentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  @media (max-width: ${SCREENS.SM}) {
    width: 100%;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid ${COLOR.PLATINUM[600]};
  margin-bottom: 2rem;
`;

export default function StudDegrees({ locale, typeOfStudies }) {
  const { t } = useTranslation("programs");
  const [bachelorActive, setBachelorActive] = useState(true);
  const [masterActive, setMasterActive] = useState(false);
  const [doctoralActive, setDoctoralActive] = useState(false);

  const setProgramHandler = (setter) => {
    setBachelorActive(false);
    setMasterActive(false);
    setDoctoralActive(false);
    setter(true);
  };

  const SEO = {
    title: "KEMT - Študijné programy",
    description: "KEMT - Študijné programy",
    openGraph: {
      locale: locale,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <StyledHeadingH1>{t("programs")}</StyledHeadingH1>
      <StyledSelectTypesContainer>
        <SelectButton
          onClickHandler={() => setProgramHandler(setBachelorActive)}
          selected={bachelorActive}
          aria-label={`${t("type_of_study")}${t("bachelor")}`}
        >
          {t("bachelor")}
        </SelectButton>
        <SelectButton
          selected={masterActive}
          onClickHandler={() => setProgramHandler(setMasterActive)}
          aria-label={`${t("type_of_study")}${t("master")}`}
        >
          {t("master")}
        </SelectButton>
        <SelectButton
          selected={doctoralActive}
          onClickHandler={() => setProgramHandler(setDoctoralActive)}
          aria-label={`${t("type_of_study")}${t("doctoral")}`}
        >
          {t("doctoral")}
        </SelectButton>
      </StyledSelectTypesContainer>
      <StyledContentContainer>
        {bachelorActive && (
          <StyledWrapper>
            {typeOfStudies.data[0].attributes.studyProgrammes.data.map(
              (program) => {
                return (
                  <StudyProgrammeItem
                    key={program.id}
                    locale={locale}
                    attributes={program.attributes}
                  ></StudyProgrammeItem>
                );
              }
            )}
          </StyledWrapper>
        )}

        {masterActive && (
          <StyledWrapper>
            {typeOfStudies.data[1].attributes.studyProgrammes.data.map(
              (program) => {
                return (
                  <StudyProgrammeItem
                    key={program.id}
                    locale={locale}
                    attributes={program.attributes}
                  ></StudyProgrammeItem>
                );
              }
            )}
          </StyledWrapper>
        )}

        {doctoralActive && (
          <StyledWrapper>
            {typeOfStudies.data[2].attributes.studyProgrammes.data.map(
              (program) => {
                return (
                  <StudyProgrammeItem
                    key={program.id}
                    locale={locale}
                    attributes={program.attributes}
                  ></StudyProgrammeItem>
                );
              }
            )}
          </StyledWrapper>
        )}
      </StyledContentContainer>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://eprihlaska.tuke.sk/eprihlaska/pages/odosielatel/rozhranie_odosielatela.mais"
      >
        <StyledShowAllButton>{t("apply")}</StyledShowAllButton>
      </a>
    </>
  );
}
