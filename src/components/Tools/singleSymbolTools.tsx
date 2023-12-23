import React from "react";
import AceEditor from "react-ace";

import "../Toolbar/styles.css"; // Import your CSS file

interface PropsType {
    editorRef: React.RefObject<AceEditor>;
}

const SingleSymbolTools = ({ editorRef }: PropsType) => {

    const insertSingleSymbol = (symbol: string) => {
        const editor = editorRef.current?.editor;
        if (!editor) return;

        const cursorPosition = editor.getCursorPosition();
        const position = {
            row: cursorPosition.row,
            column: 0,
        };
        editor.session.insert(position, symbol);
        editor.focus();
    };

    const handleHeadingChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedHeading = event.target.value;
        const editor = editorRef.current?.editor;
        if (!selectedHeading || !editor) return;
        insertSingleSymbol(`${"#".repeat(Number(selectedHeading))} `);
        event.target.value = "";
    };
    return (
        <>
            <select
                className="toolbar-select"
                defaultValue=""
                onChange={handleHeadingChange}
            >
                <option value="">Heading</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Heading 4</option>
                <option value="5">Heading 5</option>
                <option value="6">Heading 6</option>
            </select>
            <button
                className="toolbar-button"
                onClick={() => insertSingleSymbol("- ")}
            >
                Unordered List
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertSingleSymbol("1. ")}
            >
                Ordered List
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertSingleSymbol("- [ ] ")}
            >
                Checkbox
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertSingleSymbol("---\n")}
            >
                Rule
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertSingleSymbol("<br>")}
            >
                Break
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertSingleSymbol("> ")}
            >
                Quote
            </button>
        </>
    );
};

export default SingleSymbolTools;
