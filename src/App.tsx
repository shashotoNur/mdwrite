import Editor from "components/Editor";
import Preview from "components/Preview";

import ThemeProvider from "context/theme.tsx";
import MarkdownProvider from "context/markdown.tsx";
import EditorProvider from "context/editor.tsx";

import "./App.css";
import { useState } from "react";
import EntryList from "components/EntryList";

const App = () => {
    const [isEntryListVisible, setIsEntryListVisible] = useState(true);

    const toggleListVisibility = () => {
        setIsEntryListVisible(!isEntryListVisible);
    };

    return (
        <ThemeProvider>
            <MarkdownProvider>
                <EditorProvider>
                    {isEntryListVisible && (
                        <EntryList closeList={toggleListVisibility} />
                    )}
                    <div className="app-container">
                        <Editor />
                        <Preview />
                    </div>
                </EditorProvider>
            </MarkdownProvider>
        </ThemeProvider>
    );
};

export default App;
