// import styled from "styled-components";
// import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";
// import { fetcher } from "../../lib/api";
// import Link from "next/link";
//
// const URL = process.env.STRAPI_URL;
//
// export async function getStaticProps() {
//   const vedenieResponse = await fetcher(`${URL}/zamestnanecs?populate=*`);
//   const filteredVedenie = vedenieResponse.data.filter((data) => {
//     data.attributes.positions.data.includes("profesori");
//     console.log(
//       data.attributes.positions.data.map((position) => {
//         position;
//       })
//     );
//   });
//   // console.log(
//   //   vedenieResponse.data[0].attributes.positions.data[0].attributes.name
//   // );
//   console.log(filteredVedenie);
//   return {
//     props: {
//       vedenie: vedenieResponse,
//     },
//   };
// }
//
// const StyledFlex = styled.div`
//   display: flex;
//   width: 100%;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
// `;
//
// const StyledContainer = styled.div`
//   margin: 6rem 10rem;
//   display: flex;
//   width: 100%;
//   height: 100%;
//   flex-direction: column;
//   justify-content: center;
//   justify-items: center;
//   @media (max-width: ${SCREENS.XL}) {
//     margin: 4rem 6rem;
//   }
//   @media (max-width: ${SCREENS.LG}) {
//     margin: 2rem 4rem;
//   }
//   @media (max-width: ${SCREENS.MD}) {
//     margin: 2rem;
//   }
// `;
//
// const StyledHeading = styled.h1`
//   font-size: ${FONT_SIZE.XL};
//   width: 100%;
//   padding-bottom: 1.5rem;
//   font-weight: ${FONT_WEIGHT.BOLD};
//   @media (max-width: ${SCREENS.LG}) {
//     padding-bottom: 1rem;
//     font-size: ${FONT_SIZE.L};
//   }
//   @media (max-width: ${SCREENS.MD}) {
//     font-size: ${FONT_SIZE.L};
//   }
//   @media (max-width: ${SCREENS.XS}) {
//     font-size: ${FONT_SIZE.L};
//   }
// `;
//
// const StyledWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   padding-bottom: 1.5rem;
//   padding-top: 1.5rem;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   justify-items: center;
//   margin: 0 2rem;
//   border-bottom: 1px solid ${COLOR.GRAY};
// `;
//
// const HeaderLogo = styled.div`
//   width: 150px;
//   cursor: pointer;
//   @media (max-width: ${SCREENS.XL}) {
//     width: 160px;
//   }
//   @media (max-width: ${SCREENS.LG}) {
//     width: 100px;
//   }
// `;
//
// const StyledHeaderLogo = styled.img`
//   object-fit: contain;
// `;
//
// const StyledName = styled.h3`
//   font-size: ${FONT_SIZE.L};
//   font-weight: ${FONT_WEIGHT.BOLDER};
// `;
//
// const StyledText = styled.p`
//   font-size: ${FONT_SIZE.M};
//   font-weight: ${FONT_WEIGHT.REGULAR};
// `;
//
// const StyledMoreButton = styled.p`
//   margin-top: 1rem;
//   cursor: pointer;
//   color: ${COLOR.DANGER};
//   @media (max-width: ${SCREENS.MD}) {
//     font-size: ${FONT_SIZE.XS};
//   }
// `;
//
// export default function vedenie({ vedenie }) {
//   const data = vedenie.data.sort((prev, next) => prev.id - next.id);
//   return (
//     <StyledFlex>
//       <StyledContainer>
//         <StyledHeading>Docenti Katedry KEMT</StyledHeading>
//         {data.map((profesor) => {
//           return (
//             <StyledWrapper key={profesor.id}>
//               <div>
//                 <StyledName>
//                   {`${profesor.attributes.firstTitles}
//                   ${profesor.attributes.firstName} ${profesor.attributes.lastName}
//                   ${profesor.attributes.lastTitles}`}
//                 </StyledName>
//                 <StyledText>
//                   <b>Email:</b> {profesor.attributes.email}
//                 </StyledText>
//                 <StyledText>
//                   <b>Telefon:</b>{" "}
//                 </StyledText>
//                 <StyledText>
//                   <b>Adresa:</b> {profesor.attributes.address}
//                 </StyledText>
//                 <Link href={"../"}>
//                   <StyledMoreButton>Čítaj ďalej...</StyledMoreButton>
//                 </Link>
//               </div>
//               <HeaderLogo>
//                 <Link href="../">
//                   <StyledHeaderLogo
//                     src={"/foto-avatar.png"}
//                     alt="default avatar"
//                   />
//                 </Link>
//               </HeaderLogo>
//             </StyledWrapper>
//           );
//         })}
//       </StyledContainer>
//     </StyledFlex>
//   );
// }

import Hero from "../../components/Hero/Hero";
import Notices from "../../components/Notices/Notices";
import News from "../../components/News/News";

export default function Docenti({ notices, news }) {
  return <div></div>;
}
