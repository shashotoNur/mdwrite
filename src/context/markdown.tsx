import { createContext, useState } from "react";

export interface MarkdownContextType {
    markdown: string;
    filename: string;
    timestamp: Date;
    wordCount: number;
    charCount: number;
    autosave: boolean;
    toVersion: boolean;
    isSaved: boolean;
    handleChange: (
        newMarkdown: string,
        newTimestamp?: Date,
        newFilename?: string
    ) => void;
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
    const [toVersion, setToVersion] = useState(true);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [lastSaveTime, setLastSaveTime] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const TwoMinInMS = 2 * 60 * 1000;

    const handleChange = (
        newMarkdown: string,
        newTimestamp?: Date,
        newFilename?: string
    ) => {
        setMarkdown(newMarkdown);
        setWordCount(
            newMarkdown.split(/\s+/).filter((string) => string).length
        );
        setCharCount(newMarkdown.length);

        const dateObjNow = new Date();
        const dateNumberNow = Date.now();
        const lastSaved = dateNumberNow - lastSaveTime;

        const latestTimestamp = newTimestamp ?? timestamp;
        const latestFilename = newFilename ?? filename;

        const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        const oldTime = latestTimestamp.toLocaleString("en-US", {
            timeZone,
        });
        const oldEntry = `Entry: ${latestFilename} :~~: ${oldTime}`;
        const oldMarkdown = localStorage.getItem(oldEntry);

        if (oldMarkdown === newMarkdown) return setIsSaved(true);
        if (!autosave || lastSaved < TwoMinInMS) return setIsSaved(false);

        const newTime = dateObjNow.toLocaleString("en-US", {
            timeZone,
        });
        const newEntry = `Entry: ${filename} :~~: ${newTime}`;

        localStorage.setItem(newEntry, newMarkdown);
        localStorage.removeItem(oldEntry);

        setLastSaveTime(dateNumberNow);
        setTimestamp(dateObjNow);
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
        const newTime = now.toLocaleString("en-US", {
            timeZone,
        });
        const oldTime = timestamp.toLocaleString("en-US", {
            timeZone,
        });

        const oldEntry = `Entry: ${filename} :~~: ${oldTime}`;
        const oldMarkdown = localStorage.getItem(oldEntry);
        if (markdown === oldMarkdown) return console.log("not saving");

        const newEntry = `Entry: ${filename} :~~: ${newTime}`;
        localStorage.setItem(newEntry, markdown);

        setTimestamp(now);
        setIsSaved(true);
        if (toVersion) return;
        localStorage.removeItem(oldEntry);
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
                isSaved,
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
