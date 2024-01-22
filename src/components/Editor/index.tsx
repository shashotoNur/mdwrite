import React, { useContext, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

import { Toolbar } from "components";
import { ThemeContext, MarkdownContext, EditorContext } from "context";
import { handleKeyDown, exportMarkdown } from "utils";
import "components/Editor/styles.css";

const Editor = ({
    isListVisible,
    toggleListVisibility,
}: {
    isListVisible: boolean;
    toggleListVisibility: () => void;
}) => {
    const editorRef = React.createRef<AceEditor>();
    const themeContext = useContext(ThemeContext);
    const {
        filename,
        markdown,
        timestamp,
        toVersion,
        isSaved,
        handleChange,
        filenameChange,
        timestampChange,
        toggleToVersion,
        saveToStorage,
    } = useContext(MarkdownContext)!;
    const { editor, changeEditor } = useContext(EditorContext)!;

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isSaved || markdown === "") return;
            event.preventDefault(); // Prevent immediate exit
            return (event.returnValue = ""); // Allow exit after confirmation
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isSaved, markdown]);

    useEffect(() => {
        if (!editorRef.current) return;
        changeEditor(editorRef);
    }, [editorRef, changeEditor]);

    useEffect(() => {
        const keyDownListener = (e: KeyboardEvent) => {
            if (!editor) return;
            handleKeyDown({ event: e, editor, saveToStorage });
            if (e.ctrlKey && e.key.toLowerCase() == "s" && isListVisible) toggleListVisibility();
        };

        document.addEventListener("keydown", keyDownListener);
        return () => document.removeEventListener("keydown", keyDownListener);
    }, [editor, filename, isListVisible, markdown, saveToStorage, timestamp, toVersion, toggleListVisibility]);

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

    const undo = () => {
        if (!editor) return;
        const { session } = editor;
        const manager = session.getUndoManager();
        manager.undo(session);
    };

    const redo = () => {
        if (!editor) return;
        const { session } = editor;
        const manager = session.getUndoManager();
        manager.redo(session);
    };

    return (
        <>
            <Toolbar toggleListVisibility={toggleListVisibility} />

            <div className={`file-input-group ${theme}`}>
                <label htmlFor="filename-input">
                    <input
                        type="text"
                        className={`filename-input ${theme}`}
                        name="filename-input"
                        value={filename}
                        onChange={(e) => filenameChange(e.target.value)}
                        title="Enter the name of your entry"
                    />
                </label>
                <h4
                    title={isSaved ? "Document is saved" : "Unsaved changes"}
                    className="status"
                >
                    {isSaved ? "✔" : "✘"}
                </h4>

                <label
                    className={`btn ${theme}`}
                    title="Import a document into the editor"
                >
                    <input type="file" onChange={handleFileChange} />
                    Import
                </label>
                <label
                    className={`btn ${theme}`}
                    title="Export the active entry from the editor"
                    onClick={() => exportMarkdown({ filename, markdown })}
                >
                    Export
                </label>
                <button
                    className={`btn ${theme}`}
                    onClick={saveToStorage}
                    title="Save the current entry in your browser"
                >
                    Save
                </button>
                <button
                    className={`btn ${theme}`}
                    onClick={toggleToVersion}
                    title={
                        toVersion
                            ? "The editor is keeping a version history of your entry"
                            : "Version history is disabled"
                    }
                >
                    Versioning: {toVersion ? "ON" : "NO"}
                </button>
                <div>
                    <label
                        className={`btn ${theme}`}
                        onClick={undo}
                        title="Undo"
                    >
                        ↺
                    </label>
                    <label
                        className={`btn ${theme}`}
                        onClick={redo}
                        title="Redo"
                    >
                        ⟳
                    </label>
                </div>
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
        </>
    );
};

export default Editor;
