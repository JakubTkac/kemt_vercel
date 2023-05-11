import styled from "styled-components";
import { COLOR, SCREENS } from "../../Theme";

const StyledMarkdownContent = styled.div`
  width: 100%;
  padding: 2rem;
  word-break: break-word;
  @media (max-width: ${SCREENS.MD}) {
    padding: 0;
  }
  a {
    &:visited {
      color: #3498db;
      text-decoration: underline;
    }

    &:hover,
    &:focus,
    &:active {
      color: #2980b9;
    }
  }

  pre,
  blockquote {
    border: 1px solid ${COLOR.SEC[500]};
    page-break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }

  tr,
  img {
    page-break-inside: avoid;
  }

  img {
    max-width: 25% !important;
  }

  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }

  h2,
  h3 {
    page-break-after: avoid;
  }

  pre,
  code {
    font-family: Menlo, Monaco, "Courier New", monospace;
  }

  pre {
    padding: 0.5rem;
    line-height: 1.25;
    overflow-x: auto;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.3rem;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 1.414rem 0 0.5rem;
    font-weight: inherit;
    line-height: 1.42;
  }

  h1 {
    margin-top: 0;
    font-size: 3.998rem;
  }

  h2 {
    font-size: 2.827rem;
  }

  h3 {
    font-size: 1.999rem;
  }

  h4 {
    font-size: 1.414rem;
  }

  h5 {
    font-size: 1.121rem;
  }

  h6 {
    font-size: 0.88rem;
  }

  small {
    font-size: 0.707em;
  }

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  h1,
  h2,
  h3 {
    border-bottom: 2px solid ${COLOR.SEC[400]};
    margin-bottom: 1.15rem;
    padding-bottom: 0.5rem;
    text-align: center;
  }

  blockquote {
    border-left: 8px solid ${COLOR.SEC[400]};
    padding: 1rem;
  }

  pre,
  code {
    background-color: ${COLOR.PLATINUM[400]};
  }
  li {
    margin-left: 5px;
  }
  ul,
  ol {
    margin-bottom: 1rem;
    @media (max-width: ${SCREENS.XS}) {
      padding-left: 1.5rem;
    }
  }

  h1 > a,
  h2 > a,
  h3 > a,
  h4 > a,
  h5 > a,
  h6 > a {
    color: ${COLOR.BLACK} !important;
    text-decoration: none;
    &:hover {
      color: ${COLOR.BLACK};
    }
  }

  div > ul > li > a {
    color: ${COLOR.SEC[400]} !important;
    &:hover {
      color: ${COLOR.SEC[600]}!important;
    }
  }

  hr {
    height: 1px;
    background-color: ${COLOR.SEC[500]};
  }

  p {
    color: ${COLOR.BLACK};
    a {
      color: #3498db;
      &:visited {
        color: #3498db;
        text-decoration: underline;
      }

      &:hover {
        color: #2980b9;
      }
    }
  }
`;

const MarkdownContent = ({ children }) => {
  return <StyledMarkdownContent>{children}</StyledMarkdownContent>;
};

export default MarkdownContent;
