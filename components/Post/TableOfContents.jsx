import React from "react";

const TableOfContents = ({ markdownText }) => {
  const headings = markdownText.match(/^(#{1,6})\s(.+)$/gm);
  const toc = headings
    ? headings.map((heading) => {
        const level = heading.match(/^#+/)[0].length;
        const text = heading.replace(/^#+\s/, "");
        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return { level, text, slug };
      })
    : [];

  return headings ? (
    <div>
      <h2>Obsah</h2>
      <ul>
        {toc.map(({ level, text, slug }) => (
          <li key={slug}>
            <a href={`#${slug}`} className={`heading level-${level}`}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default TableOfContents;
