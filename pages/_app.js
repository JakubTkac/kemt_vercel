import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStyle from "../config/global";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { appWithTranslation } from "next-i18next";
import Wrapper from "../components/Styled/Wrapper";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { COLOR, FONT_SIZE, SCREENS, SPACE } from "../Theme";
import { FiArrowUp } from "react-icons/fi";

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

  useEffect(() => {
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      console.log(showButton);
      if (currentScrollPos > 150) {
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
      <GlobalStyle />
      <ChakraProvider>
        <Header />
        <Wrapper>
          <Component {...pageProps} />
          {showButton && (
            <StyledTopButton onClick={handleButtonClick}>
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
