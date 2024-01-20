import { IAceEditor } from "react-ace/lib/types";
interface KeyDownProps {
    event: KeyboardEvent;
    editor: IAceEditor;
    saveToStorage: () => void;
}

export const handleKeyDown = ({
    event,
    editor,
    saveToStorage,
}: KeyDownProps) => {
    if (!event.ctrlKey) return;
    switch (event.key.toLowerCase()) {
        case "b":
            event.preventDefault();
            insertDoubleSymbol("__", editor);
            break;
        case "i":
            event.preventDefault();
            insertDoubleSymbol("_", editor);
            break;
        case "s":
            event.preventDefault();
            saveToStorage();
            break;
        case "o":
            event.preventDefault();
            document.getElementById("entries-button")?.click();
            break;
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
