import { MarkdownContext } from "context/markdown";
import { useState, useEffect, useContext } from "react";

import "components/EntryList/styles.css";
import { ThemeContext } from "context/theme";

interface Entry {
    filename: string;
    markdown: string;
}

const EntryList = ({ closeList }: { closeList: () => void }) => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const { handleChange, filenameChange } = useContext(MarkdownContext)!;
    const { theme } = useContext(ThemeContext)!;

    useEffect(() => {
        const storedEntries = Object.entries(localStorage)
            .filter(([key]) => key.startsWith("Entry: "))
            .map(([key, value]: [key: string, value: string]) => ({
                filename: key.replace("Entry: ", ""),
                markdown: value,
            }));
        setEntries(storedEntries);
    }, []);

    const handleEntrySelect = (entry: Entry) => {
        filenameChange(entry.filename);
        handleChange(entry.markdown);
        closeList();
    };

    return (
        <div className={`entry-list ${theme}`}>
            <h2 className={`entry-list-heading ${theme}`}>Saved Entries</h2>
            <button
                key="New"
                className={`entry-button ${theme}`}
                onClick={() =>
                    handleEntrySelect({ filename: "untitled", markdown: "" })
                }
            >
                New
            </button>
            {entries.map((entry) => (
                <button
                    key={entry.filename}
                    className={`entry-button ${theme}`}
                    onClick={() => handleEntrySelect(entry)}
                >
                    {entry.filename}
                </button>
            ))}
        </div>
    );
};

export default EntryList;
