import { useState } from "react";
import styled from "styled-components";
import StyledTitleButton from "../Styled/StyledTitleButton";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
import TranslateComponent from "../Common/TranslateComponent";

const StyledLi = styled.li`
  list-style: none;
`;

const StyledSubUl = styled.ul`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const HeaderMobileDropdown = ({
  dropdownItems,
  path,
  locale,
  en,
  sk,
  handler,
}) => {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    setOpen(false);
    handler();
  };

  return (
    <>
      <StyledLi>
        <div>
          {dropdownItems ? (
            <StyledTitleButton
              onClick={() => {
                setOpen(!open);
              }}
            >
              <TranslateComponent
                Component={"h2"}
                locale={locale}
                en={en}
                sk={sk}
              ></TranslateComponent>
              {open ? <FiChevronUp /> : <FiChevronDown />}
            </StyledTitleButton>
          ) : (
            <Link href={path}>
              <a onClick={handleReset}>
                <StyledTitleButton>
                  <TranslateComponent
                    Component={"h2"}
                    locale={locale}
                    en={en}
                    sk={sk}
                  ></TranslateComponent>
                </StyledTitleButton>
              </a>
            </Link>
          )}
          {dropdownItems && open && (
            <StyledSubUl>
              {dropdownItems.map((item) => {
                return (
                  <StyledLi key={item.id}>
                    <div>
                      <Link href={item.path}>
                        <a onClick={handleReset}>
                          <StyledTitleButton>
                            <TranslateComponent
                              Component={"h2"}
                              locale={locale}
                              en={item.titleEN}
                              sk={item.title}
                            ></TranslateComponent>
                          </StyledTitleButton>
                        </a>
                      </Link>
                    </div>
                  </StyledLi>
                );
              })}
            </StyledSubUl>
          )}
        </div>
      </StyledLi>
    </>
  );
};

export default HeaderMobileDropdown;
