import { IAceEditor } from "react-ace/lib/types";

interface saveProps {
    filename: string;
    markdown: string;
}

const saveToStorage = ({ filename, markdown }: saveProps) => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const formattedDate = new Date().toLocaleString("en-US", {
        timeZone,
    });
    const entryKey = `Entry: ${filename} - ${formattedDate}`;
    localStorage.setItem(entryKey, markdown);
};

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
            saveToStorage({ filename, markdown });
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
