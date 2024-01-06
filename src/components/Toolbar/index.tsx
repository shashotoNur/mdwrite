import { useContext, useState } from "react";

import {
    DoubleSymbolTools,
    SingleSymbolTools,
    InsertModal,
} from "components/Toolbar/Tools";

import { ThemeContext } from "context/theme";
import { EditorContext } from "context/editor";
import { MarkdownContext } from "context/markdown";

import "components/Toolbar/styles.css";

const Toolbar = ({
    toggleListVisibility,
}: {
    toggleListVisibility: () => void;
}) => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [insertType, setInsertType] = useState("link"); // Default to "Link"
    const [hideToolbar, setHideToolbar] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [replacementText, setReplacementText] = useState("");
    const [hideSearch, setHideSearch] = useState(true);
    const themeContext = useContext(ThemeContext);
    const { editor } = useContext(EditorContext)!;
    const { autosave, toggleAutosave } = useContext(MarkdownContext)!;

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme, toggleTheme } = themeContext;

    const handleSearch = () => {
        if (!editor) return;

        editor.find(searchText, {
            caseSensitive: false,
            wholeWord: false,
            regExp: false,
        });
    };

    const handleReplace = () => {
        if (!editor) return;
        editor.replace(replacementText); // Replace with actual replacement text
    };

    const handleReplaceAll = () => {
        if (!editor) return;
        editor.replaceAll(replacementText, {
            caseSensitive: false,
            wholeWord: false,
            regExp: false,
        });

        editor.clearSelection();
    };

    const createCodeBlock = () => {
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
        <div className={`toolbar ${theme}`}>
            <button className={`toolbar-button ${theme}`} onClick={toggleTheme}>
                <i>{theme === "light" ? "Dawn" : "Dusk"}</i>
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={toggleListVisibility}
            >
                <i>Entries</i>
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={toggleAutosave}
                title="When activated, the editor will save the active entry every 2 minutes"
            >
                <i>{autosave === "true" ? "Auto" : "Not"} Saving</i>
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={() => setHideToolbar(!hideToolbar)}
            >
                <b>
                    <i>Tools</i>
                </b>
            </button>
            {!hideToolbar && (
                <>
                    <DoubleSymbolTools />
                    <SingleSymbolTools />
                    <button
                        className={`toolbar-button ${theme}`}
                        onClick={createCodeBlock}
                    >
                        Code
                    </button>
                    <div>
                        <button
                            className={`toolbar-button ${theme}`}
                            onClick={() => handleInsert("link")}
                        >
                            Link
                        </button>
                        <button
                            className={`toolbar-button ${theme}`}
                            onClick={() => handleInsert("image")}
                        >
                            Image
                        </button>
                        <button
                            className={`toolbar-button ${theme}`}
                            onClick={() => handleInsert("reference")}
                        >
                            Reference
                        </button>
                    </div>
                    <button
                        className={`toolbar-button ${theme}`}
                        onClick={() => setHideSearch(!hideSearch)}
                    >
                        🔍
                    </button>
                    {!hideSearch && (
                        <div className={`search-modal ${theme}`}>
                            <input
                                type="text"
                                placeholder="Search"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button
                                className={`toolbar-button ${theme}`}
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
                                className={`toolbar-button ${theme}`}
                                onClick={handleReplace}
                            >
                                Replace
                            </button>
                            <button
                                className={`toolbar-button ${theme}`}
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
                    ></InsertModal>
                </>
            )}
        </div>
    );
};

export default Toolbar;
