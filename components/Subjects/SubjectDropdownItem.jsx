import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import SubjectItem from "./SubjectItem";

const StyledTitle = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.5rem;
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  @media (max-width: ${SCREENS.XS}) {
    padding: 0.2rem;
  }
  h2 {
    font-size: ${FONT_SIZE.L};
    color: ${COLOR.PRI[700]};
    font-weight: ${FONT_WEIGHT.EXTRABOLD};
    text-decoration: underline;
    @media (max-width: ${SCREENS.MD}) {
      font-weight: ${FONT_WEIGHT.BOLDER};
      font-size: ${FONT_SIZE.M};
    }
  }
  svg {
    font-size: ${FONT_SIZE.XL};
    color: ${COLOR.SEC[500]};
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid ${COLOR.PLATINUM[600]};
`;

const SubjectDropdownItem = ({ studyYear, locale, data }) => {
  const [open, setOpen] = useState(true);

  return (
    <StyledWrapper>
      <StyledTitle
        key={`${studyYear.title}-${studyYear.semester}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {locale === "en" ? (
          studyYear.titleEN ? (
            <h2>{`${studyYear.titleEN}, ${studyYear.semesterEN} semester`}</h2>
          ) : (
            <h2>{`${studyYear.title}, ${studyYear.semester} semester`}</h2>
          )
        ) : (
          <h2>{`${studyYear.title}, ${studyYear.semester} semester`}</h2>
        )}
        {open ? <FiChevronUp></FiChevronUp> : <FiChevronDown></FiChevronDown>}
      </StyledTitle>
      {open &&
        data
          .filter((subject) => {
            return (
              subject.attributes.studyYear.data.attributes.title ===
                studyYear.title &&
              subject.attributes.studyYear.data.attributes.semester ===
                studyYear.semester
            );
          })
          .map((subject) => {
            return (
              <SubjectItem
                key={subject.id}
                dropdownItems={subject}
                locale={locale}
              ></SubjectItem>
            );
          })}
    </StyledWrapper>
  );
};

export default SubjectDropdownItem;
