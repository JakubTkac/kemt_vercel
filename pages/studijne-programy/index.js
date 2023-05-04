import { useTranslation } from "next-i18next";
import Hero from "../../components/Hero/Hero";
import Notices from "../../components/Notices/Notices";
import News from "../../components/News/News";
import Events from "../../components/Events/Events";
import styled from "styled-components";
import { COLOR, FONT_SIZE, HEIGHT, SCREENS, WIDTH } from "../../Theme";
import StyledShowAllButton from "../../components/Styled/StyledShowAllButton";
import { fetcher } from "../../lib/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";

const URL = process.env.STRAPI_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  // const programsResponse = await fetcher(
  //   `${URL}/study-programmes?populate[typeOfStudies][populate]=*`
  // );
  const typeOfStudiesResponse = await fetcher(
    `${URL}/type-of-studies?populate=*`
  );
  return {
    props: {
      typeOfStudies: typeOfStudiesResponse,
      locale: locale,
      ...(await serverSideTranslations(locale, ["programs"])),
    },
  };
}

const LandingContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 85.8vh;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 ${WIDTH.XXS};
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 ${WIDTH.XXXXXS};
    align-items: start;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 ${WIDTH.XXXXXXS};
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0 ${WIDTH.MOBILE};
    flex-direction: column;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
  width: 100%;
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
`;

const StyledProgramTypesContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 2rem 0;
  font-size: ${FONT_SIZE.L};
  gap: 0.5rem;
`;

const StyledProgramTypeButton = styled.button`
  position: relative;
  width: 100%;
  min-height: ${HEIGHT.S};
  background-color: ${COLOR.WHITE};
  border: 1px ${COLOR.PLATINUM[600]} solid;
  background-color: ${(props) =>
    props.selected ? COLOR.PRI[400] : COLOR.WHITE};
  color: ${(props) => (props.selected ? COLOR.BLACK : COLOR.BLACK)};
  &:hover {
    background-color: ${(props) =>
      props.selected ? COLOR.PRI[200] : COLOR.SEC[50]};
  }
  &:before {
    opacity: ${(props) => (props.selected ? 1 : 0)};
    margin-left: -20px;
    border-width: 20px 20px 0;
    border-style: solid;
    border-color: ${COLOR.PRI[400]} rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
  }
`;

export default function StudDegrees({ locale, typeOfStudies }) {
  const { t } = useTranslation("programs");
  const [bachelorActive, setBachelorActive] = useState(true);
  const [masterActive, setMasterActive] = useState(false);
  const [doctoralActive, setDoctoralActive] = useState(false);

  const setProgramHandler = (type) => {
    setBachelorActive(false);
    setMasterActive(false);
    setDoctoralActive(false);
    type(true);
  };

  const StyledProgramsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledProgramTypesContainer>
            <StyledProgramTypeButton
              onClick={() => setProgramHandler(setBachelorActive)}
              selected={bachelorActive}
            >
              {t("bachelor")}
            </StyledProgramTypeButton>
            <StyledProgramTypeButton
              selected={masterActive}
              onClick={() => setProgramHandler(setMasterActive)}
            >
              {t("master")}
            </StyledProgramTypeButton>
            <StyledProgramTypeButton
              selected={doctoralActive}
              onClick={() => setProgramHandler(setDoctoralActive)}
            >
              {t("doctoral")}
            </StyledProgramTypeButton>
          </StyledProgramTypesContainer>
          <StyledHeadingH1>{t("programs")}</StyledHeadingH1>
          <StyledProgramsContainer>
            {bachelorActive && (
              <div>
                {typeOfStudies.data[0].attributes.studyProgrammes.data.map(
                  (program) => (
                    <div key={program.id}>{program.attributes.title}</div>
                  )
                )}
              </div>
            )}

            {masterActive && (
              <div>
                {typeOfStudies.data[1].attributes.studyProgrammes.data.map(
                  (program) => (
                    <div key={program.id}>{program.attributes.title}</div>
                  )
                )}
              </div>
            )}

            {doctoralActive && (
              <div>
                {typeOfStudies.data[2].attributes.studyProgrammes.data.map(
                  (program) => (
                    <div key={program.id}>{program.attributes.title}</div>
                  )
                )}
              </div>
            )}
          </StyledProgramsContainer>
          <a href="https://eprihlaska.tuke.sk/eprihlaska/pages/odosielatel/rozhranie_odosielatela.mais">
            <StyledShowAllButton>{t("apply")}</StyledShowAllButton>
          </a>
        </StyledContainer>
      </StyledFlex>
    </LandingContainer>
  );
}
