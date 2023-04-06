const removeMarkdownSyntax = (text) => {
  if (!text) {
    return "";
  }
  // Remove headers (##, ###, ####, etc.)
  text = text.replace(/^#+\s/gm, "");

  // Remove unordered list items (*, +, or -)
  text = text.replace(/^([*+-]\s)+/gm, "");

  // Remove ordered list items (1., 2., 3., etc.)
  text = text.replace(/^(\d+\.\s)+/gm, "");

  // Remove blockquotes (>)
  text = text.replace(/^>\s/gm, "");

  // Remove horizontal rules (--- or ***)
  text = text.replace(/^[-*_]{3,}\s/gm, "");

  // Remove links ([link text](url) or [link text][id])
  text = text.replace(/(^|[^!])\[(.*?)\]\[(.*?)\]/g, "");

  // Remove inline links ([link text](url))
  text = text.replace(/(^|[^!])\[(.*?)\]\((.*?)\)/g, "");

  // Remove images (![alt text](url) or ![alt text][id])
  text = text.replace(/(^|[^!])\!\[(.*?)\]\[(.*?)\]/g, "");
  text = text.replace(/(^|[^!])\!\[(.*?)\]\((.*?)\)/g, "");

  // Remove emphasis (* or _)
  text = text.replace(
    /(\*|_)\*(?!\s)(.+?)\*(?!\*)|(\*|_)\_(?!\s)(.+?)\_(?!\_)/g,
    "$2$4"
  );

  // Remove code blocks (```)
  text = text.replace(/```.*\n[\s\S]*?\n```/gm, "");

  // Remove inline code (`)
  text = text.replace(/`(.+?)`/g, "$1");

  return text;
};

export default removeMarkdownSyntax;
