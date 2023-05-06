import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, FONT_SIZE, HEIGHT, SCREENS, WIDTH } from "../../Theme";
import StyledShowAllButton from "../../components/Styled/StyledShowAllButton";
import { fetcher } from "../../lib/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import StyledSelectTypesContainer from "../../components/Styled/StyledSelectTypesContainer";
import SelectButton from "../../components/Styled/StyledSelectButton";

const URL = process.env.STRAPI_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  // const programsResponse = await fetcher(
  //   `${URL}/study-programmes?populate[typeOfStudies][populate]=*`
  // );
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

const StyledProgramsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLabel = styled.div`
  display: flex;
  width: 100%;
  div:first-child {
    display: flex;
    justify-content: flex-start;
    font-weight: 700;
    min-width: 10rem;
  }
  div:nth-child(2) {
    text-align: left;
  }
`;

const StyledButton = styled.button`
  background-color: ${COLOR.SEC[500]};
  color: ${COLOR.WHITE};
  width: 100%;
  border: 1px solid ${COLOR.BLACK};
`;
const StyledProgramSection = styled.button`
  border: 1px solid ${COLOR.PLATINUM[600]};
  cursor: default;
  padding: 12px;
`;
const StyledSubject = styled.div`
  border: 1px solid ${COLOR.PLATINUM[600]};
  padding: 10px;
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

  const LabelText = ({ label, children }) => {
    return (
      <StyledLabel>
        <div>{label}</div>
        <div>{children || "Nezadane"}</div>
      </StyledLabel>
    );
  };

  const Subject = ({ subject }) => {
    const { longTitle, type, year } = subject || {};
    return (
      <StyledSubject>
        <LabelText label={"Nazov:"}>{longTitle}</LabelText>
        <LabelText label={"Typ:"}>{type}</LabelText>
        <LabelText label={"Rok:"}>{year}</LabelText>
      </StyledSubject>
    );
  };

  const ProgramSection = ({ program }) => {
    const { title, goals, absolventProfile, subjects } = program || {};
    const [open, setOpen] = useState(false);

    function toggleSection() {
      setOpen(!open);
    }

    return (
      <>
        <StyledButton onClick={toggleSection}>{title}</StyledButton>
        {open && (
          <StyledProgramSection>
            <LabelText label={"Profil Absolventa:"}>
              {absolventProfile}
            </LabelText>
            <LabelText label={"Ciele:"}>{goals}</LabelText>
            <div>
              {subjects.data?.map((item) => (
                <Subject key={item.id} subject={item.attributes} />
              ))}
            </div>
          </StyledProgramSection>
        )}
      </>
    );
  };

  return (
    <>
      <StyledHeadingH1>{t("programs")}</StyledHeadingH1>
      <StyledSelectTypesContainer>
        <SelectButton
          onClickHandler={() => setProgramHandler(setBachelorActive)}
          selected={bachelorActive}
        >
          {t("bachelor")}
        </SelectButton>
        <SelectButton
          selected={masterActive}
          onClickHandler={() => setProgramHandler(setMasterActive)}
        >
          {t("master")}
        </SelectButton>
        <SelectButton
          selected={doctoralActive}
          onClickHandler={() => setProgramHandler(setDoctoralActive)}
        >
          {t("doctoral")}
        </SelectButton>
      </StyledSelectTypesContainer>
      <StyledProgramsContainer>
        {bachelorActive && (
          <div
            style={{
              flexGap: "8px",
            }}
          >
            {typeOfStudies.data[0].attributes.studyProgrammes.data.map(
              (program) => (
                <ProgramSection key={program.id} program={program.attributes} />
              )
            )}
          </div>
        )}

        {masterActive && (
          <div
            style={{
              flexGap: "8px",
            }}
          >
            {typeOfStudies.data[1].attributes.studyProgrammes.data.map(
              (program) => (
                <ProgramSection key={program.id} program={program.attributes} />
              )
            )}
          </div>
        )}

        {doctoralActive && (
          <div
            style={{
              flexGap: "8px",
            }}
          >
            {typeOfStudies.data[2].attributes.studyProgrammes.data.map(
              (program) => (
                <ProgramSection key={program.id} program={program.attributes} />
              )
            )}
          </div>
        )}
      </StyledProgramsContainer>
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
