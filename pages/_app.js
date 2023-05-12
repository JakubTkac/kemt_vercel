import "../styles/globals.css";
import GlobalStyle from "../config/global";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { appWithTranslation } from "next-i18next";
import Wrapper from "../components/Styled/Wrapper";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { COLOR, FONT_SIZE, SCREENS, SPACE } from "../Theme";
import { FiArrowUp } from "react-icons/fi";
import { ChakraProvider } from "@chakra-ui/react";
import Breadcrumb from "../components/Common/Breadcrumb";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo-config.js";
import { useRouter } from "next/router";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";
import Head from "next/head";

const StyledTopButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 3rem;
  z-index: 200;
  outline: none;
  cursor: pointer;
  padding: 0.5rem;
  text-align: center;
  font-weight: 500;
  font-size: ${FONT_SIZE.XL};
  min-height: ${SPACE.XL};
  background-color: ${COLOR.SEC.DEFAULT};
  color: ${COLOR.WHITE};
  border: ${COLOR.SEC[600]} 1px solid;
  &:hover {
    background-color: ${COLOR.SEC[300]};
  }
  @media (max-width: ${SCREENS.XL}) {
    font-size: ${FONT_SIZE.M};
    right: 0.7rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    display: none;
  }
`;

function MyApp({ Component, pageProps }) {
  const [showButton, setShowButton] = useState(false);
  const { locale } = useRouter();

  useEffect(() => {
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 110) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <DefaultSeo {...SEO} />
      <GlobalStyle />
      <ChakraProvider>
        <Header />
        <Breadcrumb />
        <Wrapper>
          <Component {...pageProps} />
          {showButton && (
            <StyledTopButton
              onClick={handleButtonClick}
              aria-label={
                locale === "en"
                  ? "Back to the top of the page"
                  : "Vraťte sa naspäť na vrch stránky"
              }
            >
              <FiArrowUp></FiArrowUp>
            </StyledTopButton>
          )}
        </Wrapper>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
// export default MyApp;
