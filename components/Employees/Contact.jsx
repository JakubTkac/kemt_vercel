import StyledHeadingH1 from "../Styled/StyledHeadingH1";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

const StyledContactContainer = styled.div`
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  margin-bottom: 2rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  @media (max-width: ${SCREENS.SM}) {
    width: 100%;
  }
`;

const StyledContactContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: ${FONT_SIZE.M};
  @media (max-width: ${SCREENS.SM}) {
    flex-direction: column;
    padding-bottom: 0.5rem;
  }
  span {
    font-weight: ${FONT_WEIGHT.BOLD};
    min-width: 15rem;
    padding-bottom: 0.5rem;
    @media (max-width: ${SCREENS.SM}) {
      min-width: auto;
      padding-bottom: 0;
    }
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
