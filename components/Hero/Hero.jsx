import styled from "styled-components";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";

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
    text-align: center;
    span {
      font-weight: 700;
      text-transform: uppercase;
      background-color: ${COLOR.SEC[300]};
      color: ${COLOR.BLACK};
      text-align: center;
    }
  }
  button {
    padding: 0.1em;
    font-weight: 500;
    background-color: ${COLOR.PRI.DEFAULT};
    color: ${COLOR.BLACK};
    border: ${COLOR.PRI[600]} 1px solid;
    &:hover {
      background-color: ${COLOR.PRI[300]};
    }
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
      <StyledHeroContent>
        <h2>
          <span>Katedra elektroniky </span>
          <span>a multimediálnych </span>
          <span>telekomunikácií</span>
        </h2>
        <div>
          <button>
            <a href="https://eprihlaska.tuke.sk/eprihlaska/pages/odosielatel/rozhranie_odosielatela.mais">
              E-Prihláška
            </a>
          </button>
          <button>
            <a href="https://www.fei.tuke.sk/sk/studium/pre-uchadzacov/podmienky-prijatia">
              Podmienky
            </a>
          </button>
        </div>
      </StyledHeroContent>
    </StyledHeroContainer>
  );
};

export default Hero;
