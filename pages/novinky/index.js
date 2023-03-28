import { fetcher } from "../../lib/api";
import Theme, { COLOR, FONT_SIZE, SCREENS, SPACE, WIDTH } from "../../Theme";
import styled from "styled-components";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import NewsShowAllPreview from "../../components/News/NewsShowAllPreview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const URL = process.env.STRAPI_URL;
// populate=*&pagination[page]=1&pagination[pageSize]=10
export async function getStaticProps() {
  const newsResponse = await fetcher(
    `${URL}/news?populate=*&pagination[page]=1&pagination[pageSize]=4`
  );
  return {
    props: {
      news: newsResponse,
      pagination: newsResponse.meta.pagination,
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
  justify-content: center;
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

const StyledNewsWrapper = styled.ul`
  margin-top: 3rem;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 2rem;
  @media (max-width: ${SCREENS.SM}) {
    justify-content: center;
    gap: 1em;
  }
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
  }
  @media (max-width: ${SCREENS.MD}) {
    height: ${SPACE.XL};
  }
  @media (max-width: ${SCREENS.XS}) {
    height: ${SPACE.L};
  }
  &:hover {
    background-color: ${COLOR.SEC[300]};
  }
  &:disabled {
    color: ${COLOR.BLACK};
    background-color: ${COLOR.SEC[50]};
    cursor: not-allowed;
  }
\`;
`;
const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;
`;

//bug: it always shows first page when called at any page

const Index = ({ news, pagination }) => {
  const router = useRouter();
  const { page } = router.query;
  const [pageNum, setPageNum] = useState(parseInt(page) || 1);
  const [pageItems, setPageItems] = useState(news);

  useEffect(() => {
    const fetchPageItems = async () => {
      const tempPageItems = await fetcher(
        `${URL}/news?populate=*&pagination[page]=${pageNum}&pagination[pageSize]=${pagination.pageSize}`
      );
      setPageItems(tempPageItems);
    };
    fetchPageItems();
    console.log("useEffect, New pageItems: ", pageItems);
  }, [pageNum]);

  const totalPages = pagination.pageCount;

  const handlePrevClick = () => {
    if (pageNum > 1) {
      router.push(`/novinky/?page=${pageNum - 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNum < totalPages) {
      router.push(`/novinky/?page=${pageNum + 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum + 1);
    }
  };

  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledHeadingH1>Novinky</StyledHeadingH1>
          <StyledNewsWrapper>
            {pageItems.data.map(({ id, attributes }) => {
              console.log("page items inside map", attributes);
              return (
                <NewsShowAllPreview
                  key={id}
                  date={new Date(attributes.date)}
                  title={attributes.title}
                  slug={attributes.slug}
                  content={attributes.content}
                  img={attributes.image.data.attributes.url}
                ></NewsShowAllPreview>
              );
            })}
          </StyledNewsWrapper>
          <StyledButtonWrapper>
            <StyledPaginationButton
              onClick={handlePrevClick}
              page={pageNum}
              maxPage={totalPages}
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
};

export default Index;
