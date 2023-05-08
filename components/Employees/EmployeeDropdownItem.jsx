import { fetcher } from "../../lib/api";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS, SPACE } from "../../Theme";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";
import TranslateComponent from "../Common/TranslateComponent";
import StyledHeadingH1 from "../Styled/StyledHeadingH1";
import H2 from "../Common/H2";
import TranslateTitleWithContent from "../Common/TranslateTitleWithContent";

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
    authorsOther,
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
              {(authors || authorsOther?.length > 0) && (
                <StyledInformationContentContainer>
                  <span>{t("authors")}</span>
                  <div>
                    <>
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
                      {authorsOther?.map((author) => {
                        return <p key={author.id}>{author.name}</p>;
                      })}
                    </>
                  </div>
                </StyledInformationContentContainer>
              )}
              <TranslateTitleWithContent
                content={shortTitle}
                locale={locale}
                title={t("shortTitle")}
              ></TranslateTitleWithContent>
              <TranslateTitleWithContent
                content={subjectID}
                locale={locale}
                title={t("subjectID")}
              ></TranslateTitleWithContent>

              <TranslateTitleWithContent
                content={description}
                contentEN={descriptionEN}
                locale={locale}
                title={t("description")}
              ></TranslateTitleWithContent>
              <TranslateTitleWithContent
                content={year}
                locale={locale}
                title={t("year")}
              ></TranslateTitleWithContent>
              <TranslateTitleWithContent
                content={publisher}
                locale={locale}
                title={t("publisher")}
              ></TranslateTitleWithContent>
              <TranslateTitleWithContent
                content={anotation}
                contentEN={anotationEN}
                locale={locale}
                title={t("anotation")}
              ></TranslateTitleWithContent>
              <TranslateTitleWithContent
                content={language}
                locale={locale}
                title={t("language")}
              ></TranslateTitleWithContent>
              <TranslateTitleWithContent
                content={type}
                locale={locale}
                title={t("type")}
              ></TranslateTitleWithContent>
              {websitePage && (
                <StyledInformationContentContainer>
                  <span>{t("websitePage")}</span>
                  <a target="_blank" rel="noreferrer" href={websitePage}>
                    <p>{websitePage}</p>
                  </a>
                </StyledInformationContentContainer>
              )}
              <TranslateTitleWithContent
                content={isbn}
                locale={locale}
                title={"ISBN:"}
              ></TranslateTitleWithContent>
              <TranslateTitleWithContent
                content={doi}
                locale={locale}
                title={"DOI:"}
              ></TranslateTitleWithContent>
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
