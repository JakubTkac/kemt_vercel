import StyledHeadingH1 from "../Styled/StyledHeadingH1";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

const StyledContactContainer = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  @media (max-width: ${SCREENS.SM}) {
    width: 100%;
  }
  margin-bottom: 6rem;
`;

const StyledContactContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: ${FONT_SIZE.M};
  span {
    font-weight: ${FONT_WEIGHT.BOLD};
  }
`;

const Contact = ({ locale, employee }) => {
  const { t } = useTranslation("employees");
  const { address, name, email, phoneNumber, roomNumber } =
    employee.data.attributes;
  return (
    <>
      <StyledHeadingH1>{t("contact")}</StyledHeadingH1>
      <StyledContactContainer>
        <StyledContactContent>
          <span>Meno: </span>
          <p>{name}</p>
        </StyledContactContent>
        <StyledContactContent>
          <span>email: </span>
          <p>{email}</p>
        </StyledContactContent>
        <StyledContactContent>
          <span>Telefon: </span>
          <p>{phoneNumber}</p>
        </StyledContactContent>
        {roomNumber && (
          <StyledContactContent>
            <span>miestnost: </span>
            <p>{roomNumber}</p>
          </StyledContactContent>
        )}
      </StyledContactContainer>
    </>
  );
};

export default Contact;
