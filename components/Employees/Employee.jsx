import styled from "styled-components";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";
import { FiBriefcase, FiMail, FiPhone } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const imgURL = process.env.NEXT_PUBLIC_IMG_URL;

const StyledWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${COLOR.PLATINUM[600]};
  @media (max-width: ${SCREENS.SM}) {
    gap: 2rem;
    flex-direction: column;
  }
`;

const StyledContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  span {
    font-size: ${FONT_SIZE.M};
  }
  p {
    font-size: ${FONT_SIZE.XL};
    font-weight: ${FONT_WEIGHT.BOLDER};
  }
`;

const StyledImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
const StyledAspectRatio = styled(AspectRatio.Root)`
  padding: 2em;
  overflow: hidden;
  @media (max-width: ${SCREENS.MD}) {
    padding: 0.2em;
  }
`;
const StyledSubTitle = styled.div`
  color: ${COLOR.PRI[600]};
  font-size: ${FONT_SIZE.XS};
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const StyledIconTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  @media (max-width: ${SCREENS.SM}) {
    font-size: ${FONT_SIZE.S};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.XS};
  }
`;

const StyledDescriptionContainer = styled.div`
  width: 66%;
  background-color: ${COLOR.WHITE};
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px ${COLOR.PLATINUM[600]} solid;
  margin-top: 1rem;
  display: flex;
  p {
    font-size: ${FONT_SIZE.S};
  }
  @media (max-width: ${SCREENS.XXL}) {
    width: 80%;
  }
  @media (max-width: ${SCREENS.SM}) {
    width: 100%;
  }
`;

const Employee = ({ employee, locale }) => {
  const {
    address,
    avatar,
    description,
    descriptionEN,
    email,
    name,
    phoneNumber,
    roomNumber,
    title,
    titleEN,
    titlesAfterName,
    titlesBeforeName,
  } = employee;
  return (
    <StyledWrapper>
      <StyledContentContainer>
        {titlesBeforeName && <span>{titlesBeforeName}</span>}
        <p>{name}</p>
        {titlesAfterName && <span>{titlesAfterName}</span>}
        <StyledSubTitle>
          {locale === "en" ? (
            titleEN ? (
              <span>{titleEN}</span>
            ) : (
              <span>{title}</span>
            )
          ) : (
            <span>{title}</span>
          )}
        </StyledSubTitle>
        <StyledIconTextWrapper>
          <a href={`tel: ${phoneNumber}`}>
            <FiPhone></FiPhone>
            <span>{`\t: ${phoneNumber}`}</span>
          </a>
        </StyledIconTextWrapper>
        <StyledIconTextWrapper>
          <a href={`mailto: ${email}`}>
            <FiMail></FiMail>
            <span>{`\t: ${email}`}</span>
          </a>
        </StyledIconTextWrapper>
        {roomNumber && (
          <StyledIconTextWrapper>
            <FiBriefcase></FiBriefcase>
            <span>{`\t: ${roomNumber}`}</span>
          </StyledIconTextWrapper>
        )}
        <StyledIconTextWrapper>
          <FaBuilding></FaBuilding>
          <span>{`\t: ${address}`}</span>
        </StyledIconTextWrapper>
        <StyledDescriptionContainer>
          {locale === "en" ? (
            descriptionEN ? (
              <p>{descriptionEN}</p>
            ) : (
              <p>{description}</p>
            )
          ) : (
            <p>{description}</p>
          )}
        </StyledDescriptionContainer>
      </StyledContentContainer>
      <StyledImageContainer>
        {avatar?.data ? (
          <StyledAspectRatio ratio={16 / 9}>
            <Img
              src={`${imgURL}${avatar.data?.attributes.url}`}
              alt={`${imgURL}${avatar.data?.attributes.alternativeText}`}
            />{" "}
          </StyledAspectRatio>
        ) : (
          <StyledAspectRatio ratio={4 / 3}>
            <Img src={"/foto-avatar.png"} alt="default avatar" />
          </StyledAspectRatio>
        )}
      </StyledImageContainer>
    </StyledWrapper>
  );
};

export default Employee;
