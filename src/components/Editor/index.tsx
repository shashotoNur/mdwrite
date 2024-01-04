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
    const {
        filename,
        markdown,
        timestamp,
        toVersion,
        handleChange,
        filenameChange,
        timestampChange,
        toggleToVersion,
        saveToStorage,
    } = useContext(MarkdownContext)!;
    const { editor, changeEditor } = useContext(EditorContext)!;

    useEffect(() => {
        if (!editorRef.current) return;
        changeEditor(editorRef);
    }, [editorRef, changeEditor]);

    useEffect(() => {
        const keyDownListener = (e: KeyboardEvent) => {
            if (!editor) return;
            handleKeyDown({ event: e, editor, saveToStorage });
        };

        document.addEventListener("keydown", keyDownListener);
        return () => document.removeEventListener("keydown", keyDownListener);
    }, [editor, filename, markdown, saveToStorage, timestamp, toVersion]);

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme } = themeContext;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            if (!event.target) return;
            const markdown = event.target.result;
            if (typeof markdown === "string") {
                handleChange(markdown);
                filenameChange(file.name.replace(".md", ""));
                timestampChange(new Date());
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
                        name="filename-input"
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
                <button className={`btn ${theme}`} onClick={toggleToVersion}>
                    Versioning: {toVersion ? "On" : "Off"}
                </button>
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
