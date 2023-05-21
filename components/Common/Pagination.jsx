import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, SPACE, WIDTH } from "../../Theme";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FiArrowLeft, FiArrowRight, FiMoreHorizontal } from "react-icons/fi";

const StyledPaginationButton = styled.button`
  width: ${WIDTH.XS};
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
  }
  @media (max-width: ${SCREENS.LG}) {
    width: ${WIDTH.XXS};
    font-size: ${FONT_SIZE.S};
  }
  @media (max-width: ${SCREENS.MD}) {
    padding: 0.5rem;
    height: ${SPACE.XXL};
  }
  @media (max-width: ${SCREENS.SM}) {
    display: flex;
    text-align: center;
    justify-content: center;
    width: 7rem;
  }
  @media (max-width: ${SCREENS.XS}) {
    width: 5rem;
    padding: 0.5rem;
    height: ${SPACE.XXL};
    font-size: ${FONT_SIZE.S};
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

const StyledPaginationWrapper = styled.div`
  margin: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;
  @media (max-width: ${SCREENS.SM}) {
    gap: 0.5rem;
  }
`;

const StyledPageNumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    gap: 1rem;
    svg {
      font-size: ${FONT_SIZE.M};
    }
  }
  @media (max-width: ${SCREENS.SM}) {
    gap: 0.5rem;
    svg {
      font-size: ${FONT_SIZE.S};
    }
  }
`;

const StyledPageNumber = styled.button`
  padding: 1rem;
  width: ${WIDTH.XXXXS};
  font-size: ${FONT_SIZE.M};
  background-color: ${(props) =>
    props.selected ? COLOR.PRI[400] : COLOR.SEC[400]};
  color: ${(props) => (props.selected ? COLOR.BLACK : COLOR.WHITE)};
  border: ${COLOR.SEC[600]} 1px solid;
  @media (max-width: ${SCREENS.LG}) {
    width: ${WIDTH.XXXXXS};
    font-size: ${FONT_SIZE.S};
  }
  @media (max-width: ${SCREENS.MD}) {
    width: ${WIDTH.XXXXXS};
  }
  @media (max-width: ${SCREENS.SM}) {
    display: flex;
    text-align: center;
    justify-content: center;
    width: ${WIDTH.MOBILE};
    padding: 1rem;
  }

  @media (max-width: ${SCREENS.XS}) {
  }
`;

const Pagination = ({ pageNum, totalPages, url, setter, locale }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const handlePrevClick = () => {
    if (pageNum > 1) {
      router.push(`${url}${pageNum - 1}`, undefined, {
        shallow: true,
      });
      setter(pageNum - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNum < totalPages) {
      router.push(`${url}${pageNum + 1}`, undefined, {
        shallow: true,
      });
      setter(pageNum + 1);
    }
  };

  const handleFirstPage = () => {
    router.push(`${url}${1}`, undefined, {
      shallow: true,
    });
    setter(1);
  };

  const handleLastPage = () => {
    router.push(`${url}${totalPages}`, undefined, {
      shallow: true,
    });
    setter(totalPages);
  };

  const handlePage = (page) => {
    router.push(`${url}${page}`, undefined, {
      shallow: true,
    });
    setter(page);
  };

  const FirstPage = () => {
    return (
      <>
        {totalPages > 2 && (
          <StyledPageNumber onClick={() => handlePage(pageNum + 1)}>
            <span>{pageNum + 1}</span>
          </StyledPageNumber>
        )}
        {totalPages > 3 && <FiMoreHorizontal />}
      </>
    );
  };

  const Page = () => {
    return (
      <>
        {pageNum > 2 && <FiMoreHorizontal />}
        {pageNum > 1 && totalPages > 2 && (
          <StyledPageNumber selected={true} onClick={() => handlePage(pageNum)}>
            <span>{pageNum}</span>
          </StyledPageNumber>
        )}
        {totalPages > 4 && pageNum < totalPages - 1 && <FiMoreHorizontal />}
      </>
    );
  };

  const LastPage = () => {
    return (
      <>
        {pageNum > 3 && <FiMoreHorizontal />}
        {totalPages > 1 && (
          <StyledPageNumber onClick={() => handlePage(pageNum - 1)}>
            <span>{pageNum - 1}</span>
          </StyledPageNumber>
        )}
      </>
    );
  };

  return (
    <StyledPaginationWrapper>
      <StyledPaginationButton
        onClick={handlePrevClick}
        disabled={pageNum === 1}
        aria-label={
          locale === "en"
            ? "Click to return to previous page"
            : "Kliknite aby ste sa dostali na predošlu stranu"
        }
      >
        <FiArrowLeft></FiArrowLeft>
      </StyledPaginationButton>
      <StyledPageNumberWrapper>
        <StyledPageNumber selected={pageNum === 1} onClick={handleFirstPage}>
          <span>1</span>
        </StyledPageNumber>
        {pageNum === 1 && <FirstPage />}
        {pageNum > 1 && pageNum < totalPages && <Page />}
        {pageNum === totalPages && <LastPage />}
        {totalPages === 1 ? (
          <></>
        ) : (
          <StyledPageNumber
            selected={pageNum === totalPages}
            onClick={handleLastPage}
          >
            <span>{totalPages}</span>
          </StyledPageNumber>
        )}
      </StyledPageNumberWrapper>
      <StyledPaginationButton
        onClick={handleNextClick}
        disabled={pageNum === totalPages}
        aria-label={
          locale === "en"
            ? "Click to return to next page"
            : "Kliknite aby ste sa dostali na ďalšiu stranu"
        }
      >
        <FiArrowRight></FiArrowRight>
      </StyledPaginationButton>
    </StyledPaginationWrapper>
  );
};

export default Pagination;
