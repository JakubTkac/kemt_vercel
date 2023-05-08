import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import TranslateTitleWithContent from "../Common/TranslateTitleWithContent";
import StyledSingleItemContainer from "../Styled/StyledSingleItemContainer";

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
    <StyledSingleItemContainer>
      <TranslateTitleWithContent
        content={shortTitle}
        locale={locale}
        title={t("shortTitle")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={anotation}
        contentEN={anotationEN}
        locale={locale}
        title={t("anotation")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={completion}
        contentEN={completionEN}
        locale={locale}
        title={t("completion")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={credits}
        locale={locale}
        title={t("credits")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={formOfTeaching}
        locale={locale}
        title={t("formOfTeaching")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={hoursPerSemester}
        locale={locale}
        title={t("hoursPerSemester")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={hoursPerWeek}
        locale={locale}
        title={t("hoursPerWeek")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={language}
        locale={locale}
        title={t("language")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={studyMethod}
        locale={locale}
        title={t("studyMethod")}
      ></TranslateTitleWithContent>
      <TranslateTitleWithContent
        content={subjectID}
        locale={locale}
        title={t("subjectID")}
      ></TranslateTitleWithContent>
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
      <TranslateTitleWithContent
        content={type}
        locale={locale}
        title={t("type")}
      ></TranslateTitleWithContent>
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
          <div>
            <a target="_blank" rel="noreferrer" href={websitePage}>
              <p>{websitePage}</p>
            </a>
          </div>
        </StyledInformationContentContainer>
      )}
    </StyledSingleItemContainer>
  );
};

export default Subject;
