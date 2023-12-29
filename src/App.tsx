import { useContext, useState } from "react";

import Editor from "./components/Editor";
import Preview from "./components/Preview";

import { ThemeContext } from "./context/theme";

import "./App.css";

const App = () => {
    const [markdown, setMarkdown] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const themeContext = useContext(ThemeContext);

    if (!themeContext) return <div>Error: Theme context is null</div>;
    const { theme } = themeContext;

    const handleChange = (newMarkdown: string) => {
        setMarkdown(newMarkdown);
        setWordCount(
            newMarkdown.split(/\s+/).filter((string) => string).length
        );
        setCharCount(newMarkdown.length);
    };

    return (
            <div className={`app-container ${theme}`}>
                <Editor markdown={markdown} onMarkdownChange={handleChange} />
                <Preview
                    markdown={markdown}
                    counts={{ wordCount, charCount }}
                />
            </div>
    );
};

export default App;
