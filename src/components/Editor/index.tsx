import { ChangeEvent } from "react";
import "./styles.css";

type EditorPropsType = {
    markdown: string;
    onMarkdownChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const Editor = ({ markdown, onMarkdownChange }: EditorPropsType) => {
    return (
        <div className="editor-sidebar">
            <textarea
                value={markdown}
                onChange={onMarkdownChange}
                placeholder="Type your Markdown here..."
            />
        </div>
    );
};

export default Editor;
