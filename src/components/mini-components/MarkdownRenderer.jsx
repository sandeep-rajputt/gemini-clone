import { marked } from "marked";
import hljs from "highlight.js";
import { useEffect } from "react";

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error("Highlight.js error:", err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
});

const MarkdownRenderer = ({ content }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [content]);

  const htmlContent = marked(content);

  return (
    <div
      className="markdown-content prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;
