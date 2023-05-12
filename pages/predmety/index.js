import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SCREENS } from "../../Theme";
import { fetcher } from "../../lib/api";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import StyledSelectTypesContainer from "../../components/Styled/StyledSelectTypesContainer";
import StyledSelectButton from "../../components/Styled/StyledSelectButton";
import SubjectDropdownItem from "../../components/Subjects/SubjectDropdownItem";
import { NextSeo } from "next-seo";

const URL = process.env.STRAPI_URL;

export async function getStaticProps({ locale }) {
  const subjectsResponse = await fetcher(
    `${URL}/subjects?populate=*&sort[0]=[studyYear]title&sort[1]=[studyYear]semester`
  );
  const subjectsWithStudyTypeResponse = await fetcher(
    `${URL}/subjects?populate[studyProgrammes][populate]=type_of_study&sort[0]=[studyYear]title&sort[1]=[studyYear]semester`
  );
  return {
    props: {
      subjectWithStudyType: subjectsWithStudyTypeResponse,
      subjects: subjectsResponse,
      locale: locale,
      ...(await serverSideTranslations(locale, ["subjects"])),
    },
    revalidate: 10,
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

export default function Subjects({ subjects, subjectWithStudyType, locale }) {
  const { t } = useTranslation("subjects");

  const [data, setData] = useState([]);
  const [studyYears, setStudyYears] = useState([]);
  const [bachelorActive, setBachelorActive] = useState(true);
  const [masterActive, setMasterActive] = useState(false);
  const [doctoralActive, setDoctoralActive] = useState(false);

  const setProgram = (setter) => {
    setBachelorActive(false);
    setMasterActive(false);
    setDoctoralActive(false);
    setter(true);
  };
  const handleFilterData = (type) => {
    const tempFilteredData = subjectWithStudyType.data.filter((subject) => {
      return subject.attributes.studyProgrammes.data.some((studyProgramme) => {
        return (
          studyProgramme.attributes.type_of_study.data.attributes.title === type
        );
      });
    });
    const filteredData = subjects.data.filter((subject) => {
      return tempFilteredData
        .map((subject) => {
          return subject.id;
        })
        .includes(subject.id);
    });
    setData(filteredData);
    filterStudyYears(filteredData);
  };
  const filterStudyYears = (filteredData) => {
    const uniqueData = [];
    const set = new Set();
    filteredData.forEach((item) => {
      const title = item.attributes.studyYear.data.attributes.title;
      const titleEN = item.attributes.studyYear.data.attributes.titleEN;
      const semester = item.attributes.studyYear.data.attributes.semester;
      const semesterEN = item.attributes.studyYear.data.attributes.semesterEN;
      const key = `${title}-${semester}`;
      if (!set.has(key)) {
        set.add(key);
        uniqueData.push({
          title,
          titleEN,
          semester,
          semesterEN,
        });
      }
    });
    setStudyYears(uniqueData);
  };
  const buttonHandler = (setter, filterType) => {
    setProgram(setter);
    handleFilterData(filterType);
  };

  const filter = [
    "Bakalárske štúdium",
    "Inžinierské Štúdium",
    "Doktorandské štúdium",
  ];

  useEffect(() => {
    handleFilterData(filter[0]);
  }, []);

  const SEO = {
    title: "KEMT - Študijné predmety",
    description: "KEMT - Študijné predmety",
    openGraph: {
      locale: locale,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <StyledHeadingH1>{t("title")}</StyledHeadingH1>
      <StyledSelectTypesContainer>
        <StyledSelectButton
          selected={bachelorActive}
          onClickHandler={() => buttonHandler(setBachelorActive, filter[0])}
        >
          {t("bachelor")}
        </StyledSelectButton>
        <StyledSelectButton
          selected={masterActive}
          onClickHandler={() => buttonHandler(setMasterActive, filter[1])}
        >
          {t("master")}
        </StyledSelectButton>
        <StyledSelectButton
          selected={doctoralActive}
          onClickHandler={() => buttonHandler(setDoctoralActive, filter[2])}
        >
          {t("doctoral")}
        </StyledSelectButton>
      </StyledSelectTypesContainer>
      <StyledContentContainer>
        {studyYears.map((studyYear, index) => (
          <SubjectDropdownItem
            key={index}
            data={data}
            studyYear={studyYear}
            locale={locale}
          ></SubjectDropdownItem>
        ))}
      </StyledContentContainer>
    </>
  );
}
