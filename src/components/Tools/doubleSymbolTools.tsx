import React from "react";
import AceEditor from "react-ace";

import "../Toolbar/styles.css"; // Import your CSS file

interface PropsType {
    editorRef: React.RefObject<AceEditor>;
}

const DoubleSymbolTools = ({ editorRef }: PropsType) => {
    const insertDoubleSymbol = (symbol: string) => {
        const editor = editorRef.current?.editor;
        if (!editor) return;

        const cursorPosition = editor.getCursorPosition();
        const selection = editor.getSelectedText();
        const secondSymbol = symbol.replace("<", "</");

        if (selection) {
            const range = editor.getSelectionRange();
            editor.session.replace(
                range,
                `${symbol}${selection}${secondSymbol}`
            );
        } else {
            // If there is no selection, insert the symbol at the cursor position
            const position = {
                row: cursorPosition.row,
                column: cursorPosition.column,
            };
            editor.session.insert(position, `${symbol}${secondSymbol}`);

            const newPosition = {
                row: position.row,
                column: position.column + symbol.length,
            };

            editor.moveCursorToPosition(newPosition);
        }

        editor.focus();
    };

    return (
        <>
            <button
                className="toolbar-button"
                onClick={() => insertDoubleSymbol("__")}
            >
                <b>B</b>
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertDoubleSymbol("_")}
            >
                <i>I</i>
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertDoubleSymbol("<ins>")}
            >
                <u>u</u>
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertDoubleSymbol("~")}
            >
                <del>Strike</del>
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertDoubleSymbol("<sub>")}
            >
                Sub
            </button>
            <button
                className="toolbar-button"
                onClick={() => insertDoubleSymbol("<sup>")}
            >
                Super
            </button>
        </>
    );
};

export default DoubleSymbolTools;
