import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw"; // Crucial for HTML tag preservation
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import emoji from "remark-emoji";

import "./styles.css";

interface PropsType {
    markdown: string;
    counts: {
        wordCount: number;
        charCount: number;
    };
}

const Preview = ({ markdown, counts }: PropsType) => {
    return (
        <div className="preview-pane">
            <div className="preview-info">
                <div className="word-count">{counts.wordCount} words</div>
                <div className="char-count">{counts.charCount} characters</div>
            </div>
            <div className="preview-content">
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
