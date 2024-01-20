import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Main from "components/Main";
import { MarkdownContext } from "context";
import { getReadableTime } from "utils";

const Entry = () => {
    const { entryName } = useParams();
    const { handleChange, filenameChange, timestampChange } =
        useContext(MarkdownContext)!;

    useEffect(() => {
        const storedEntries = Object.entries(localStorage)
            .filter(([key]) => {
                const entryKey = key.split(" :~~: ")[0];
                const readableTime = getReadableTime(
                    new Date(key.replace("Entry: ", "").split(" :~~: ")[1])
                );
                const formattedKey = entryKey + "@" + readableTime;
                const matchedKey = formattedKey.startsWith(
                    `Entry: ${entryName}`
                );

                return matchedKey;
            })
            .map(([key, value]: [key: string, value: string]) => ({
                filename: key.replace("Entry: ", "").split(" :~~: ")[0],
                markdown: value,
                timestamp: new Date(
                    key.replace("Entry: ", "").split(" :~~: ")[1]
                ),
            }));

        storedEntries.sort(
            (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        );

        const entry =
            storedEntries.length > 0
                ? storedEntries[0]
                : {
                      filename: entryName ?? "untitled",
                      markdown: "",
                      timestamp: new Date(),
                  };

        filenameChange(entry.filename);
        handleChange(entry.markdown);
        timestampChange(entry.timestamp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entryName]);

    return <Main toCloseList={true} />;
};

export default Entry;
