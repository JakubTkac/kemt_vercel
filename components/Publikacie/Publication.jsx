import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";
import Link from "next/link";
import TranslateTitleWithContent from "../Common/TranslateTitleWithContent";
import StyledTitleButton from "../Styled/StyledTitleButton";
import TranslateComponent from "../Common/TranslateComponent";
import H2 from "../Common/H2";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styled, { keyframes } from "styled-components";
import { COLOR } from "../../Theme";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  transition: width 2s, height 4s;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledTransitionContainer = styled.div`
  opacity: 0;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

const Publication = ({ attributes, locale }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("publications");
  const {
    title,
    titleEN,
    slug,
    anotation,
    anotationEN,
    authors,
    authorsOther,
    doi,
    isbn,
    publisher,
    year,
    description,
    descriptionEN,
  } = attributes;

  return (
    <StyledContainer>
      <StyledTitleButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <TranslateComponent
          Component={H2}
          locale={locale}
          en={titleEN}
          sk={title}
        ></TranslateComponent>
        {open ? <FiChevronUp></FiChevronUp> : <FiChevronDown></FiChevronDown>}
      </StyledTitleButton>
      {open && (
        <StyledTransitionContainer>
          {(authors.length > 0 || authorsOther?.length > 0) && (
            <StyledInformationContentContainer>
              <span>{t("authors")}</span>
              <div>
                <>
                  {authors?.data.map((author) => {
                    return (
                      <Link
                        key={author.id}
                        href={`/organizacia/${author.attributes.slug}`}
                        passHref
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
            content={description}
            contentEN={descriptionEN}
            locale={locale}
            title={t("description")}
          ></TranslateTitleWithContent>
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
        </StyledTransitionContainer>
      )}
    </StyledContainer>
  );
};

export default Publication;
