import { MarkdownContext } from "context/markdown";
import { useState, useEffect, useContext } from "react";

import "components/EntryList/styles.css";
import { ThemeContext } from "context/theme";
import { exportMarkdown } from "utils/exportMarkdown";

interface Entry {
    filename: string;
    markdown: string;
    timestamp:string;
}

interface GroupedEntry {
    entryName: string;
    entries: {
        filename: string;
        markdown: string;
        timestamp: string;
    }[];
}

const EntryList = ({ closeList }: { closeList: () => void }) => {
    const [groupedEntries, setGroupedEntries] = useState<GroupedEntry[]>([]);
    const { handleChange, filenameChange } = useContext(MarkdownContext)!;
    const { theme } = useContext(ThemeContext)!;

    useEffect(() => {
        const storedEntries = Object.entries(localStorage)
            .filter(([key]) => key.startsWith("Entry: "))
            .map(([key, value]: [key: string, value: string]) => ({
                filename: key.replace("Entry: ", "").split(" - ")[0],
                markdown: value,
                timestamp: key.replace("Entry: ", "").split(" - ")[1],
            }));

        const groupedEntries = Object.entries(
            storedEntries.reduce<
                Record<
                    string,
                    Entry[]
                >
            >((acc, { filename, markdown, timestamp }) => {
                if (!acc[filename]) acc[filename] = [];
                acc[filename].push({ filename, markdown, timestamp });
                return acc;
            }, {} as Record<string, Entry[]>)
        ).map(([entryName, entries]) => ({ entryName, entries }));

        setGroupedEntries(groupedEntries);
    }, [closeList]);

    const getTimestamp = (item: string) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const dateTimeString = item;
        const dateObject = new Date(dateTimeString); // Convert string to Date object

        const date = dateObject.getDate();
        const month = months[dateObject.getMonth()];
        const year = dateObject.getFullYear();

        const formattedDate = `${date} ${month}, ${year}`;

        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const meridian = hours >= 12 ? "PM" : "AM";

        const formattedTime = `${hours % 12 || 12}:${minutes
            .toString()
            .padStart(2, "0")} ${meridian}`; // Example output: "9:01 AM"

        return `${formattedTime} - ${formattedDate}`;
    };

    const openEntry = (entry: Entry) => {
        filenameChange(entry.filename);
        handleChange(entry.markdown);
        closeList();
    };

    const deleteEntry = (target: Entry) => {
        localStorage.removeItem(`Entry: ${target.filename} - ${target.timestamp}`);

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
            <button
                key="New Entry"
                className={`entry-button ${theme}`}
                onClick={() =>
                    openEntry({
                        filename: "untitled",
                        markdown: "",
                        timestamp: "",
                    })
                }
            >
                New Entry
            </button>
            {groupedEntries.map((entry) => (
                <div key={entry.entryName}>
                    <div className={`entry-title ${theme}`}>
                        {entry.entryName.length > 50
                            ? entry.entryName.substring(0, 70) + "..."
                            : entry.entryName}
                    </div>
                    {entry.entries.map((entry) => (
                        <div className="entry" key={entry.timestamp}>
                            <br />
                            <button
                                className={`entry-button ${theme}`}
                                onClick={() => openEntry(entry)}
                            >
                                {getTimestamp(entry.timestamp)}
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
                                onClick={() => deleteEntry(entry)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default EntryList;
