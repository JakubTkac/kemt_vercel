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

  const LabelText = ({ label, children }) => {
    return (
      <StyledLabel>
        <div>{label}</div>
        <div>{children || "Nezadane"}</div>
      </StyledLabel>
    );
  };

  const StyledSubject = styled.div`
    border: 1px solid ${COLOR.PLATINUM[600]};
    padding: 10px;
  `;

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
  console.log("study", typeOfStudies);

  return (
    <>
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
    </>
  );
}
