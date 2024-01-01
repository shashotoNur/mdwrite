import { IAceEditor } from "react-ace/lib/types";
import { saveToStorage } from "./saveToStorage";

interface KeyDownProps {
    event: KeyboardEvent;
    editor: IAceEditor;
    filename: string;
    markdown: string;
}

export const handleKeyDown = ({
    event,
    editor,
    filename,
    markdown,
}: KeyDownProps) => {
    if (!event.ctrlKey) return;
    if (event.key === "b" || event.key === "B") {
        event.preventDefault();
        insertDoubleSymbol("__", editor);
    } else if (event.key === "i" || event.key === "I") {
        event.preventDefault();
        insertDoubleSymbol("_", editor);
    } else if (event.key === "s" || event.key === "S") {
        event.preventDefault();
        saveToStorage({ filename, markdown });
    }
};

export const insertDoubleSymbol = (symbol: string, editor: IAceEditor) => {
    if (!editor) return;

    const cursorPosition = editor.getCursorPosition();
    const selection = editor.getSelectedText();
    const secondSymbol = symbol.replace("<", "</");

    if (selection) {
        const range = editor.getSelectionRange();
        editor.session.replace(range, `${symbol}${selection}${secondSymbol}`);
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

        editor.clearSelection();
        editor.moveCursorToPosition(newPosition);
    }

    editor.focus();
};
