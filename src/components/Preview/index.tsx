import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./styles.css";

const Preview = ({ markdown }: { markdown: string }) => {
    return (
        <div className="preview-pane">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default Preview;
