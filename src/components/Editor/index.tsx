import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import "./styles.css"; // Import your CSS file
import Toolbar from "../Toolbar";

type EditorPropsType = {
    markdown: string;
    onMarkdownChange: (newMarkdown: string) => void;
};

const Editor: React.FC<EditorPropsType> = ({ markdown, onMarkdownChange }) => {
    const [editorValue, setEditorValue] = useState(markdown);
    const editorRef = React.createRef<AceEditor>();

    const handleChange = (value: string) => {
        setEditorValue(value);
        onMarkdownChange(value);
    };

    return (
        <div className="editor-sidebar">
            <Toolbar editorRef={editorRef} />
            <AceEditor
                ref={editorRef}
                mode="markdown"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                fontSize={13}
                showPrintMargin={false}
                onChange={handleChange}
                value={editorValue}
                className="ace-editor"
                editorProps={{
                    $blockScrolling: true,
                    statusBar: {
                        show: true,
                        values: [
                            {
                                key: "words",
                                value: `Words: ${
                                    editorValue.split(/\s+/).length
                                }`,
                            },
                            {
                                key: "chars",
                                value: `Characters: ${editorValue.length}`,
                            },
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
