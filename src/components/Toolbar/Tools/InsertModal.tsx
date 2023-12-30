import { useContext, useState } from "react";
import { IAceEditor } from "react-ace/lib/types";

import { ThemeContext } from "context/theme";
import { EditorContext } from "context/editor";

interface InsertModalProps {
    insertType: string;
    showInsertModal: boolean;
    setShowInsertModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const InsertModal = ({
    insertType,
    showInsertModal,
    setShowInsertModal,
}: InsertModalProps) => {
    const [insertText, setInsertText] = useState("");
    const [insertReference, setInsertReference] = useState("");
    const [insertUrl, setInsertUrl] = useState("");
    const themeContext = useContext(ThemeContext);
    const { editor } = useContext(EditorContext)!;

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme } = themeContext;

    const insertTextAtCursor = (
        text: string,
        editor: IAceEditor | undefined
    ) => {
        if (!editor) return;

        const cursorPosition = editor.getCursorPosition();
        const position = {
            row: cursorPosition.row,
            column: cursorPosition.column,
        };
        editor.session.insert(position, text);
        editor.focus();
    };

    const handleSubmit = () => {
        let formattedInsert = `[${insertText}](${insertUrl})`;
        if (insertType === "image") formattedInsert = `!` + formattedInsert;
        if (insertType === "reference")
            formattedInsert = `[${insertText}][${insertReference}]`;
        if (!editor) return;
        insertTextAtCursor(formattedInsert, editor);

        if (insertType === "reference") {
            const referenceLine = `[${insertReference}]: ${insertUrl}`;
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

    return (
        <div
            className={`insert-modal ${theme}`}
            style={{ display: showInsertModal ? "block" : "none" }}
        >
            <p>
                Insert{" "}
                {insertType.charAt(0).toUpperCase() + insertType.substring(1)}
            </p>
            <input
                type="text"
                value={insertText}
                onChange={(e) => setInsertText(e.target.value)}
                placeholder="Enter text here"
            />

            {insertType === "reference" && (
                <input
                    type="text"
                    value={insertReference}
                    onChange={(e) => setInsertReference(e.target.value)}
                    placeholder="Enter reference here"
                />
            )}

            <input
                type="text"
                value={insertUrl}
                onChange={(e) => setInsertUrl(e.target.value)}
                placeholder="Enter link here"
            />

            <button
                className={`toolbar-button ${theme}`}
                onClick={handleSubmit}
            >
                Insert
            </button>
        </div>
    );
};

export default InsertModal;
