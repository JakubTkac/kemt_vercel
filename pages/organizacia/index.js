import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { COLOR, FONT_SIZE, FONT_WEIGHT, HEIGHT } from "../../Theme";
import { fetcher } from "../../lib/api";
import StyledHeadingH1 from "../../components/Styled/StyledHeadingH1";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import EmployeePreview from "../../components/Employees/EmployeePreview";
import { NextSeo } from "next-seo";
import { remove as removeAccents } from "remove-accents";
import StyledInputWrapper from "../../components/Styled/StyledInputWrapper";

const URL = process.env.STRAPI_URL;
const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

export async function getStaticProps({ locale }) {
  const employeesResponse = await fetcher(
    `${URL}/employees?populate=*&sort=name&pagination[limit]=200`
  );
  return {
    props: {
      employees: employeesResponse,
      locale: locale,
      ...(await serverSideTranslations(locale, ["employees"])),
    },
    revalidate: 10,
  };
}

const StyledEmployeesWrapper = styled.div`
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
  const [nameValue, setNameValue] = useState("");
  const [roomNumberValue, setRoomNumberValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees.data);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    setNameValue(inputValue);
  };
  const handleRoomNumberChange = (event) => {
    const inputValue = event.target.value;
    setRoomNumberValue(inputValue);
  };
  const handleSubjectChange = (event) => {
    const inputValue = event.target.value;
    setSubjectValue(inputValue);
  };
  const filterEmployees = () => {
    const managementFilter = employees.data.filter((employee) => {
      return (
        filter === "all" ||
        employee.attributes.managements.data.some(
          (management) => management.attributes.title === filter
        )
      );
    });
    const nameFilter = managementFilter.filter((employee) => {
      return (
        nameValue === "" ||
        removeAccents(employee.attributes.name.toLowerCase()).includes(
          removeAccents(nameValue.toLowerCase())
        )
      );
    });
    const roomNumberFilter = nameFilter.filter((employee) => {
      return (
        roomNumberValue === "" ||
        (typeof employee.attributes.roomNumber !== "object" &&
          employee.attributes.roomNumber.includes(roomNumberValue))
      );
    });
    const subjectFilter = roomNumberFilter.filter((employee) => {
      return (
        subjectFilter === "" ||
        employee.attributes.subjects.data?.some((subject) => {
          return (
            removeAccents(subject.attributes.title.toLowerCase()).includes(
              removeAccents(subjectValue.toLowerCase())
            ) ||
            removeAccents(subject.attributes.shortTitle.toLowerCase()).includes(
              removeAccents(subjectValue.toLowerCase())
            )
          );
        })
      );
    });

    setFilteredEmployees(subjectFilter);
  };

  useEffect(() => {
    filterEmployees();
  }, [filter, nameValue, roomNumberValue, subjectValue, locale]);

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
      <StyledInputWrapper>
        <input
          type="text"
          value={nameValue}
          onChange={handleNameChange}
          placeholder={t("name")}
        />
        <input
          type="text"
          value={roomNumberValue}
          onChange={handleRoomNumberChange}
          placeholder={t("roomNumber")}
        />
        <input
          type="text"
          value={subjectValue}
          onChange={handleSubjectChange}
          placeholder={t("subjects")}
        />
      </StyledInputWrapper>
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
            />
          );
        })}
      </StyledEmployeesWrapper>
    </>
  );
}
