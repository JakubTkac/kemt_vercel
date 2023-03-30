import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, SPACE, WIDTH } from "../../Theme";
import { fetcher } from "../../lib/api";
import EventPreview from "../../components/Events/EventPreview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const URL = process.env.STRAPI_URL;
const today = new Date().toISOString();
const pagesize = 2;

export async function getServerSideProps({ query: { page } }) {
  const eventsResponse = await fetcher(
    `${URL}/events?filters[startingDate][$gt]=${today}&sort=startingDate%3Aasc&pagination[page]=${
      page || 1
    }&pagination[pageSize]=${pagesize}`
  );
  return {
    props: {
      events: eventsResponse,
      pagination: eventsResponse.meta.pagination,
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

const Index = ({ events, pagination }) => {
  const router = useRouter();
  const { page } = router.query;
  const [pageNum, setPageNum] = useState(parseInt(page) || 1);
  const [pageItems, setPageItems] = useState(events);
  const [pageEvents, setPageEvents] = useState("nadchazdajuce");

  useEffect(() => {
    const fetchPageItems = async () => {
      const tempPageItems = await fetcher(
        `${URL}/events?filters[startingDate][$gt]=${today}&sort=startingDate%3Aasc&pagination[page]=${pageNum}&pagination[pageSize]=${pagination.pageSize}`
      );
      setPageItems(tempPageItems);
    };
    fetchPageItems();
  }, [pageNum]);

  const totalPages = pagination.pageCount;

  const handlePrevClick = () => {
    if (pageNum > 1) {
      router.push(`/udalosti/?page=${pageNum - 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNum < totalPages) {
      router.push(`/udalosti/?page=${pageNum + 1}`, undefined, {
        shallow: true,
      });
      setPageNum(pageNum + 1);
    }
  };

  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledHeadingH1>Udalosti</StyledHeadingH1>
          <StyledButtonWrapper>
            <Link href={"/udalosti"}>
              <StyledPaginationButton>Nadchadzajuce</StyledPaginationButton>
            </Link>
            <Link href={"/udalosti/minule"}>
              <StyledPaginationButton>Predosle</StyledPaginationButton>
            </Link>
          </StyledButtonWrapper>
          {pageItems.data.map(({ attributes, id }) => {
            return (
              <EventPreview
                key={id}
                heading={attributes.title}
                slug={attributes.slug}
                startingDate={new Date(attributes.startingDate)}
                endingDate={attributes.endingDate}
              ></EventPreview>
            );
          })}
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
};

export default Index;
