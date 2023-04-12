import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStyle from "../config/global";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
// export default MyApp;
