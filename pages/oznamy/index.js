import { fetcher } from "../../lib/api";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, SPACE, WIDTH } from "../../Theme";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import NoticeShowAllPreview from "../../components/Notices/NoticeShowAllPreview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const URL = process.env.STRAPI_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  const noticeResponse = await fetcher(
    `${URL}/notices?locale=${locale}&populate=*&sort=date%3Adesc&pagination[page]=${
      page || 1
    }&pagination[pageSize]=4`
  );
  return {
    props: {
      locale: locale,
      notices: noticeResponse,
      pagination: noticeResponse.meta.pagination,
    },
  };
}
const LandingContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 85.8vh;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 ${WIDTH.XXS};
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 ${WIDTH.XXXXXS};
    align-items: start;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 ${WIDTH.XXXXXXS};
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0 ${WIDTH.MOBILE};
    flex-direction: column;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
  width: 100%;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
`;

const StyledNoticesWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2em;
`;

const StyledPaginationButton = styled.button`
  width: 16rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: ${COLOR.SEC.DEFAULT};
  color: ${COLOR.WHITE};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${FONT_SIZE.M};
  height: ${SPACE.XL};
  border: ${COLOR.SEC[600]} 1px solid;
  @media (max-width: ${SCREENS.XL}) {
    height: ${SPACE.L};
    width: 12rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    height: ${SPACE.XL};
    width: 8rem;
  }
  @media (max-width: ${SCREENS.XS}) {
    height: ${SPACE.L};
    font-size: ${FONT_SIZE.S};
    width: 6rem;
  }
  &:hover {
    background-color: ${COLOR.SEC[300]};
  }
  &:disabled {
    color: ${COLOR.BLACK};
    background-color: ${COLOR.SEC[50]};
    cursor: not-allowed;
  }
`;

const StyledButtonWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;
`;

function Index({ notices, pagination, locale }) {
  const router = useRouter();
  const currentLocale = router.locale;
  const { page } = router.query;
  const [pageNum, setPageNum] = useState(parseInt(page) || 1);
  const [pageItems, setPageItems] = useState(notices);

  useEffect(() => {
    const fetchPageItems = async () => {
      const tempPageItems = await fetcher(
        `${URL}/notices?locale=${locale}&populate=*&sort=date%3Adesc&pagination[page]=${pageNum}&pagination[pageSize]=${pagination.pageSize}`
      );
      setPageItems(tempPageItems);
    };
    fetchPageItems();
  }, [pageNum, currentLocale]);

  const totalPages = pagination.pageCount;

  const handlePrevClick = () => {
    if (pageNum > 1) {
      router.push(`/oznamy/?page=${pageNum - 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNum < totalPages) {
      router.push(`/oznamy/?page=${pageNum + 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum + 1);
    }
  };

  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledHeadingH1>Oznamy</StyledHeadingH1>
          <StyledNoticesWrapper>
            {pageItems.data.map(({ id, attributes }) => {
              return (
                <NoticeShowAllPreview
                  key={id}
                  date={new Date(attributes.date)}
                  title={attributes.title}
                  slug={
                    locale === "en"
                      ? attributes.localizations.data[0].attributes.slug
                      : attributes.slug
                  }
                  content={attributes.content}
                ></NoticeShowAllPreview>
              );
            })}
          </StyledNoticesWrapper>
          <StyledButtonWrapper>
            <StyledPaginationButton
              onClick={handlePrevClick}
              disabled={pageNum === 1}
            >
              Predosla
            </StyledPaginationButton>
            <StyledPaginationButton
              onClick={handleNextClick}
              disabled={pageNum === totalPages}
            >
              Nasledujuca
            </StyledPaginationButton>
          </StyledButtonWrapper>
        </StyledContainer>
      </StyledFlex>
    </LandingContainer>
  );
}

export default Index;
