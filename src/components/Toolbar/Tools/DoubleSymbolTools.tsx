import { useContext } from "react";

import { ThemeContext } from "context/theme";
import { insertDoubleSymbol } from "utils/keyPress";
import { EditorContext } from "context/editor";

const DoubleSymbolTools = () => {
    const themeContext = useContext(ThemeContext);
    const { editor } = useContext(EditorContext)!;

    const callInsertDoubleSymbol = (symbol: string) => {
        if (!editor) return;
        insertDoubleSymbol(symbol, editor);
    };

    if (!themeContext || !editor)
        return <div>Error: {!editor ? "Editor" : "Theme"} is null</div>;
    const { theme } = themeContext;

    return (
        <>
            <button
                title="Bold text"
                className={`toolbar-button ${theme}`}
                onClick={() => callInsertDoubleSymbol("__")}
            >
                <b>B</b>
            </button>
            <button
                title="Italic text"
                className={`toolbar-button ${theme}`}
                onClick={() => callInsertDoubleSymbol("_")}
            >
                <i>I</i>
            </button>
            <button
                title="Underlined text"
                className={`toolbar-button ${theme}`}
                onClick={() => callInsertDoubleSymbol("<ins>")}
            >
                <u>u</u>
            </button>
            <button
                title="Strike through text"
                className={`toolbar-button ${theme}`}
                onClick={() => callInsertDoubleSymbol("~")}
            >
                <del>Strike</del>
            </button>
            <button
                title="Text as a subscript"
                className={`toolbar-button ${theme}`}
                onClick={() => callInsertDoubleSymbol("<sub>")}
            >
                Sub
            </button>
            <button
                title="Text as a superscript"
                className={`toolbar-button ${theme}`}
                onClick={() => callInsertDoubleSymbol("<sup>")}
            >
                Super
            </button>
        </>
    );
};

export default DoubleSymbolTools;
