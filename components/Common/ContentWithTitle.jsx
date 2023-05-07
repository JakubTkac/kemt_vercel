import StyledInformationContentContainer from "../Styled/StyledInformationContentContainer";

const ContentWithTitle = ({ title, children }) => {
  return (
    <StyledInformationContentContainer>
      <span>{title}</span>
      <p>{children}</p>
    </StyledInformationContentContainer>
  );
};

export default ContentWithTitle;
