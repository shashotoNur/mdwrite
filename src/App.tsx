import Editor from "./components/Editor";
import Preview from "./components/Preview";

import ThemeProvider from "./context/theme.tsx";
import MarkdownProvider from "./context/markdown.tsx";
import EditorProvider from "./context/editor.tsx";

import "./App.css";

const App = () => {
    return (
        <ThemeProvider>
            <MarkdownProvider>
                <EditorProvider>
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
