import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  const onChangeLanguage = (lang) => (e) => {
    router.push(router.asPath, undefined, { locale: lang, shallow: false })
      .reload;
  };

  return (
    <>
      <h1>Change Language ...</h1>
      {router.locales.map((locale) => (
        <Link key={locale} href="/" locale={locale}>
          {locale}
        </Link>
      ))}
      <h1>Change Language ...</h1>
      <div>
        <button onClick={onChangeLanguage("sk")}>Slovak</button>
        <button onClick={onChangeLanguage("en")}>English</button>
      </div>
    </>
  );
};

export default Navbar;
