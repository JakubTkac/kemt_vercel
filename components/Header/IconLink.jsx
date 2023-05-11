const IconLink = ({ Icon, url, children, label }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer" aria-label={label}>
      <Icon>{children}</Icon>
    </a>
  );
};

export default IconLink;
