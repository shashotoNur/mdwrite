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
                title="Choose a heading"
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
                title="Create bullet points"
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("- ")}
            >
                Unordered List
            </button>
            <button
                title="Create an ordered list"
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("1. ")}
            >
                Ordered List
            </button>
            <button
                title="Add a checkbox"
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("- [ ] ")}
            >
                Checkbox
            </button>
            <button
                title="Add a horizontal rule"
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("---\n")}
            >
                Rule
            </button>
            <button
                title="Add a line break"
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("<br>")}
            >
                Break
            </button>
            <button
                title="Indent text with block quotes"
                className={`toolbar-button ${theme}`}
                onClick={() => insertSingleSymbol("> ")}
            >
                Quote
            </button>
        </>
    );
};

export default SingleSymbolTools;
