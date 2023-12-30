import { useContext } from "react";

import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw"; // Crucial for HTML tag preservation
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import emoji from "remark-emoji";

import { ThemeContext } from "context/theme";
import { MarkdownContext } from "context/markdown";

import "components/Preview/styles.css";

const Preview = () => {
    const themeContext = useContext(ThemeContext);
    const {markdown, wordCount, charCount } = useContext(MarkdownContext)!;

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme } = themeContext;

    return (
        <div className={`preview-pane ${theme}`}>
            <div className={`preview-info ${theme}`}>
                <div className={`word-count ${theme}`}>
                    {wordCount} words
                </div>
                <div className={`char-count ${theme}`}>
                    {charCount} characters
                </div>
            </div>
            <div className={`preview-content ${theme}`}>
                <ReactMarkdown
                    rehypePlugins={[
                        rehypeHighlight,
                        rehypeRaw,
                        rehypeStringify,
                    ]}
                    remarkPlugins={[
                        remarkParse,
                        remarkGfm,
                        remarkRehype,
                        emoji,
                    ]}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default Preview;
