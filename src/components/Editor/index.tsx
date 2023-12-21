import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import "./styles.css"; // Import your CSS file

type EditorPropsType = {
    markdown: string;
    onMarkdownChange: (newMarkdown: string) => void;
};

const Editor: React.FC<EditorPropsType> = ({ markdown, onMarkdownChange }) => {
    const [editorValue, setEditorValue] = useState(markdown);

    const handleChange = (value: string) => {
        setEditorValue(value);
        onMarkdownChange(value);
    };

    return (
        <div className="editor-sidebar">
            <AceEditor
                mode="markdown"
                theme="github" // Adjust theme as desired
                name="UNIQUE_ID_OF_DIV"
                fontSize={13} // Optional font size adjustment
                showPrintMargin={false} // Optional, hide print margin
                onChange={handleChange}
                value={editorValue}
                className="ace-editor"
                editorProps={{
                    $blockScrolling: true,
                    // Enable status bar with word and character count
                    statusBar: {
                        show: true,
                        values: [
                            { key: "words", value: "Words: 0" }, // Updated dynamically
                            { key: "chars", value: "Characters: 0" }, // Updated dynamically
                        ],
                    },
                }}
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
