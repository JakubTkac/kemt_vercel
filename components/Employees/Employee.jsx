import Link from "next/link";
import { FiBriefcase, FiMail, FiPhone } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

const HeaderLogo = styled.div`
  width: 150px;
  cursor: pointer;
  @media (max-width: ${SCREENS.XL}) {
    width: 160px;
  }
  @media (max-width: ${SCREENS.LG}) {
    width: 100px;
  }
`;

const StyledHeaderLogo = styled.img`
  object-fit: contain;
`;

const StyledName = styled.h3`
  font-size: ${FONT_SIZE.L};
  font-weight: ${FONT_WEIGHT.BOLDER};
  cursor: pointer;
  color: ${COLOR.SEC.DEFAULT};
  text-decoration: underline;
  @media (max-width: ${SCREENS.MD}) {
    font-size: ${FONT_SIZE.M};
  }
  @media (max-width: ${SCREENS.XS}) {
    font-size: ${FONT_SIZE.S};
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1.5em;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  background-color: ${COLOR.WHITE};
  border: 1.5px solid ${COLOR.PLATINUM[600]};
  @media (max-width: ${SCREENS.XS}) {
    padding: 0.5rem;
  }
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

const StyledSubTitle = styled.div`
  color: ${COLOR.PRI[600]};
  font-size: ${FONT_SIZE.XS};
`;

const Employee = ({
  id,
  slug,
  name,
  titlesBeforeName,
  titlesAfterName,
  titleEN,
  title,
  phoneNumber,
  email,
  roomNumber,
  address,
  avatar,
  locale,
  imgURL,
}) => {
  return (
    <StyledWrapper>
      <div>
        <Link href={`organizacia/${slug}`}>
          <StyledName>
            {name}
            {titlesBeforeName && `,${titlesBeforeName}`}
            {titlesAfterName && `,${titlesAfterName}`}
          </StyledName>
        </Link>
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
      </div>
      <HeaderLogo>
        <Link href={`organizacia/${slug}`}>
          {avatar?.data ? (
            <StyledHeaderLogo
              src={`${imgURL}${avatar.data?.attributes.url}`}
              alt={`${imgURL}${avatar.data?.attributes.alternativeText}`}
            />
          ) : (
            <StyledHeaderLogo src={"/foto-avatar.png"} alt="default avatar" />
          )}
        </Link>
      </HeaderLogo>
    </StyledWrapper>
  );
};

export default Employee;
