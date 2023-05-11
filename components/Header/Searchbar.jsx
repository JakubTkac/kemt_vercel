import styled from "styled-components";
import { useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { FiSearch } from "react-icons/fi";
import { COLOR, FONT_SIZE, FONT_WEIGHT, HEIGHT, SCREENS } from "../../Theme";
import { useRouter } from "next/router";

const StyledForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${FONT_SIZE.M};
  background-color: ${COLOR.SEC[500]};
  border: ${COLOR.SEC[600]} 1px solid;
  width: ${(props) => (props.barOpened ? "30rem" : "2rem")};
  cursor: ${(props) => (props.barOpened ? "auto" : "pointer")};
  height: ${HEIGHT.XXXS};
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    background-color: ${COLOR.SEC[300]};
  }
  &:hover > input {
    background-color: ${COLOR.SEC[500]};
  }
  @media (max-width: ${SCREENS.XL}) {
    width: ${(props) => (props.barOpened ? "20rem" : "2rem")};
  }
  @media (max-width: ${SCREENS.LG}) {
    width: ${(props) => (props.barOpened ? "14.5rem" : "2rem")};
  }
  @media (max-width: ${SCREENS.MD}) {
    width: ${(props) => (props.barOpened ? "12rem" : "2rem")};
  }
  @media (max-width: ${SCREENS.SM}) {
    width: ${(props) => (props.barOpened ? "10rem" : "2rem")};
  }
  @media (max-width: ${SCREENS.XS}) {
    width: ${(props) => (props.barOpened ? "99%" : "2rem")};
    top: 0;
    left: 0;
    //width: 99%;
    position: absolute;
  }
`;

const StyledInput = styled.input`
  height: 100%;
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${(props) => (props.barOpened ? "0.25rem" : "0rem")};
  border: none;
  color: ${COLOR.WHITE};
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  pointer-events: ${(props) => (props.barOpened ? "auto" : "none")};
  cursor: ${(props) => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  color: ${COLOR.WHITE};
  font-weight: ${FONT_WEIGHT.EXTRABOLD};
  height: 100%;
  svg {
    font-weight: ${FONT_WEIGHT.EXTRABOLD};
    left: 4rem;
  }
`;

const Searchbar = () => {
  const { locale } = useRouter();
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();

  const onFormSubmit = (e) => {
    e.preventDefault();
    setInput("");
    setBarOpened(false);
  };

  return (
    <div>
      <StyledForm
        barOpened={barOpened}
        onClick={() => {
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        onFocus={() => {
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        onBlur={() => {
          setBarOpened(false);
        }}
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <StyledButton type="submit" barOpened={barOpened}>
          <FiSearch></FiSearch>
        </StyledButton>
        <StyledInput
          onChange={(e) => setInput(e.target.value)}
          ref={inputFocus}
          value={input}
          barOpened={barOpened}
          placeholder={locale === "en" ? "Search..." : "Vyhľadaj..."}
        />
      </StyledForm>
    </div>
  );
};

export default Searchbar;
