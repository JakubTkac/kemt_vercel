import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS, WIDTH } from "../../../Theme";
import { FiChevronRight } from "react-icons/fi";
import { translateArray } from "./BreadcrumbItems";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";
import React from "react";

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
  const locale = router.locale;

  const pathSegments = asPath.split("/").filter((segment) => segment !== "");

  const replacePathSegments = (pathSegments, translateArray, locale) => {
    return pathSegments.map((segment) => {
      const translation = translateArray.find((item) => item.slug === segment);
      if (translation) {
        return locale === "en" ? translation.titleEN : translation.title;
      }
      return segment;
    });
  };
  const updatedPathSegments = replacePathSegments(
    pathSegments,
    translateArray,
    locale
  );

  return (
    <StyledFlex>
      <StyledBreadcrumb>
        <ul>
          <li>
            <Link href={"/"} passHref>
              <a>
                <button aria-label={"Home Button"}>KEMT</button>
              </a>
            </Link>
          </li>
          <FiChevronRight />
          {updatedPathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <li>
                {index === pathSegments.length - 1 ? (
                  <button>
                    {segment.toUpperCase().replace(/-/g, " ").split("?")[0]}
                  </button>
                ) : (
                  <Link href={`/${pathSegments[index]}`} passHref>
                    <a>
                      <button>
                        {segment.toUpperCase().replace(/-/g, " ").split("?")[0]}
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
