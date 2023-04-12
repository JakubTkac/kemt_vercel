import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { buttons } from "polished";

const Navbar = () => {
  const router = useRouter();

  const onChangeLanguage = (lang) => async (e) => {
    await router.push(router.asPath, undefined, {
      locale: lang,
      shallow: false,
    });
    // router.reload();
  };

  return (
    <>
      <h1>Change Language ...</h1>
      <div>
        <button onClick={onChangeLanguage("sk")}>Slovak</button>
        <button onClick={onChangeLanguage("en")}>English</button>
      </div>
    </>
  );
};

// const Navbar = () => {
//   const router = useRouter();
//   const [locale, setLocale] = useState("sk");
//
//   useEffect(() => {
//     router.push(router.asPath, undefined, {
//       locale: locale,
//       shallow: false,
//     });
//   }, [locale]);
//
//   const handleClick = (l) => () => {
//     console.log(l);
//     router.push(router.asPath, undefined, {
//       locale: l,
//     });
//   };
//
//   return (
//     <>
//       <div>
//         <button onClick={() => setLocale("en")}>English</button>
//         <button onClick={() => setLocale("sk")}>Slovak</button>
//       </div>
//       <div>
//         {/*{router.locales.map((l) => (*/}
//         {/*  <button key={l} onClick={handleClick(l)}>*/}
//         {/*    {l}*/}
//         {/*  </button>*/}
//         {/*))}*/}
//       </div>
//     </>
//   );
// };

export default Navbar;
