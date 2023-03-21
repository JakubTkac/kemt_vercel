import styled from "styled-components";
import { SCREENS, WIDTH } from "../../Theme";

const LandingContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 85.8vh;
`;

const StyledFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 ${WIDTH.L};
  height: auto;
  @media (max-width: ${SCREENS.XL}) {
    margin: 0 ${WIDTH.S};
    align-items: start;
  }
  @media (max-width: ${SCREENS.LG}) {
    margin: 0 ${WIDTH.XXS};
  }
  @media (max-width: ${SCREENS.MD}) {
    margin: 0 ${WIDTH.MOBILE};
    flex-direction: column;
  }
`;

const Wrapper = () => {
  return (
    <LandingContainer>
      <StyledFlex></StyledFlex>
    </LandingContainer>
  );
};

export default Wrapper;
