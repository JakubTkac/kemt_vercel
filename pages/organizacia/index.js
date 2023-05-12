import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  HEIGHT,
  SCREENS,
  WIDTH,
} from "../../Theme";
import { fetcher } from "../../lib/api";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import EmployeePreview from "../../components/Employees/EmployeePreview";
import { NextSeo } from "next-seo";

const URL = process.env.STRAPI_URL;
const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

export async function getServerSideProps({ query: { page }, locale }) {
  const employeesResponse = await fetcher(
    `${URL}/employees?populate=*&sort=name`
  );
  return {
    props: {
      employees: employeesResponse,
      locale: locale,
      ...(await serverSideTranslations(locale, ["employees"])),
    },
  };
}

const StyledEmployeesWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  select {
    background-color: ${COLOR.WHITE};
    border: 1.5px solid ${COLOR.PLATINUM[600]};
    min-height: ${HEIGHT.XS};
    margin-bottom: 1rem;
    padding: 0 1.5em;
    font-size: ${FONT_SIZE.M};
    font-weight: ${FONT_WEIGHT.BOLD};
  }
`;

export default function Organization({ employees, locale }) {
  const { t } = useTranslation("employees");

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredEmployees =
    filter === "all"
      ? employees.data
      : employees.data.filter((employee) => {
          return employee.attributes.managements.data.some((management) => {
            return management.attributes.title === filter;
          });
        });

  const SEO = {
    title: "KEMT - Personal",
    description: "KEMT - Personal",
    openGraph: {
      locale: locale,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <StyledHeadingH1>{t("title")}</StyledHeadingH1>
      <StyledEmployeesWrapper>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">{t("all")}</option>
          <option value="Vedenie Katedry">{t("management")}</option>
          <option value="Profesor">{t("professor")}</option>
          <option value="Docent">{t("associateProfessor")}</option>
          <option value="Odborný asistent">{t("assistantProfessor")}</option>
          <option value="PhD. študent">{t("phdStudent")}</option>
          <option value="THP pracovník">{t("administrativeStaff")}</option>
        </select>
        {filteredEmployees.map((employee) => {
          return (
            <EmployeePreview
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
            ></EmployeePreview>
          );
        })}
      </StyledEmployeesWrapper>
    </>
  );
}
