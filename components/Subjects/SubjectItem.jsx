import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS, SPACE } from "../../Theme";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";
import TranslateComponent from "../Common/TranslateComponent";
import H2 from "../Common/H2";
import ContentWithTitle from "../Common/ContentWithTitle";
import MoreButton from "../Styled/StyledMoreButton";
import StyledTitle from "../Styled/StyledTitle";
import TranslateTitleWithContent from "../Common/TranslateTitleWithContent";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledContainer = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  transition: width 2s, height 4s;
  @media (max-width: ${SCREENS.SM}) {
    margin: 0;
  }
`;

const StyledTransitionContainer = styled.div`
  opacity: 0;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

const SubjectItem = ({ locale, dropdownItems }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("subjects");

  const {
    anotation,
    anotationEN,
    guarantor,
    lecturings,
    title,
    titleEN,
    language,
    shortTitle,
    studyProgrammes,
    teaching,
    slug,
    type,
    websitePage,
    subjectID,
  } = dropdownItems?.attributes || {};

  return (
    <>
      <>
        <StyledContainer>
          <StyledTitle
            onClick={() => {
              setOpen(!open);
            }}
          >
            <TranslateComponent
              Component={H2}
              locale={locale}
              sk={title}
              en={titleEN}
            ></TranslateComponent>
            {open ? (
              <FiChevronUp></FiChevronUp>
            ) : (
              <FiChevronDown></FiChevronDown>
            )}
          </StyledTitle>
          {open && (
            <StyledTransitionContainer>
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
              {slug && (
                <Link href={`/predmety/${slug}`}>
                  <a>
                    <MoreButton>{t("more")}</MoreButton>
                  </a>
                </Link>
              )}
            </StyledTransitionContainer>
          )}
        </StyledContainer>
      </>
    </>
  );
};

export default SubjectItem;
