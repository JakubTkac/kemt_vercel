import Link from "next/link";
import { COLOR, SCREENS } from "../../Theme";
import styled from "styled-components";
import NoticePreview from "./NoticePreview";
import { Capitalize } from "../../lib/typography";
import StyledShowAllButton from "../Styled/StyledShowAllButton";
import StyledHeadingH1 from "../Styled/StyledHeadingH1";
import useBetterMediaQuery from "../../utils/useBetterMediaQuery";
import { useTranslation } from "next-i18next";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
  width: 100%;
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
`;

const StyledGridWrapper = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  padding: 2rem 0;
  @media (max-width: ${SCREENS.XL}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${SCREENS.MD}) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${SCREENS.XS}) {
  }
`;

const noticePreviewCount = (data, sliceCount, locale) => {
  return data.data
    .slice(0, sliceCount)
    .map(({ attributes, id }) => (
      <NoticePreview
        key={id}
        heading={attributes.title}
        slug={
          locale === "en"
            ? attributes.localizations.data[0]?.attributes.slug
            : attributes.slug
        }
        date={new Date(attributes.date)}
      ></NoticePreview>
    ));
};

const Notices = ({ data, heading, locale }) => {
  const { t } = useTranslation("common");
  const isLargerThan768 = useBetterMediaQuery("(min-width: 768px)");
  return (
    <>
      <StyledHeadingH1>{Capitalize(heading)}</StyledHeadingH1>
      <StyledGridWrapper>
        {isLargerThan768
          ? noticePreviewCount(data, 9, locale)
          : noticePreviewCount(data, 3, locale)}
      </StyledGridWrapper>
      <Link href="/oznamy">
        <StyledShowAllButton>
          {t("showAll")} {heading}
        </StyledShowAllButton>
      </Link>
    </>
  );
};

export default Notices;
