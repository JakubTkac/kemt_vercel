import { fetcher } from "../../lib/api";
import styled from "styled-components";
import { COLOR, FONT_SIZE, HEIGHT, SCREENS, WIDTH } from "../../Theme";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Employee from "../../components/Employees/Employee";
import Contact from "../../components/Employees/Contact";
import Publication from "../../components/Employees/Publication";

const URL = process.env.STRAPI_URL;

export async function getStaticPaths() {
  const employees = await fetcher(`${URL}/employees`);
  const paths = employees.data.map((item) => ({
    params: { slug: item.attributes.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const employees = await fetcher(`${URL}/employees/${params.slug}?populate=*`);
  return {
    props: {
      params,
      employees,
      locale,
      ...(await serverSideTranslations(locale, ["employees"])),
    },
  };
}

const StyledRoot = styled(Tabs.Root)`
  width: 100%;
`;

const StyledList = styled(Tabs.List)`
  display: flex;
  width: 100%;
  margin: 2rem 0;
  font-size: ${FONT_SIZE.L};
  gap: 0.5rem;
  overflow-x: auto;
  overflow-y: hidden;
`;

const StyledTabTrigger = styled(Tabs.Trigger)`
  position: relative;
  width: 100%;
  min-height: ${HEIGHT.S};
  background-color: ${COLOR.WHITE};
  border: 1px ${COLOR.PLATINUM[600]} solid;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.BLACK};
  &:hover {
    background-color: ${COLOR.SEC[50]};
  }
  &:before {
    opacity: 0;
    margin-left: -20px;
    border-width: 20px 20px 0;
    border-style: solid;
    border-color: ${COLOR.PRI[400]} rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
  }
  &[data-state="active"] {
    background-color: ${COLOR.PRI[400]};
    opacity: 1;
  }
  &[data-state="active"]:hover {
    background-color: ${COLOR.PRI[200]};
  }
  &[data-state="active"]:before {
    opacity: 1;
  }
  &[data-state="active"]:hover:before {
    border-color: ${COLOR.PRI[200]} rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  }
  @media (max-width: ${SCREENS.LG}) {
    min-height: ${HEIGHT.XS};
    font-size: ${FONT_SIZE.M};
  }
  @media (max-width: ${SCREENS.SM}) {
    min-height: ${HEIGHT.XXS};
    font-size: ${FONT_SIZE.S};
  }
`;

function Content({ employees, locale }) {
  const { t } = useTranslation("employees");

  return (
    <>
      <Employee employee={employees.data.attributes} locale={locale}></Employee>
      <StyledRoot defaultValue="contact" orientation="vertical">
        <StyledList aria-label="tabs example">
          <StyledTabTrigger value="contact">{t("contact")}</StyledTabTrigger>
          {employees.data.attributes.publications.data.length > 0 && (
            <StyledTabTrigger value="publications">
              {t("publications")}
            </StyledTabTrigger>
          )}
          {employees.data.attributes.projects.data.length > 0 && (
            <StyledTabTrigger value="projects">
              {t("projects")}
            </StyledTabTrigger>
          )}
          {employees.data.attributes.subjects.data.length > 0 && (
            <StyledTabTrigger value="subjects">
              {t("subjects")}
            </StyledTabTrigger>
          )}
          {employees.data.attributes.awards.data.length > 0 && (
            <StyledTabTrigger value="awards">{t("awards")}</StyledTabTrigger>
          )}
          {employees.data.attributes.patents.data.length > 0 && (
            <StyledTabTrigger value="patents">{t("patents")}</StyledTabTrigger>
          )}
        </StyledList>
        <Tabs.Content value="contact">
          <Contact locale={locale} employee={employees}></Contact>
        </Tabs.Content>
        <Tabs.Content value="publications">
          {employees.data.attributes.publications.data.length > 0 &&
            employees.data.attributes.publications.data.map((item) => {
              return (
                <Publication key={item.id} publication={item}></Publication>
              );
            })}
        </Tabs.Content>
        <Tabs.Content value="projects">
          {employees.data.attributes.projects.data.length > 0 &&
            employees.data.attributes.projects.data.map((item) => {
              return <div key={item.id}>{item.attributes.title}</div>;
            })}
        </Tabs.Content>
        <Tabs.Content value="subjects">
          {employees.data.attributes.subjects.data.length > 0 &&
            employees.data.attributes.subjects.data.map((item) => {
              return <div key={item.id}>{item.attributes.shortTitle}</div>;
            })}
        </Tabs.Content>
        <Tabs.Content value="awards">
          {employees.data.attributes.awards.data.length > 0 &&
            employees.data.attributes.awards.data.map((item) => {
              return <div key={item.id}>{item.attributes.title}</div>;
            })}
        </Tabs.Content>
        <Tabs.Content value="patents">
          {employees.data.attributes.patents.data.length > 0 &&
            employees.data.attributes.patents.data.map((item) => {
              return <div key={item.id}>{item.attributes.description}</div>;
            })}
        </Tabs.Content>
      </StyledRoot>
    </>
  );
}

export default Content;
