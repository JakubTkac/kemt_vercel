import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHT,
  SCREENS,
  WIDTH,
} from "../../Theme";
import { fetcher } from "../../lib/api";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import StyledSelectTypesContainer from "../../components/Styled/StyledSelectTypesContainer";
import StyledSelectButton from "../../components/Styled/StyledSelectButton";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SubjectDropdownItem from "../../components/Subjects/SubjectDropdownItem";

const URL = process.env.STRAPI_URL;
const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

export async function getServerSideProps({ query: { page }, locale }) {
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
  };
}

const StyledContentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  @media (max-width: ${SCREENS.SM}) {
    width: 100%;
  }
`;

const StyledSubjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  transition: width 2s, height 4s;
`;

const StyledTitle = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.5rem;
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  h2 {
    font-size: ${FONT_SIZE.L};
    color: ${COLOR.SEC[500]};
    font-weight: ${FONT_WEIGHT.EXTRABOLD};
  }
  svg {
    font-size: ${FONT_SIZE.XL};
    color: ${COLOR.SEC[500]};
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

  return (
    <>
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
        {studyYears.map((studyYear) => (
          <>
            <SubjectDropdownItem
              data={data}
              studyYear={studyYear}
              locale={locale}
            ></SubjectDropdownItem>
          </>
        ))}
      </StyledContentContainer>
    </>
  );
}
