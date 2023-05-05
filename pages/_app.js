import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStyle from "../config/global";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { appWithTranslation } from "next-i18next";
import Wrapper from "../components/Styled/Wrapper";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ChakraProvider>
        <Header />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
// export default MyApp;
