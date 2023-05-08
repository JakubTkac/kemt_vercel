import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, FONT_WEIGHT, SCREENS } from "../../Theme";
import Link from "next/link";
import TranslateTitleWithContent from "../Common/TranslateTitleWithContent";
import StyledSingleItemContainer from "../Styled/StyledSingleItemContainer";
import TranslateComponent from "../Common/TranslateComponent";
import P from "../Common/P";

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-weight: ${FONT_WEIGHT.BOLD};
  }

  div {
    margin-bottom: 0.5rem;
    border: 1px solid ${COLOR.PLATINUM[600]};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
  p {
  }
`;

const StudyProgramme = ({ data, locale }) => {
  const { t } = useTranslation("programs");
  const {
    absolventProfile,
    absolventProfileEN,
    goals,
    goalsEN,
    slug,
    subjects,
    type_of_study,
  } = data;

  const years = [
    "1-rocnik-zimny",
    "1-rocnik-letny",
    "2-rocnik-zimny",
    "2-rocnik-letny",
    "3-rocnik-zimny",
    "3-rocnik-letny",
    "4-rocnik-zimny",
    "4-rocnik-letny",
    "5-rocnik-zimny",
    "5-rocnik-letny",
  ];

  const newSubjects = {};
  function createNewSubjects(subjects) {
    subjects.data.forEach((subject) => {
      const studyYearSlug = subject.attributes.studyYear.data.attributes.slug;
      if (!newSubjects[studyYearSlug]) {
        newSubjects[studyYearSlug] = [];
      }
      newSubjects[studyYearSlug].push(subject);
    });

    return newSubjects;
  }
  createNewSubjects(subjects);

  return (
    <StyledSingleItemContainer>
      <TranslateTitleWithContent
        content={type_of_study.data.attributes.title}
        contentEN={type_of_study.data.attributes.titleEN}
        locale={locale}
        title={t("type_of_study")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={absolventProfile}
        contentEN={absolventProfileEN}
        locale={locale}
        title={t("absolventProfile")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={goals}
        contentEN={goalsEN}
        locale={locale}
        title={t("goals")}
      ></TranslateTitleWithContent>
      {subjects.data.length > 0 && (
        <StyledInformationContentContainer>
          <span>{t("subjects")}</span>
          <div>
            {subjects?.data.map((subject) => {
              return (
                <Link
                  key={subject.id}
                  href={`/predmety/${subject.attributes.slug}`}
                >
                  <a>
                    <TranslateComponent
                      Component={P}
                      locale={locale}
                      sk={subject.attributes.title}
                      en={subject.attributes.titleEN}
                    ></TranslateComponent>
                  </a>
                </Link>
              );
            })}
          </div>
        </StyledInformationContentContainer>
      )}
      {newSubjects && (
        <StyledInformationContentContainer>
          <span>{t("subjects")}</span>
          <StyledTable>
            {years.map((year) => {
              return (
                newSubjects[year] && (
                  <>
                    <h2>{t(year)}</h2>
                    <div>
                      {newSubjects[year]?.map((subject) => {
                        return (
                          <Link
                            key={subject.id}
                            href={`/predmety/${subject.attributes.slug}`}
                          >
                            <a>
                              <TranslateComponent
                                Component={P}
                                locale={locale}
                                sk={subject.attributes.title}
                                en={subject.attributes.titleEN}
                              ></TranslateComponent>
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )
              );
            })}
          </StyledTable>
        </StyledInformationContentContainer>
      )}
    </StyledSingleItemContainer>
  );
};

export default StudyProgramme;
