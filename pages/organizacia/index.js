import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS, WIDTH } from "../../Theme";
import { fetcher } from "../../lib/api";
import Link from "next/link";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import { useTranslation } from "next-i18next";
import { FiBriefcase, FiMail, FiPhone } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import Employee from "../../components/Employees/Employee";

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
  @media (max-width: ${SCREENS.XS}) {
    padding: 0;
  }
`;

export default function Organization({ employees, locale }) {
  const { t } = useTranslation("employees");
  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledHeadingH1>{t("title")}</StyledHeadingH1>
          {employees.data.map((employee) => {
            console.log(employee);
            return (
              <Employee
                key={employee.id}
                slug={employee.attributes.slug}
                name={employee.attributes.name}
                titlesBeforeName={employee.attributes.titlesBeforeName}
                titlesAfterName={employee.attributes.titlesAfterName}
                titleEN={employee.attributes.titleEN}
                title={employee.attributes.title}
                phoneNumber={employee.attributes.phoneNumber}
                email={employee.attributes.email}
                roomNumber={employee.attributes.roomNumber}
                address={employee.attributes.address}
                avatar={employee.attributes.avatar}
                locale={locale}
                imgURL={imgURL}
              ></Employee>
            );
          })}
        </StyledContainer>
      </StyledFlex>
    </LandingContainer>
  );
}
