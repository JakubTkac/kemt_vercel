import TranslateComponent from "./TranslateComponent";
import ContentWithTitle from "./ContentWithTitle";

const TranslateTitleWithContent = ({ title, content, contentEN, locale }) => {
  return (
    content && (
      <TranslateComponent
        Component={ContentWithTitle}
        locale={locale}
        sk={content}
        en={contentEN}
        title={title}
      ></TranslateComponent>
    )
  );
};

export default TranslateTitleWithContent;
