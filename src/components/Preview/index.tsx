import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw"; // Crucial for HTML tag preservation
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import emoji from "remark-emoji";

import "./styles.css";

const Preview = ({ markdown }: { markdown: string }) => {
    return (
        <div className="preview-pane">
            <ReactMarkdown
                rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeStringify]}
                remarkPlugins={[remarkParse, remarkGfm, remarkRehype, emoji]}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default Preview;
