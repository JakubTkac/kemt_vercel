import { fetcher } from "../../lib/api";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS, SPACE } from "../../Theme";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";

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

const EmployeeDropdownItem = ({ item, itemType, locale }) => {
  const id = itemType === "subjects" ? item.attributes.slug : item.id;
  const itemUrl = `${URL}/${itemType}/${id}?populate=*`;
  const [dropdownItems, setDropdownItems] = useState({});
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("employees");

  useEffect(() => {
    const fetchDropdownItems = async () => {
      const tempPublicationItems = await fetcher(itemUrl);
      setDropdownItems(tempPublicationItems);
    };
    fetchDropdownItems();
  }, [id, itemUrl]);

  const {
    anotation,
    anotationEN,
    doi,
    isbn,
    title,
    titleEN,
    year,
    authors,
    publisher,
    description,
    descriptionEN,
    language,
    shortTitle,
    slug,
    type,
    websitePage,
    subjectID,
  } = dropdownItems?.data?.attributes || {};

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
              {authors && (
                <StyledInformationContentContainer>
                  <span>{t("authors")}</span>
                  <div>
                    {authors?.data.map((author) => {
                      return (
                        <Link
                          key={author.id}
                          href={`/organizacia/${author.attributes.slug}`}
                        >
                          <a>
                            <p>{author.attributes.name}</p>
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </StyledInformationContentContainer>
              )}
              {shortTitle && (
                <StyledInformationContentContainer>
                  <span>{t("shortTitle")}</span>
                  <p>{shortTitle}</p>
                </StyledInformationContentContainer>
              )}
              {subjectID && (
                <StyledInformationContentContainer>
                  <span>{t("subjectID")}</span>
                  <p>{subjectID}</p>
                </StyledInformationContentContainer>
              )}
              {description &&
                (locale === "en" ? (
                  descriptionEN ? (
                    <StyledInformationContentContainer>
                      <span>{t("description")}</span>
                      <p>{descriptionEN}</p>
                    </StyledInformationContentContainer>
                  ) : (
                    <StyledInformationContentContainer>
                      <span>{t("description")}</span>
                      <p>{description}</p>
                    </StyledInformationContentContainer>
                  )
                ) : (
                  <StyledInformationContentContainer>
                    <span>{t("description")}</span>
                    <p>{description}</p>
                  </StyledInformationContentContainer>
                ))}
              {year && (
                <StyledInformationContentContainer>
                  <span>{t("year")}</span>
                  <p>{year}</p>
                </StyledInformationContentContainer>
              )}
              {publisher && (
                <StyledInformationContentContainer>
                  <span>{t("publisher")}</span>
                  <p>{publisher}</p>
                </StyledInformationContentContainer>
              )}
              {anotation &&
                (locale === "en" ? (
                  anotationEN ? (
                    <StyledInformationContentContainer>
                      <span>{t("anotation")}</span>
                      <p>{anotationEN}</p>
                    </StyledInformationContentContainer>
                  ) : (
                    <StyledInformationContentContainer>
                      <span>{t("anotation")}</span>
                      <p>{anotation}</p>
                    </StyledInformationContentContainer>
                  )
                ) : (
                  <StyledInformationContentContainer>
                    <span>{t("anotation")}</span>
                    <p>{anotation}</p>
                  </StyledInformationContentContainer>
                ))}
              {language && (
                <StyledInformationContentContainer>
                  <span>{t("language")}</span>
                  <p>{language}</p>
                </StyledInformationContentContainer>
              )}
              {type && (
                <StyledInformationContentContainer>
                  <span>{t("type")}</span>
                  <p>{type}</p>
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
              {isbn && (
                <StyledInformationContentContainer>
                  <span>ISBN:</span>
                  <p>{isbn}</p>
                </StyledInformationContentContainer>
              )}
              {doi && (
                <StyledInformationContentContainer>
                  <span>DOI:</span>
                  <p>{doi}</p>
                </StyledInformationContentContainer>
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

export default EmployeeDropdownItem;
