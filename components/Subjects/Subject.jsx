import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, SCREENS } from "../../Theme";
import Link from "next/link";

const StyledContainer = styled.div`
  width: 100%;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  transition: width 2s, height 4s;
  border: 1px solid ${COLOR.PLATINUM[600]};
  background-color: ${COLOR.WHITE};
  @media (max-width: ${SCREENS.SM}) {
    margin: 0;
  }
`;

const Content = ({ text, content, contentEN, locale }) => {
  return (
    content &&
    (locale === "en" ? (
      contentEN ? (
        <StyledInformationContentContainer>
          <span>{text}</span>
          <p>{contentEN}</p>
        </StyledInformationContentContainer>
      ) : (
        <StyledInformationContentContainer>
          <span>{text}</span>
          <p>{content}</p>
        </StyledInformationContentContainer>
      )
    ) : (
      <StyledInformationContentContainer>
        <span>{text}</span>
        <p>{content}</p>
      </StyledInformationContentContainer>
    ))
  );
};

const Subject = ({ data, locale }) => {
  const { t } = useTranslation("subjects");
  const {
    shortTitle,
    anotation,
    anotationEN,
    completion,
    completionEN,
    credits,
    formOfTeaching,
    hoursPerSemester,
    hoursPerWeek,
    language,
    studyMethod,
    subjectID,
    syllabus,
    syllabusEN,
    type,
    guarantor,
    lecturings,
    studyProgrammes,
    studyYear,
    teaching,
    websitePage,
  } = data;

  return (
    <StyledContainer>
      <Content
        content={shortTitle}
        locale={locale}
        text={t("shortTitle")}
      ></Content>
      <Content
        content={anotation}
        contentEN={anotationEN}
        locale={locale}
        text={t("anotation")}
      ></Content>
      <Content
        content={completion}
        contentEN={completionEN}
        locale={locale}
        text={t("completion")}
      ></Content>
      <Content content={credits} locale={locale} text={t("credits")}></Content>
      <Content
        content={formOfTeaching}
        locale={locale}
        text={t("formOfTeaching")}
      ></Content>
      <Content
        content={hoursPerSemester}
        locale={locale}
        text={t("hoursPerSemester")}
      ></Content>
      <Content
        content={hoursPerWeek}
        locale={locale}
        text={t("hoursPerWeek")}
      ></Content>
      <Content
        content={language}
        locale={locale}
        text={t("language")}
      ></Content>
      <Content
        content={studyMethod}
        locale={locale}
        text={t("studyMethod")}
      ></Content>
      <Content
        content={subjectID}
        locale={locale}
        text={t("subjectID")}
      ></Content>
      {syllabus &&
        (locale === "en" ? (
          syllabusEN ? (
            <StyledInformationContentContainer>
              <span>{t("syllabus")}</span>
              {syllabusEN && (
                <ul>
                  {syllabusEN.split("\n").map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              )}
            </StyledInformationContentContainer>
          ) : (
            <StyledInformationContentContainer>
              <span>{t("syllabus")}</span>
              {syllabus && (
                <ul>
                  {syllabus.split("\n").map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              )}
            </StyledInformationContentContainer>
          )
        ) : (
          <StyledInformationContentContainer>
            <span>{t("syllabus")}</span>
            {syllabus && (
              <ul>
                {syllabus.split("\n").map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            )}
          </StyledInformationContentContainer>
        ))}
      <Content content={type} locale={locale} text={t("type")}></Content>
      {guarantor.data && (
        <StyledInformationContentContainer>
          <span>{t("guarantor")}</span>
          <div>
            <Link href={`/organizacia/${guarantor.data?.attributes.slug}`}>
              <a>
                <p>{guarantor.data?.attributes.name}</p>
              </a>
            </Link>
          </div>
        </StyledInformationContentContainer>
      )}
      {lecturings.data.length > 0 && (
        <StyledInformationContentContainer>
          <span>{t("lecturings")}</span>
          <div>
            {lecturings?.data.map((lecturing) => {
              return (
                <Link
                  key={lecturing.id}
                  href={`/organizacia/${lecturing.attributes.slug}`}
                >
                  <a>
                    <p>{lecturing.attributes.name}</p>
                  </a>
                </Link>
              );
            })}
          </div>
        </StyledInformationContentContainer>
      )}
      {studyProgrammes.data.length > 0 && (
        <StyledInformationContentContainer>
          <span>{t("studyProgrammes")}</span>
          <div>
            {studyProgrammes?.data.map((studyProgramme) => {
              return (
                <Link
                  key={studyProgramme.id}
                  href={`/studijne-programy/${studyProgramme.attributes.slug}`}
                >
                  <a>
                    <p>{studyProgramme.attributes.title}</p>
                  </a>
                </Link>
              );
            })}
          </div>
        </StyledInformationContentContainer>
      )}
      {studyYear && (
        <StyledInformationContentContainer>
          {studyYear &&
            (locale === "en" ? (
              studyYear.data?.attributes.titleEN ? (
                <>
                  <span>{t("studyYear")}</span>
                  <p>
                    {studyYear.data?.attributes.titleEN}
                    {` `}
                    {studyYear.data?.attributes.semesterEN} {` semester`}
                  </p>
                </>
              ) : (
                <>
                  <span>{t("studyYear")}</span>
                  <p>
                    {studyYear.data?.attributes.title}
                    {` `}
                    {studyYear.data?.attributes.semester} {` semester`}
                  </p>
                </>
              )
            ) : (
              <>
                <span>{t("studyYear")}</span>
                <p>
                  {studyYear.data?.attributes.title}
                  {` `}
                  {studyYear.data?.attributes.semester} {` semester`}
                </p>
              </>
            ))}
        </StyledInformationContentContainer>
      )}
      {teaching.data.length > 0 && (
        <StyledInformationContentContainer>
          <span>{t("teaching")}</span>
          <div>
            {teaching?.data.map((teacher) => {
              return (
                <Link
                  key={teacher.id}
                  href={`/organizacia/${teacher.attributes.slug}`}
                >
                  <a>
                    <p>{teacher.attributes.name}</p>
                  </a>
                </Link>
              );
            })}
          </div>
        </StyledInformationContentContainer>
      )}
      {websitePage && (
        <StyledInformationContentContainer>
          <span>{t("websitePage")}</span>
          <a target="_blank" rel="noreferrer" href={websitePage}>
            <p>{websitePage}</p>
          </a>
        </StyledInformationContentContainer>
      )}
    </StyledContainer>
  );
};

export default Subject;
