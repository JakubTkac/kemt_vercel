import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, SCREENS } from "../../Theme";
import Link from "next/link";
import TranslateTitleWithContent from "../Common/TranslateTitleWithContent";
import StyledSingleItemContainer from "../Styled/StyledSingleItemContainer";
import TranslateComponent from "../Common/TranslateComponent";
import P from "../Common/P";

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
    </StyledSingleItemContainer>
  );
};

export default StudyProgramme;
