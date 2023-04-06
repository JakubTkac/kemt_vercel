import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const { locales } = useRouter();
  return (
    <>
      <h1>Change Language ...</h1>
      {[...locales].map((locale) => (
        <Link key={locale} href="/" locale={locale}>
          {locale}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
