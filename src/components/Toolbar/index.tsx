import React, { useState } from "react";
import AceEditor from "react-ace";

import "./styles.css"; // Import your CSS file
import InsertModal from "../Tools/InsertModal";
import SingleSymbolTools from "../Tools/singleSymbolTools";
import DoubleSymbolTools from "../Tools/doubleSymbolTools";

interface PropsType {
    editorRef: React.RefObject<AceEditor>;
}

const Toolbar = ({ editorRef }: PropsType) => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [insertType, setInsertType] = useState("link"); // Default to "Link"
    const [hideToolbar, setHideToolbar] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [replacementText, setReplacementText] = useState("");
    const [hideSearch, setHideSearch] = useState(true);

    const handleSearch = () => {
        const editor = editorRef.current?.editor;
        if (!editor) return;
        editor.find(searchText, {
            caseSensitive: false,
            wholeWord: true,
            regExp: false,
        });
    };

    const handleReplace = () => {
        const editor = editorRef.current?.editor;
        if (!editor) return;
        editor.replace(replacementText); // Replace with actual replacement text
    };

    const handleReplaceAll = () => {
        const editor = editorRef.current?.editor;
        if (!editor) return;
        editor.replaceAll(replacementText, {
            caseSensitive: false,
            wholeWord: true,
            regExp: false,
        });
    };

    const createCodeBlock = () => {
        const editor = editorRef.current?.editor;
        if (!editor) return;

        const cursorPosition = editor.getCursorPosition();
        const currentLine = editor.session.getLine(cursorPosition.row);
        let rowChange = 1;

        if (currentLine.trim() !== "") {
            editor.insert("\n");
            rowChange = 2;
        }

        editor.insert("```\n\n```");
        editor.moveCursorToPosition({
            row: cursorPosition.row + rowChange,
            column: 0,
        });
    };

    const handleInsert = (type: string) => {
        setInsertType(type);
        setShowInsertModal(!showInsertModal);
    };

    return (
        <div className="toolbar">
            <button
                className="toolbar-button"
                onClick={() => setHideToolbar(!hideToolbar)}
            >
                <b>
                    <i>Tools</i>
                </b>
            </button>
            {!hideToolbar && (
                <>
                    <DoubleSymbolTools editorRef={editorRef} />
                    <SingleSymbolTools editorRef={editorRef} />
                    <button
                        className="toolbar-button"
                        onClick={createCodeBlock}
                    >
                        Code
                    </button>
                    <div>
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
                    <button
                        className="toolbar-button"
                        onClick={() => setHideSearch(!hideSearch)}
                    >
                        🔍
                    </button>
                    {!hideSearch && (
                        <div className="search-modal">
                            <input
                                type="text"
                                placeholder="Search"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button
                                className="toolbar-button"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                            <input
                                type="text"
                                placeholder="Replace"
                                onChange={(e) =>
                                    setReplacementText(e.target.value)
                                }
                            />
                            <button
                                className="toolbar-button"
                                onClick={handleReplace}
                            >
                                Replace
                            </button>
                            <button
                                className="toolbar-button"
                                onClick={handleReplaceAll}
                            >
                                Replace All
                            </button>
                        </div>
                    )}

                    <InsertModal
                        insertType={insertType}
                        showInsertModal={showInsertModal}
                        setShowInsertModal={setShowInsertModal}
                        editor={editorRef.current?.editor}
                    ></InsertModal>
                </>
            )}
        </div>
    );
};

export default Toolbar;
