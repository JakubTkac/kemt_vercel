import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS, WIDTH } from "../../Theme";
import { FiChevronRight } from "react-icons/fi";
import React, { Fragment } from "react";

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

const StyledBreadcrumb = styled.nav`
  width: 100%;
  background-color: ${COLOR.SEC[500]};
  padding: 0 2rem;
  height: 100%;
  @media (max-width: ${SCREENS.MD}) {
    padding: 0 1rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    padding: 0 0.5rem;
    font-size: ${FONT_SIZE.XS};
    //test
  }
  ul {
    height: 100%;
    color: ${COLOR.WHITE};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    gap: 1rem;
    @media (max-width: ${SCREENS.MD}) {
      gap: 0.5rem;
    }
    @media (max-width: ${SCREENS.SM}) {
      gap: 0.25rem;
    }
  }
  button {
    padding: 0.5rem 0;
    height: 100%;
  }
`;
const Breadcrumb = () => {
  const router = useRouter();
  const { asPath } = router;

  const pathSegments = asPath.split("/").filter((segment) => segment !== "");

  return (
    <StyledFlex>
      <StyledBreadcrumb>
        <ul>
          <li>
            <Link href={"/"}>
              <a>
                <button>KEMT</button>
              </a>
            </Link>
          </li>
          <FiChevronRight />
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <li>
                {index === pathSegments.length - 1 ? (
                  <button>{segment.toUpperCase().replace(/-/g, " ")}</button>
                ) : (
                  <Link href={`/${segment}`}>
                    <a>
                      <button>
                        {segment.toUpperCase().replace(/-/g, " ")}
                      </button>
                    </a>
                  </Link>
                )}
              </li>
              {index !== pathSegments.length - 1 && <FiChevronRight />}
            </React.Fragment>
          ))}
        </ul>
      </StyledBreadcrumb>
    </StyledFlex>
  );
};

export default Breadcrumb;
