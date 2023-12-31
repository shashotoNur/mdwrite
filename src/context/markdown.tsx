import { createContext, useState } from "react";

export interface MarkdownContextType {
    markdown: string;
    filename: string;
    timestamp: Date;
    wordCount: number;
    charCount: number;
    autosave: boolean;
    toVersion: boolean;
    handleChange: (newMarkdown: string) => void;
    filenameChange: (newFilename: string) => void;
    toggleAutosave: () => void;
    timestampChange: (date: Date) => void;
    toggleToVersion: () => void;
    saveToStorage: () => void;
}

export const MarkdownContext = createContext<MarkdownContextType | null>(null);

const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({
    // eslint-disable-next-line react/prop-types
    children,
}) => {
    const [markdown, setMarkdown] = useState("");
    const [filename, setFilename] = useState("untitled");
    const [timestamp, setTimestamp] = useState(new Date());
    const [autosave, setAutosave] = useState(false);
    const [toVersion, setToVersion] = useState(false);
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

        if (!autosave) return;

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
        setAutosave(false);
    };

    const timestampChange = (date: Date) => {
        setTimestamp(date);
    };

    const toggleAutosave = () => {
        setAutosave(!autosave);
    };

    const toggleToVersion = () => {
        setToVersion(!toVersion);
    };

    const saveToStorage = () => {
        const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        const now = new Date();
        const formattedDate = now.toLocaleString("en-US", {
            timeZone,
        });
        const entryKey = `Entry: ${filename} - ${formattedDate}`;
        localStorage.setItem(entryKey, markdown);

        if (toVersion) return;
        const oldDate = timestamp.toLocaleString("en-US", {
            timeZone,
        });
        setTimestamp(now);
        localStorage.removeItem(`Entry: ${filename} - ${oldDate}`);
    };

    return (
        <MarkdownContext.Provider
            value={{
                filename,
                markdown,
                timestamp,
                wordCount,
                charCount,
                autosave,
                toVersion,
                handleChange,
                filenameChange,
                toggleAutosave,
                timestampChange,
                toggleToVersion,
                saveToStorage,
            }}
        >
            {children}
        </MarkdownContext.Provider>
    );
};

export default MarkdownProvider;
