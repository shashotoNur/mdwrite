import { createContext, useState } from "react";

export interface MarkdownContextType {
    markdown: string;
    filename: string;
    wordCount: number;
    charCount: number;
    autosave: string;
    handleChange: (newMarkdown: string) => void;
    filenameChange: (newFilename: string) => void;
    toggleAutosave: () => void;
}

export const MarkdownContext = createContext<MarkdownContextType | null>(null);

const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({
    // eslint-disable-next-line react/prop-types
    children,
}) => {
    const [markdown, setMarkdown] = useState("");
    const [filename, setFilename] = useState("untitled");
    const [autosave, setAutosave] = useState(
        localStorage.getItem("autosave") ?? "false"
    );
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [lastSaveTime, setLastSaveTime] = useState(0);

    const TwoMinInMS = 2 * 60 * 1000;

    const handleChange = (newMarkdown: string) => {
        setMarkdown(newMarkdown);
        setWordCount(
            newMarkdown.split(/\s+/).filter((string) => string).length
        );
        setCharCount(newMarkdown.length);

        if (autosave === "false") return;

        const lastSaved = Date.now() - lastSaveTime;
        if (lastSaved < TwoMinInMS) return;

        localStorage.setItem(`Entry: ${filename}`, newMarkdown);
        setLastSaveTime(lastSaved);
    };

    const filenameChange = (newFilename: string) => {
        setFilename(newFilename);
    };

    const toggleAutosave = () => {
        const toggledValue = autosave === "true" ? "false" : "true";
        setAutosave(toggledValue);
        localStorage.setItem("autosave", toggledValue);
    };

    return (
        <MarkdownContext.Provider
            value={{
                filename,
                markdown,
                wordCount,
                charCount,
                autosave,
                handleChange,
                filenameChange,
                toggleAutosave,
            }}
        >
            {children}
        </MarkdownContext.Provider>
    );
};

export default MarkdownProvider;
