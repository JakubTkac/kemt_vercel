const IconLink = ({ Icon, url, children }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <Icon>{children}</Icon>
    </a>
  );
};

export default IconLink;
