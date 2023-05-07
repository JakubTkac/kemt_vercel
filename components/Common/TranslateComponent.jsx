const TranslateComponent = ({ Component, sk, en, locale, ...rest }) => {
  return (
    <>
      {locale === "en" ? (
        en ? (
          <Component {...rest}>{en}</Component>
        ) : (
          <Component {...rest}>{sk}</Component>
        )
      ) : (
        <Component {...rest}>{sk}</Component>
      )}
    </>
  );
};

export default TranslateComponent;
