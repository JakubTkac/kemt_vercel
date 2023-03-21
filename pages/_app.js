import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStyle from "../config/global";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Wrapper from "../components/Styled/Wrapper";

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

export default MyApp;
