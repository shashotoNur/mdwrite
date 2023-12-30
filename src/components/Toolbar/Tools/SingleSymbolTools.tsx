import React, { useContext } from "react";

import { ThemeContext } from "context/theme";
import { EditorContext } from "context/editor";

const SingleSymbolTools = () => {
    const themeContext = useContext(ThemeContext);
    const { editor } = useContext(EditorContext)!;

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme } = themeContext;

    const insertSingleSymbol = (symbol: string) => {
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
        if (!selectedHeading || !editor) return;
        insertSingleSymbol(`${"#".repeat(Number(selectedHeading))} `);
        event.target.value = "";
    };
    return (
        <>
            <select
                className={`toolbar-select ${theme}`}
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
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("- ")}
            >
                Unordered List
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("1. ")}
            >
                Ordered List
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("- [ ] ")}
            >
                Checkbox
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("---\n")}
            >
                Rule
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("<br>")}
            >
                Break
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("> ")}
            >
                Quote
            </button>
        </>
    );
};

export default SingleSymbolTools;
