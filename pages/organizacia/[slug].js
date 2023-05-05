import { fetcher } from "../../lib/api";
import styled from "styled-components";
import { COLOR, FONT_SIZE, HEIGHT, SCREENS, WIDTH } from "../../Theme";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
`;

function Content({ employees, locale }) {
  console.log(employees);
  const { t } = useTranslation("employees");

  return (
    <LandingContainer>
      <StyledFlex>
        <StyledContainer>
          <StyledRoot defaultValue="contact" orientation="vertical">
            <StyledList aria-label="tabs example">
              <StyledTabTrigger value="contact">
                {t("contact")}
              </StyledTabTrigger>
              <StyledTabTrigger value="publications">
                {t("publications")}
              </StyledTabTrigger>
              <StyledTabTrigger value="projects">
                {t("projects")}
              </StyledTabTrigger>
              <StyledTabTrigger value="subjects">
                {t("subjects")}
              </StyledTabTrigger>
              <StyledTabTrigger value="awards">{t("awards")}</StyledTabTrigger>
              <StyledTabTrigger value="patents">
                {t("patents")}
              </StyledTabTrigger>
            </StyledList>
            <Tabs.Content value="contact">Kontakt</Tabs.Content>
            <Tabs.Content value="publications">Pub</Tabs.Content>
            <Tabs.Content value="projects">projekt</Tabs.Content>
            <Tabs.Content value="subjects">predme</Tabs.Content>
            <Tabs.Content value="awards">aa</Tabs.Content>
            <Tabs.Content value="patents">pat</Tabs.Content>
          </StyledRoot>
        </StyledContainer>
      </StyledFlex>
    </LandingContainer>
  );
}

export default Content;
