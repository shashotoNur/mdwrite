import { lazy, useState } from "react";

// const Home = lazy(() => import("components/Home"));
const EntryList = lazy(() => import("components/EntryList"));
const Editor = lazy(() => import("components/Editor"));
const Preview = lazy(() => import("components/Preview"));

import ThemeProvider from "context/theme.tsx";
import MarkdownProvider from "context/markdown.tsx";
import EditorProvider from "context/editor.tsx";

import "./App.css";

const App = () => {
    const [isEntryListVisible, setIsEntryListVisible] = useState(true);
    // const [showHome, setShowHome] = useState(true);

    const toggleListVisibility = () =>
        setIsEntryListVisible(!isEntryListVisible);

    // const closeHome = () => setShowHome(false);

    return (
        <ThemeProvider>
            <MarkdownProvider>
                <EditorProvider>
                    {(
                        <>
                            {isEntryListVisible && (
                                <EntryList closeList={toggleListVisibility} />
                            )}
                            <div className="app-container">
                                <Editor
                                    toggleListVisibility={toggleListVisibility}
                                />
                                <Preview />
                            </div>
                        </>
                    )}
                </EditorProvider>
            </MarkdownProvider>
        </ThemeProvider>
    );
};

export default App;
