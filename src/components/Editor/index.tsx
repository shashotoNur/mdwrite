import React, { useContext, useState } from "react";
import AceEditor from "react-ace";
import { saveAs } from "file-saver";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

import "./styles.css"; // Import your CSS file
import Toolbar from "../Toolbar";
import { ThemeContext } from "../../context/theme";

interface PropsType {
    markdown: string;
    onMarkdownChange: (newMarkdown: string) => void;
}

const Editor: React.FC<PropsType> = ({ markdown, onMarkdownChange }) => {
    const editorRef = React.createRef<AceEditor>();
    const [filename, setFilename] = useState("untitled");
    const themeContext = useContext(ThemeContext);

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme } = themeContext;

    const handleExport = () => {
        const blob = new Blob([markdown], { type: "text/markdown" });
        saveAs(blob, `${filename}.md`);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target) return;
            const markdown = e.target.result;
            if (typeof markdown === "string") {
                onMarkdownChange(markdown);
                setFilename(file.name.replace(".md", ""));
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={`editor-sidebar ${theme}`}>
            <Toolbar editorRef={editorRef} />

            <div className={`file-input-group ${theme}`}>
                <label htmlFor="filename-input">
                    <input
                        type="text"
                        className={`filename-input ${theme}`}
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                    />
                </label>

                <label className={`btn ${theme}`}>
                    <input type="file" onChange={handleFileChange} />
                    Import
                </label>
                <label className={`btn ${theme}`} onClick={handleExport}>
                    Export
                </label>
            </div>

            <AceEditor
                ref={editorRef}
                mode="markdown"
                theme={theme === "light" ? "github" : "dracula"}
                name="id-ace-editor"
                fontSize={13}
                showPrintMargin={false}
                onChange={onMarkdownChange}
                value={markdown}
                className={`ace-editor`}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
            />
        </div>
    );
};

export default Editor;
