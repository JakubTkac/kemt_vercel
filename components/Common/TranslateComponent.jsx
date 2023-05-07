const TranslateComponent = ({ Component, sk, en, locale }) => {
  return (
    <>
      {locale === "en" ? (
        en ? (
          <Component>{en}</Component>
        ) : (
          <Component>{sk}</Component>
        )
      ) : (
        <Component>{sk}</Component>
      )}
    </>
  );
};

export default TranslateComponent;
