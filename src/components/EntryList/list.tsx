import { useContext } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "context";
import { EntryListContext, GroupedEntryType } from "context/entrylist";
import { getReadableTime, exportMarkdown } from "utils";

const List = ({
    groupedEntries,
    closeList,
}: {
    groupedEntries: GroupedEntryType[];
    closeList: () => void;
}) => {
    const { theme } = useContext(ThemeContext)!;
    const {
        selectedEntries,
        renamingEntries,
        renameEntry,
        handleEntrySelect,
        openEntry,
        deleteEntry,
        startRenaming,
        setNewName,
    } = useContext(EntryListContext)!;

    return groupedEntries.map(
        (entry) =>
            entry.entries.length > 0 && (
                <div key={entry.entryName}>
                    <div className={`entry-title ${theme}`}>
                        {!renamingEntries[entry.entryName] ? (
                            entry.entryName.length > 50 ? (
                                entry.entryName.substring(0, 70) + "..."
                            ) : (
                                entry.entryName
                            )
                        ) : (
                            <>
                                <input
                                    className={`entry-search ${theme}`}
                                    type="text"
                                    placeholder={entry.entryName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <label
                                    key="Rename Entry"
                                    className={`btn ${theme}`}
                                    title="Rename"
                                    onClick={() => renameEntry(entry.entryName)}
                                >
                                    Rename
                                </label>
                            </>
                        )}
                    </div>
                    <div
                        title="Rename this entry"
                        className={`rename-btn ${theme}`}
                        onClick={() => startRenaming(entry.entryName)}
                    >
                        &gt;
                    </div>
                    {entry.entries.map((entry) => (
                        <div className="entry" key={entry.timestamp.toString()}>
                            <br />
                            <label
                                title="Check to preview"
                                className={`checkbox-container ${theme}`}
                            >
                                <input
                                    type="checkbox"
                                    name="myCheckbox"
                                    checked={selectedEntries.includes(entry)}
                                    onChange={() => handleEntrySelect(entry)}
                                />
                                <span
                                    className={`checkbox-checkmark ${theme}`}
                                ></span>
                            </label>
                            <button
                                title={`${
                                    entry.filename
                                } from ${entry.timestamp.toDateString()}`}
                                className={`entry-button ${theme}`}
                                onClick={() => {
                                    openEntry(entry);
                                    closeList();
                                }}
                            >
                                {getReadableTime(entry.timestamp)}{" "}
                            </button>
                            <Link
                                title="Open entry in new tab"
                                to={
                                    "entry/" +
                                    entry.filename +
                                    "@" +
                                    getReadableTime(entry.timestamp)
                                }
                                target="_blank"
                            >
                                <h3>[↗]</h3>
                            </Link>
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
                                title={`Export as ${entry.filename}.md`}
                                className={`export-button ${theme}`}
                                onClick={() =>
                                    exportMarkdown({
                                        filename:
                                            entry.filename +
                                            "@" +
                                            getReadableTime(entry.timestamp),
                                        markdown: entry.markdown,
                                    })
                                }
                            >
                                @
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
    );
};

export default List;
