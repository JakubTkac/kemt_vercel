import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS, WIDTH } from "../../Theme";
import { fetcher } from "../../lib/api";
import Link from "next/link";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import { useTranslation } from "next-i18next";
import { FiBriefcase, FiMail, FiPhone } from "react-icons/fi";

const URL = process.env.STRAPI_URL;
const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  const employeesResponse = await fetcher(`${URL}/employees?populate=*`);
  return {
    props: {
      employees: employeesResponse,
      locale: locale,
      ...(await serverSideTranslations(locale, ["employees"])),
    },
  };
}

const LandingContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 85.8vh;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 ${WIDTH.XXS};
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 ${WIDTH.XXXXXS};
    align-items: start;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 ${WIDTH.XXXXXXS};
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0 ${WIDTH.MOBILE};
    flex-direction: column;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  background-color: ${COLOR.PLATINUM.DEFAULT};
  border: 1px solid ${COLOR.PLATINUM[600]};
  width: 100%;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
`;

const HeaderLogo = styled.div`
  width: 150px;
  cursor: pointer;
  @media (max-width: ${SCREENS.XL}) {
    width: 160px;
  }
  @media (max-width: ${SCREENS.LG}) {
    width: 100px;
  }
`;

const StyledHeaderLogo = styled.img`
  object-fit: contain;
`;

const StyledName = styled.h3`
  font-size: ${FONT_SIZE.L};
  font-weight: ${FONT_WEIGHT.BOLDER};
  cursor: pointer;
  color: ${COLOR.SEC.DEFAULT};
  text-decoration: underline;
`;

const StyledText = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${FONT_SIZE.M};
  font-weight: ${FONT_WEIGHT.REGULAR};
`;

const StyledMoreButton = styled.p`
  margin-top: 1rem;
  cursor: pointer;
  color: ${COLOR.DANGER};
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.XS};
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1.5em;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  margin: 0 2rem;
  background-color: ${COLOR.WHITE};
  border: 1.5px solid ${COLOR.PLATINUM[600]};
`;

const StyledIconTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export default function Organization({ employees, locale }) {
  const { t } = useTranslation("employees");
  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledHeadingH1>{t("title")}</StyledHeadingH1>
          {employees.data.map((profesor) => {
            console.log(profesor.attributes.avatar);
            return (
              <StyledWrapper key={profesor.id}>
                <div>
                  <Link href={`organizacia/${profesor.attributes.slug}`}>
                    <StyledName>
                      {`${profesor.attributes.name},
                  ${profesor.attributes.titlesBeforeName},
                  ${profesor.attributes.titlesAfterName}`}
                    </StyledName>
                  </Link>
                  <StyledIconTextWrapper>
                    <a href={`tel: ${profesor.attributes.phoneNumber}`}>
                      <FiPhone></FiPhone>
                      <span>{`\t: ${profesor.attributes.phoneNumber}`}</span>
                    </a>
                  </StyledIconTextWrapper>
                  <StyledIconTextWrapper>
                    <a href={`mailto: ${profesor.attributes.email}`}>
                      <FiMail></FiMail>
                      <span>{`\t: ${profesor.attributes.email}`}</span>
                    </a>
                  </StyledIconTextWrapper>
                  <StyledIconTextWrapper>
                    <FiBriefcase></FiBriefcase>
                    <span>{`\t: ${profesor.attributes.roomNumber}`}</span>
                  </StyledIconTextWrapper>
                </div>
                <HeaderLogo>
                  <Link href={`organizacia/${profesor.attributes.slug}`}>
                    {profesor.attributes.avatar.data ? (
                      <StyledHeaderLogo
                        src={`${imgURL}${profesor.attributes.avatar.data?.attributes.url}`}
                        alt={`${imgURL}${profesor.attributes.avatar.data?.attributes.alternativeText}`}
                      />
                    ) : (
                      <StyledHeaderLogo
                        src={"/foto-avatar.png"}
                        alt="default avatar"
                      />
                    )}
                  </Link>
                </HeaderLogo>
              </StyledWrapper>
            );
          })}
        </StyledContainer>
      </StyledFlex>
    </LandingContainer>
  );
}
