import { MarkdownContext } from "context/markdown";
import { useState, useEffect, useContext } from "react";

import "components/EntryList/styles.css";
import { ThemeContext } from "context/theme";
import { exportMarkdown } from "utils/exportMarkdown";

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
    }, [closeList]);

    const handleEntrySelect = (entry: Entry) => {
        filenameChange(entry.filename);
        handleChange(entry.markdown);
        closeList();
    };

    const handleEntryDelete = (entry: Entry) => {
        // Remove the entry from local storage
        localStorage.removeItem(`Entry: ${entry.filename}`);

        // Update the entries state to reflect the removal
        setEntries(entries.filter((e) => e.filename !== entry.filename));
    };

    return (
        <div className={`entry-list ${theme}`}>
            <h2 className={`entry-list-heading ${theme}`}>Saved Entries</h2>
            <button
                key="New Entry"
                className={`entry-button ${theme}`}
                onClick={() =>
                    handleEntrySelect({ filename: "untitled", markdown: "" })
                }
            >
                New Entry
            </button>
            {entries.map((entry, index) => (
                <div key={entry.filename} className="entry">
                    <button
                        className={`entry-button ${theme}`}
                        onClick={() => handleEntrySelect(entry)}
                    >
                        <b>
                            {index + 1}.{" "}
                            {entry.filename.length > 50
                                ? entry.filename.substring(0, 70) + "..."
                                : entry.filename}
                        </b>
                    </button>
                    <button
                        className={`export-button ${theme}`}
                        onClick={() =>
                            exportMarkdown({
                                filename: entry.filename,
                                markdown: entry.markdown,
                            })
                        }
                    >
                        Export
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => handleEntryDelete(entry)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EntryList;
