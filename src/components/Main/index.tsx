import { useState, useEffect, useRef, useContext, lazy } from "react";

const Editor = lazy(() => import("components/Editor"));
const EntryList = lazy(() => import("components/EntryList"));
const Preview = lazy(() => import("components/Preview"));

import { ThemeContext } from "context";
import "components/Main/styles.css";

const Main = () => {
    const [isEntryListVisible, setIsEntryListVisible] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isEditorVisible, setIsEditorVisible] = useState(true);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);
    const { theme } = useContext(ThemeContext)!;

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleListVisibility = () =>
        setIsEntryListVisible(!isEntryListVisible);

    const toggleVisibility = () => {
        const editor = editorRef.current;
        const preview = previewRef.current;
        if (!editor || !preview) return;

        const element = isEditorVisible ? preview : editor;
        element.scrollIntoView(true);
        setIsEditorVisible(!isEditorVisible);
    };

    return (
        <div className="main">
            {isSmallScreen && (
                <button
                    title={
                        "Click to sroll to " + isEditorVisible
                            ? "preview"
                            : "editor"
                    }
                    className={`floating-button btn ${theme}`}
                    onClick={toggleVisibility}
                >
                    {isEditorVisible ? "↓" : "↑"}
                </button>
            )}
            {isEntryListVisible && (
                <EntryList closeList={toggleListVisibility} />
            )}
            <div className={`editor-sidebar ${theme}`} ref={editorRef}>
                <Editor toggleListVisibility={toggleListVisibility} />
            </div>
            <div className={`preview-pane ${theme}`} ref={previewRef}>
                <Preview />
            </div>
        </div>
    );
};

export default Main;
