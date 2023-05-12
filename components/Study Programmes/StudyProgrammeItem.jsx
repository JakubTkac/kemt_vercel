import { COLOR } from "../../Theme";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import TranslateComponent from "../Common/TranslateComponent";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
import H2 from "../Common/H2";
import MoreButton from "../Styled/StyledMoreButton";
import StyledTitleButton from "../Styled/StyledTitleButton";
import TranslateTitleWithContent from "../Common/TranslateTitleWithContent";

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
const StyledSelectTypesContainer = ({ attributes, locale }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("programs");
  const { title, titleEN, absolventProfile, absolventProfileEN, slug } =
    attributes;

  return (
    <StyledContainer
      onClick={() => {
        setOpen(!open);
      }}
    >
      <StyledTitleButton>
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
          <TranslateTitleWithContent
            content={absolventProfile}
            contentEN={absolventProfileEN}
            locale={locale}
            title={t("absolventProfile")}
          ></TranslateTitleWithContent>
          {slug && (
            <Link href={`/studijne-programy/${slug}`} passHref>
              <a>
                <MoreButton>{t("more")}</MoreButton>
              </a>
            </Link>
          )}
        </StyledTransitionContainer>
      )}
    </StyledContainer>
  );
};

export default StyledSelectTypesContainer;
