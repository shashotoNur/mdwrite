import React, { useState } from "react";
import AceEditor from "react-ace";

import "./styles.css"; // Import your CSS file

type ToolbarPropsType = {
    editorRef: React.RefObject<AceEditor>;
};

const Toolbar = ({ editorRef }: ToolbarPropsType) => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [insertType, setInsertType] = useState("link"); // Default to "Link"
    const [insertText, setInsertText] = useState("");
    const [insertReference, setInsertReference] = useState("");
    const [insertUrl, setInsertUrl] = useState("");

    const insertDoubleSymbol = (symbol: string) => {
        const editor = editorRef.current?.editor;
        if (editor) {
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
        }
    };

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
        if (!selectedHeading) return;
        insertSingleSymbol(`${"#".repeat(Number(selectedHeading))} `);
        event.target.value = "";
    };

    const handleInsert = (type: string) => {
        setInsertType(type);
        setShowInsertModal(true);
    };

    const handleInsertModalSubmit = () => {
        let formattedInsert = `[${insertText}](${insertUrl})`;
        if (insertType === "image") formattedInsert = `!` + formattedInsert;
        if (insertType === "reference")
            formattedInsert = `[${insertText}][${insertReference}]`;
        insertTextAtCursor(formattedInsert);

        if (insertType === "reference") {
            const referenceLine = `[${insertReference}]: ${insertUrl}`;
            const editor = editorRef.current?.editor;
            if (!editor) return;
            const lastLine = editor.session.getLine(
                editor.session.getLength() - 1
            );

            if (lastLine.trim() === "") {
                // If the last line is empty, insert the text at the last line
                const position = {
                    row: editor.session.getLength() - 1,
                    column: 0,
                };
                editor.session.insert(position, referenceLine);
            } else {
                // If the last line is not empty, insert the text at a new line
                const position = {
                    row: editor.session.getLength(),
                    column: 0,
                };
                editor.session.insert(position, `\n${referenceLine}`);
            }

            setInsertReference("");
        }

        setShowInsertModal(false);
        setInsertText("");
        setInsertUrl("");
    };

    const insertTextAtCursor = (text: string) => {
        const editor = editorRef.current?.editor;
        if (!editor) return;

        const cursorPosition = editor.getCursorPosition();
        const position = {
            row: cursorPosition.row,
            column: cursorPosition.column,
        };
        editor.session.insert(position, text);
        editor.focus();
    };

    return (
        <div className="toolbar">
            {/* Group styling buttons */}
            <div className="formatting-group">
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

                {/* Heading dropdown with default option */}
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
            </div>

            {/* Group list and formatting buttons */}
            <div className="list-formatting-group">
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
            </div>

            {/* Group link, image, and reference buttons */}
            <div className="insert-group">
                <button
                    className="toolbar-button"
                    onClick={() => handleInsert("link")}
                >
                    Link
                </button>
                <button
                    className="toolbar-button"
                    onClick={() => handleInsert("image")}
                >
                    Image
                </button>
                <button
                    className="toolbar-button"
                    onClick={() => handleInsert("reference")}
                >
                    Reference
                </button>
            </div>

            {/* Conditional modal with modern styling */}
            {showInsertModal && (
                <div className="insert-modal">
                    <label>
                        Text:
                        <input
                            type="text"
                            value={insertText}
                            onChange={(e) => setInsertText(e.target.value)}
                        />
                    </label>
                    {insertType === "reference" && (
                        <label>
                            Reference:
                            <input
                                type="text"
                                value={insertReference}
                                onChange={(e) =>
                                    setInsertReference(e.target.value)
                                }
                            />
                        </label>
                    )}
                    <label>
                        URL:
                        <input
                            type="text"
                            value={insertUrl}
                            onChange={(e) => setInsertUrl(e.target.value)}
                        />
                    </label>
                    <button onClick={handleInsertModalSubmit}>Insert</button>
                </div>
            )}
        </div>
    );
};

export default Toolbar;
