import React, { useContext, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

import Toolbar from "components/Toolbar";
import { ThemeContext } from "context/theme";
import { MarkdownContext } from "context/markdown";
import { EditorContext } from "context/editor";
import { handleKeyDown } from "utils/keyPress";

import "components/Editor/styles.css";
import { exportMarkdown } from "utils/exportMarkdown";

const Editor = ({
    toggleListVisibility,
}: {
    toggleListVisibility: () => void;
}) => {
    const editorRef = React.createRef<AceEditor>();
    const themeContext = useContext(ThemeContext);
    const { filename, markdown, handleChange, filenameChange } =
        useContext(MarkdownContext)!;
    const { editor, changeEditor } = useContext(EditorContext)!;

    useEffect(() => {
        if (!editorRef.current) return;
        changeEditor(editorRef);
    }, [editorRef, changeEditor]);

    useEffect(() => {
        const keyDownListener = (event: KeyboardEvent) => {
            if (!editor) return;
            handleKeyDown({ event, editor, filename, markdown });
        };

        document.addEventListener("keydown", keyDownListener);
        return () => document.removeEventListener("keydown", keyDownListener);
    }, [editor, filename, markdown]);

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme } = themeContext;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target) return;
            const markdown = e.target.result;
            if (typeof markdown === "string") {
                handleChange(markdown);
                filenameChange(file.name.replace(".md", ""));
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={`editor-sidebar ${theme}`}>
            <Toolbar toggleListVisibility={toggleListVisibility} />

            <div className={`file-input-group ${theme}`}>
                <label htmlFor="filename-input">
                    <input
                        type="text"
                        className={`filename-input ${theme}`}
                        value={filename}
                        onChange={(e) => filenameChange(e.target.value)}
                    />
                </label>

                <label className={`btn ${theme}`}>
                    <input type="file" onChange={handleFileChange} />
                    Import
                </label>
                <label
                    className={`btn ${theme}`}
                    onClick={() => exportMarkdown({ filename, markdown })}
                >
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
                onChange={handleChange}
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
