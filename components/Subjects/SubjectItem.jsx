import { fetcher } from "../../lib/api";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS, SPACE } from "../../Theme";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useTranslation } from "next-i18next";

const URL = process.env.STRAPI_URL;

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

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  transition: width 2s, height 4s;
  @media (max-width: ${SCREENS.SM}) {
    flex-direction: column;
  }
  span {
    min-width: 15rem;
    font-weight: ${FONT_WEIGHT.BOLD};
    @media (max-width: ${SCREENS.SM}) {
      min-width: auto;
    }
  }
  p {
  }
  a {
    color: ${COLOR.SEC[400]};
    text-decoration: underline;
  }
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
  @media (max-width: ${SCREENS.XS}) {
    padding: 0.2rem;
  }
  h2 {
    font-size: ${FONT_SIZE.L};
    color: ${COLOR.SEC[500]};
    font-weight: ${FONT_WEIGHT.EXTRABOLD};
    @media (max-width: ${SCREENS.MD}) {
      font-weight: ${FONT_WEIGHT.BOLDER};
      font-size: ${FONT_SIZE.M};
    }
  }
  svg {
    font-size: ${FONT_SIZE.XL};
    color: ${COLOR.SEC[500]};
  }
`;

const StyledMoreButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: ${COLOR.SEC.DEFAULT};
  color: ${COLOR.WHITE};
  text-align: center;
  font-weight: 500;
  font-size: ${FONT_SIZE.M};
  min-height: ${SPACE.XL};
  border: ${COLOR.SEC[600]} 1px solid;
  margin-top: 2rem;
  @media (max-width: ${SCREENS.XL}) {
    min-height: ${SPACE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    min-height: ${SPACE.XL};
  }
  @media (max-width: ${SCREENS.XS}) {
    min-height: ${SPACE.L};
  }
  &:hover {
    background-color: ${COLOR.SEC[300]};
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
  console.log(dropdownItems);

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
            {locale === "en" ? (
              titleEN ? (
                <h2>{titleEN}</h2>
              ) : (
                <h2>{title}</h2>
              )
            ) : (
              <h2>{title}</h2>
            )}
            {open ? (
              <FiChevronUp></FiChevronUp>
            ) : (
              <FiChevronDown></FiChevronDown>
            )}
          </StyledTitle>
          {open && (
            <StyledTransitionContainer>
              {shortTitle && (
                <StyledContentContainer>
                  <span>{t("shortTitle")}</span>
                  <p>{shortTitle}</p>
                </StyledContentContainer>
              )}
              <StyledContentContainer>
                <span>{t("subjectID")}</span>
                <p>{subjectID}</p>
              </StyledContentContainer>
              {anotation &&
                (locale === "en" ? (
                  anotationEN ? (
                    <StyledContentContainer>
                      <span>{t("anotation")}</span>
                      <p>{anotationEN}</p>
                    </StyledContentContainer>
                  ) : (
                    <StyledContentContainer>
                      <span>{t("anotation")}</span>
                      <p>{anotation}</p>
                    </StyledContentContainer>
                  )
                ) : (
                  <StyledContentContainer>
                    <span>{t("anotation")}</span>
                    <p>{anotation}</p>
                  </StyledContentContainer>
                ))}
              {language && (
                <StyledContentContainer>
                  <span>{t("language")}</span>
                  <p>{language}</p>
                </StyledContentContainer>
              )}
              {type && (
                <StyledContentContainer>
                  <span>{t("type")}</span>
                  <p>{type}</p>
                </StyledContentContainer>
              )}
              {websitePage && (
                <StyledContentContainer>
                  <span>{t("websitePage")}</span>
                  <a target="_blank" rel="noreferrer" href={websitePage}>
                    <p>{websitePage}</p>
                  </a>
                </StyledContentContainer>
              )}
              {slug && (
                <Link href={`/predmety/${slug}`}>
                  <a>
                    <StyledMoreButton>{t("more")}</StyledMoreButton>
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
