import saveAs from "file-saver";
import { createContext, useContext, useState } from "react";

import { getReadableTime } from "utils";
import { MarkdownContext } from "./markdown";

interface EntryType {
    filename: string;
    markdown: string;
    timestamp: Date;
}

export interface GroupedEntryType {
    entryName: string;
    entries: EntryType[];
}

type RenamingEntries = Record<string, boolean>;

export interface EntryListContextType {
    selectedEntries: EntryType[];
    groupedEntries: GroupedEntryType[];
    newName: string;
    renamingEntries: RenamingEntries;
    updateList: () => void;
    renameEntry: (oldName: string) => void;
    handleEntrySelect: (entry: EntryType) => void;
    exportEntries: () => void;
    importEntries: (event: React.ChangeEvent<HTMLInputElement>) => void;
    previewEntries: () => void | string[];
    openEntry: (entry: EntryType) => void;
    deleteEntry: (target: EntryType) => void;
    startRenaming: (entryName: string) => void;
    setNewName: React.Dispatch<React.SetStateAction<string>>;
}

export const EntryListContext = createContext<EntryListContextType | null>(
    null
);

const EntryListProvider: React.FC<{ children: React.ReactNode }> = ({
    // eslint-disable-next-line react/prop-types
    children,
}) => {
    const [selectedEntries, setSelectedEntries] = useState<EntryType[]>([]);
    const [groupedEntries, setGroupedEntries] = useState<GroupedEntryType[]>(
        []
    );
    const [renamingEntries, setRenamingEntries] = useState<RenamingEntries>({});
    const [renamingInProgress, setRenamingInProgress] = useState(false);
    const [newName, setNewName] = useState("");
    const { handleChange, filenameChange, timestampChange } =
        useContext(MarkdownContext)!;


    const updateList = () => {
        const storedEntries = Object.entries(localStorage)
            .filter(([key]) => key.startsWith("Entry: "))
            .map(([key, value]: [key: string, value: string]) => ({
                filename: key.replace("Entry: ", "").split(" :~~: ")[0],
                markdown: value,
                timestamp: new Date(
                    key.replace("Entry: ", "").split(" :~~: ")[1]
                ),
            }));

        const groupedEntries = Object.values(
            storedEntries.reduce((acc, { filename, markdown, timestamp }) => {
                if (!acc[filename]) acc[filename] = [];
                acc[filename].push({ filename, markdown, timestamp });
                return acc;
            }, {} as Record<string, EntryType[]>)
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
        setSelectedEntries([]);
    };

    const renameEntry = (oldName: string) => {
        const ending = () => {
            setRenamingInProgress(false);
            setRenamingEntries((prevState) => ({
                ...prevState,
                [oldName]: !prevState[oldName], // Toggle state for specific entry
            }));
            updateList();
        };

        if (oldName === newName) return ending();
        const matches = groupedEntries.filter(
            (group) => group.entryName === newName
        );

        if (matches.length > 0) {
            const toMerge = confirm(
                "This entry name already exists! Click OK to merge."
            );
            if (!toMerge) return ending();
        }

        Object.entries(localStorage).filter(
            ([key, value]: [key: string, value: string]) => {
                if (key.startsWith(`Entry: ${oldName} :~~:`)) {
                    const timeStr = key.replace(`Entry: ${oldName} :~~:`, "");
                    localStorage.removeItem(key);
                    localStorage.setItem(
                        `Entry: ${newName} :~~:${timeStr}`,
                        value
                    );
                }
            }
        );

        ending();
    };

    const handleEntrySelect = (entry: EntryType) => {
        setSelectedEntries((prevSelectedEntries) => {
            if (prevSelectedEntries.includes(entry)) {
                return prevSelectedEntries.filter((e) => e !== entry);
            } else {
                return [...prevSelectedEntries, entry];
            }
        });
    };

    const exportEntries = () => {
        if (selectedEntries.length == 0)
            return alert("Please select at least one entry to export!");
        const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        const storageEntries = selectedEntries.map((entry) => ({
            key:
                "Entry: " +
                entry.filename +
                " :~~: " +
                entry.timestamp.toLocaleString("en-US", {
                    timeZone,
                }),
            value: entry.markdown,
        }));

        const entriesJSON = JSON.stringify(storageEntries);
        const blob = new Blob([entriesJSON], { type: "text/markdown" });
        saveAs(blob, `Entries@${getReadableTime(new Date())}.json`);

        setSelectedEntries([]);
    };

    const importEntries = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files)
            return alert(
                "Select a proper exported file of entries to import from"
            );
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            if (!event.target) return;
            const entriesJSON = event.target.result;
            if (typeof entriesJSON !== "string")
                return alert("Import failed! File data corrupted.");

            const storageEntries = JSON.parse(entriesJSON) as {
                key: string;
                value: string;
            }[];

            storageEntries.forEach((entry) => {
                localStorage.setItem(entry.key, entry.value);
            });

            updateList();
            setSelectedEntries([]);
        };
        reader.readAsText(file);
    };

    const previewEntries = () => {
        if (selectedEntries.length !== 2)
            return alert("Select exactly two entries to preview!");
        const entry1 = `${selectedEntries[0].filename}@${getReadableTime(
            selectedEntries[0].timestamp
        )}`;
        const entry2 = `${selectedEntries[1].filename}@${getReadableTime(
            selectedEntries[1].timestamp
        )}`;

        return [entry1, entry2];
    };

    const openEntry = (entry: EntryType) => {
        const { filename, timestamp, markdown } = entry;

        filenameChange(filename);
        timestampChange(timestamp);
        handleChange(markdown, timestamp, filename);
    };

    const deleteEntry = (target: EntryType) => {
        const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        const formattedDate = target.timestamp.toLocaleString("en-US", {
            timeZone,
        });
        localStorage.removeItem(
            `Entry: ${target.filename} :~~: ${formattedDate}`
        );

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

    const startRenaming = (entryName: string) => {
        if (renamingInProgress) return;
        setNewName(entryName);
        setRenamingInProgress(true);
        setRenamingEntries((prevState) => ({
            ...prevState,
            [entryName]: !prevState[entryName], // Toggle state for specific entry
        }));
    };

    return (
        <EntryListContext.Provider
            value={{
                selectedEntries,
                groupedEntries,
                newName,
                renamingEntries,
                updateList,
                renameEntry,
                handleEntrySelect,
                exportEntries,
                importEntries,
                previewEntries,
                openEntry,
                deleteEntry,
                startRenaming,
                setNewName,
            }}
        >
            {children}
        </EntryListContext.Provider>
    );
};

export default EntryListProvider;
