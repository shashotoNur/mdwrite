import { useContext } from "react";

import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw"; // Crucial for HTML tag preservation
import rehypeStringify from "rehype-stringify";
import emoji from "remark-emoji";


import "components/Preview/styles.css";
import { MarkdownContext, ThemeContext } from "context";

const Preview = () => {
    const themeContext = useContext(ThemeContext);
    const {markdown, wordCount, charCount } = useContext(MarkdownContext)!;

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme } = themeContext;

    return (
        <>
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
        </>
    );
};

export default Preview;
