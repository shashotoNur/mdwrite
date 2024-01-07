import { useContext, useState } from "react";

import {
    DoubleSymbolTools,
    SingleSymbolTools,
    InsertModal,
} from "components/Toolbar/Tools";

import "components/Toolbar/styles.css";
import { ThemeContext, EditorContext, MarkdownContext } from "context";

const Toolbar = ({
    toggleListVisibility,
}: {
    toggleListVisibility: () => void;
}) => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [insertType, setInsertType] = useState("link");
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
        editor.replace(replacementText);
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
            <button
                title="Click to change theme"
                className={`toolbar-button ${theme}`}
                onClick={toggleTheme}
            >
                <i>{theme === "light" ? "DAWN" : "DUSK"}</i>
            </button>
            <button
                title="List of all the entries saved on this device"
                className={`toolbar-button ${theme}`}
                onClick={toggleListVisibility}
            >
                <i>Entries</i>
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={toggleAutosave}
                title={
                    autosave
                        ? "Autosaving every 2 minutes"
                        : "Autosaving is currently disabled"
                }
            >
                <i>{autosave ? "Auto" : "Hold"}</i>
            </button>
            <button
                className={`toolbar-button ${theme}`}
                onClick={() => setHideToolbar(!hideToolbar)}
                title={hideToolbar ? "Open toolbar" : "Close toolbar"}
            >
                <i>{hideToolbar ? ">" : "X"}</i>
            </button>
            {!hideToolbar && (
                <>
                    <DoubleSymbolTools />
                    <SingleSymbolTools />
                    <button
                        className={`toolbar-button ${theme}`}
                        onClick={createCodeBlock}
                        title="Create code block"
                    >
                        Code
                    </button>
                    <div>
                        <button
                            title="Insert a link"
                            className={`toolbar-button ${theme}`}
                            onClick={() => handleInsert("link")}
                        >
                            Link
                        </button>
                        <button
                            title="Insert an image"
                            className={`toolbar-button ${theme}`}
                            onClick={() => handleInsert("image")}
                        >
                            Image
                        </button>
                        <button
                            title="Insert a link reference"
                            className={`toolbar-button ${theme}`}
                            onClick={() => handleInsert("reference")}
                        >
                            Reference
                        </button>
                    </div>
                    <button
                        title={`Click to ${
                            hideSearch ? "open" : "close"
                        } search modal`}
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

                    {showInsertModal && (
                        <InsertModal
                            insertType={insertType}
                            setShowInsertModal={setShowInsertModal}
                        ></InsertModal>
                    )}
                </>
            )}
        </div>
    );
};

export default Toolbar;
