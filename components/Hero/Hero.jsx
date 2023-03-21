import styled from "styled-components";
import { FONT_SIZE, SCREENS } from "../../Theme";

const StyledHeroContainer = styled.div`
  overflow: hidden;
  background-image: url("/Kemt_Hero.png");
  min-height: 200px;
  width: 100%;
  background-size: cover;
  position: relative;
  background-position: 50% 50%;
  //img {
  //  position: absolute;
  //  z-index: -1;
  //  min-height: 200px;
  //  width: 100%;
  //  object-fit: cover;
  //}
  @media (max-width: ${SCREENS.XL}) {
  }
  @media (max-width: ${SCREENS.LG}) {
  }
  @media (max-width: ${SCREENS.MD}) {
  }
`;

const StyledHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${FONT_SIZE.XL};
  padding: 8rem 0;
  h2 {
    text-transform: uppercase;
    background-color: #fafafa;
    color: black;
    text-align: center;
  }
  button {
    background: red;
    color: white;
  }
  div {
    margin-top: 2rem;
    display: flex;
    gap: 10px;
  }
  @media (max-width: ${SCREENS.XL}) {
    padding: 5rem 0;
  }
  @media (max-width: ${SCREENS.LG}) {
    padding: 6rem 0;
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.MD}) {
    padding: 2rem 0;
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.SM}) {
    padding: 2rem 0;
    font-size: ${FONT_SIZE.L};
  }
  @media (max-width: ${SCREENS.XS}) {
    padding: 2rem 0;
    font-size: ${FONT_SIZE.M};
  }
`;

const Hero = () => {
  return (
    <StyledHeroContainer>
      {/*<img src="/Kemt_Hero.png" />*/}
      <StyledHeroContent>
        <h2>Katedra elektroniky a multimediálnych telekomunikácií</h2>
        <div>
          <button>E-Prihlaska</button>
          <button>Pokyny</button>
        </div>
      </StyledHeroContent>
    </StyledHeroContainer>
  );
};

export default Hero;
