import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const { locales } = useRouter();
  return (
    <>
      {[...locales].map((locale) => (
        <Link key={locale} href="/" locale={locale}>
          {locale}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
