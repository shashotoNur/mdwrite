import { useState } from "react";

import Editor from "./components/Editor";
import Preview from "./components/Preview";

import "./App.css";

const App = () => {
    const [markdown, setMarkdown] = useState("");

    const handleChange = (newMarkdown: string) => {
        setMarkdown(newMarkdown);
    };

    return (
        <div className="app-container">
            <Editor markdown={markdown} onMarkdownChange={handleChange} />
            <Preview markdown={markdown} />
        </div>
    );
};

export default App;
