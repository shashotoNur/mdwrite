import { useState, useEffect, useContext } from "react";

import { MarkdownContext, ThemeContext } from "context";
import { getReadableTime, exportMarkdown } from "utils";
import "components/EntryList/styles.css";

interface Entry {
    filename: string;
    markdown: string;
    timestamp: Date;
}

interface GroupedEntry {
    entryName: string;
    entries: Entry[];
}

const EntryList = ({ closeList }: { closeList: () => void }) => {
    const [groupedEntries, setGroupedEntries] = useState<GroupedEntry[]>([]);
    const { handleChange, filenameChange, timestampChange } =
        useContext(MarkdownContext)!;
    const { theme } = useContext(ThemeContext)!;

    useEffect(() => {
        const storedEntries = Object.entries(localStorage)
            .filter(([key]) => key.startsWith("Entry: "))
            .map(([key, value]: [key: string, value: string]) => ({
                filename: key.replace("Entry: ", "").split(" - ")[0],
                markdown: value,
                timestamp: new Date(key.replace("Entry: ", "").split(" - ")[1]),
            }));

        const groupedEntries = Object.values(
            storedEntries.reduce((acc, { filename, markdown, timestamp }) => {
                if (!acc[filename]) acc[filename] = [];
                acc[filename].push({ filename, markdown, timestamp });
                return acc;
            }, {} as Record<string, Entry[]>)
        ).map((entries) => {
            entries.sort(
                (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
            );
            return {
                entryName: entries[0].filename,
                entries,
            };
        });

        groupedEntries.sort(
            (a, b) =>
                b.entries[0].timestamp.getTime() -
                a.entries[0].timestamp.getTime()
        );

        setGroupedEntries(groupedEntries);
    }, [closeList]);

    const openEntry = (entry: Entry) => {
        filenameChange(entry.filename);
        handleChange(entry.markdown);
        timestampChange(entry.timestamp);
        closeList();
    };

    const deleteEntry = (target: Entry) => {
        const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        const formattedDate = target.timestamp.toLocaleString("en-US", {
            timeZone,
        });
        localStorage.removeItem(`Entry: ${target.filename} - ${formattedDate}`);

        const newEntries = groupedEntries.map((entry) => {
            if (entry.entryName === target.filename) {
                return {
                    ...entry,
                    entries: entry.entries.filter(
                        (detail) => detail.timestamp !== target.timestamp
                    ),
                };
            }
            return entry;
        });

        setGroupedEntries(newEntries);
    };

    return (
        <div className={`entry-list ${theme}`}>
            <h2 className={`entry-list-heading ${theme}`}>Saved Entries</h2>
            <div
                key="New Entry"
                className={`new entry-button ${theme}`}
                title="Open a new entry in the editor"
                onClick={() =>
                    openEntry({
                        filename: "untitled",
                        markdown: "",
                        timestamp: new Date(),
                    })
                }
            >
                New Entry
            </div>
            {groupedEntries.length == 0 ? (
                <div className={`entry-title ${theme}`}>No entry</div>
            ) : (
                groupedEntries.map(
                    (entry) =>
                        entry.entries.length > 0 && (
                            <div key={entry.entryName}>
                                <div className={`entry-title ${theme}`}>
                                    {entry.entryName.length > 50
                                        ? entry.entryName.substring(0, 70) +
                                          "..."
                                        : entry.entryName}
                                </div>
                                {entry.entries.map((entry) => (
                                    <div
                                        className="entry"
                                        key={entry.timestamp.toString()}
                                    >
                                        <br />
                                        <button
                                            title={`${
                                                entry.filename
                                            } from ${entry.timestamp.toDateString()}`}
                                            className={`entry-button ${theme}`}
                                            onClick={() => openEntry(entry)}
                                        >
                                            {getReadableTime(entry.timestamp)}
                                        </button>
                                        <button
                                            title={`Export as ${entry.filename}.md`}
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
                                            title={`Delete this version of ${entry.filename}`}
                                            className="delete-button"
                                            onClick={() => deleteEntry(entry)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )
                )
            )}
        </div>
    );
};

export default EntryList;
