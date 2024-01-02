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
    timestampChange: (date: Date) => void;
}

export const MarkdownContext = createContext<MarkdownContextType | null>(null);

const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({
    // eslint-disable-next-line react/prop-types
    children,
}) => {
    const [markdown, setMarkdown] = useState("");
    const [filename, setFilename] = useState("untitled");
    const [timestamp, setTimestamp] = useState(new Date());
    const [autosave, setAutosave] = useState("false");
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [lastSaveTime, setLastSaveTime] = useState(0);

    const TwoMinInMS = 10 * 1000;

    const handleChange = (newMarkdown: string) => {
        setMarkdown(newMarkdown);
        setWordCount(
            newMarkdown.split(/\s+/).filter((string) => string).length
        );
        setCharCount(newMarkdown.length);

        if (autosave === "false") return;

        const dateNow = new Date();
        const lastSaved = Date.now() - lastSaveTime;

        if (lastSaved < TwoMinInMS) return;

        const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        const initialTimestamp = timestamp.toLocaleString("en-US", {
            timeZone,
        });
        const newTimestamp = dateNow.toLocaleString("en-US", {
            timeZone,
        });
        const initialEntryKey = `Entry: ${filename} - ${initialTimestamp}`;
        const newEntryKey = `Entry: ${filename} - ${newTimestamp}`;

        localStorage.setItem(newEntryKey, newMarkdown);
        localStorage.removeItem(initialEntryKey);
        setLastSaveTime(Date.now());
        setTimestamp(dateNow);
    };

    const filenameChange = (newFilename: string) => {
        setFilename(newFilename);
        toggleAutosave();
    };

    const timestampChange = (date: Date) => {
        setTimestamp(date);
    };

    const toggleAutosave = () => {
        const toggledValue = autosave === "true" ? "false" : "true";
        setAutosave(toggledValue);
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
                timestampChange,
            }}
        >
            {children}
        </MarkdownContext.Provider>
    );
};

export default MarkdownProvider;
