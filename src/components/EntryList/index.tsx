import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { EntryListContext, ThemeContext } from "context";
import { GroupedEntryType } from "context/entrylist";
import List from "./list";

import "components/EntryList/styles.css";

const EntryList = ({ closeList }: { closeList: () => void }) => {
    const [matchingGroups, setMatchingGroups] = useState<GroupedEntryType[]>(
        []
    );
    const [hideSearch, setHideSearch] = useState(true);
    const [searchText, setSearchText] = useState("");
    const { theme } = useContext(ThemeContext)!;
    const {
        groupedEntries,
        updateList,
        exportEntries,
        importEntries,
        previewEntries,
        openEntry,
    } = useContext(EntryListContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        updateList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (searchText === "") return setMatchingGroups(groupedEntries);
        const matches = groupedEntries.filter((group) =>
            group.entryName.toLowerCase().includes(searchText.toLowerCase())
        );
        setMatchingGroups(matches);
    }, [groupedEntries, searchText]);

    return (
        <div className={`entry-list ${theme}`}>
            <h2 className={`entry-list-heading ${theme}`}>Saved Entries</h2>
            <div className="header-button-container">
                <button
                    key="New Entry"
                    className={`entry-button ${theme}`}
                    title="Open a new entry in the editor"
                    onClick={() => {
                        openEntry({
                            filename: "untitled",
                            markdown: "",
                            timestamp: new Date(),
                        });
                        closeList();
                    }}
                >
                    New Entry
                </button>
                <button
                    key="Preview"
                    className={`entry-button ${theme}`}
                    title="Mark two entries to open a preview"
                    onClick={() => {
                        const p = previewEntries();
                        p &&
                            navigate(`/mdwrite/previews/p1/${p[0]}/p2/${p[1]}`);
                    }}
                >
                    Preview
                </button>
            </div>
            <div className="header-button-container">
                <label
                    key="Import Entries"
                    className={`btn ${theme}`}
                    title="Import entries into the browser"
                >
                    <input type="file" onChange={importEntries} />
                    Import Entries
                </label>
                <label
                    className={`btn ${theme}`}
                    title={`Click to ${hideSearch ? "reveal" : "hide"} the search bar`}
                    onClick={() => setHideSearch(!hideSearch)}
                >
                    Search
                </label>
                <label
                    key="Export Entries"
                    className={`btn ${theme}`}
                    title="Export entries into a file"
                    onClick={exportEntries}
                >
                    Export Entries
                </label>
            </div>

            {!hideSearch && (
                <>
                    <input
                        className={`entry-search ${theme}`}
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {matchingGroups.length === 0 ? (
                        <h3 className={`search-heading ${theme}`}>
                            No matches
                        </h3>
                    ) : (
                        <List
                            groupedEntries={matchingGroups}
                            closeList={closeList}
                        />
                    )}
                </>
            )}

            {hideSearch &&
                (groupedEntries.length === 0 ? (
                    <h3 className={`search-heading ${theme}`}>No entry</h3>
                ) : (
                    <List
                        groupedEntries={groupedEntries}
                        closeList={closeList}
                    />
                ))}
        </div>
    );
};

export default EntryList;
