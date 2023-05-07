import ReactMarkdown from "react-markdown";
import TranslateComponent from "./TranslateComponent";
import MarkdownContent from "../Styled/StyledMarkdownContent";

const PageMarkdownConverter = ({ content, contentEN, locale }) => {
  return (
    <MarkdownContent>
      <TranslateComponent
        Component={ReactMarkdown}
        en={contentEN}
        sk={content}
        locale={locale}
      ></TranslateComponent>
    </MarkdownContent>
  );
};

export default PageMarkdownConverter;
