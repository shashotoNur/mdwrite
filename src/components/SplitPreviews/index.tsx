import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MarkdownContext, SecondPreviewContext, ThemeContext } from "context";
import { Preview, SecondPreview } from "components";
import { getReadableTime } from "utils";

import "components/SplitPreviews/styles.css";

const SplitPreviews = () => {
    const { p1, p2 } = useParams();
    const { handleChange, filenameChange } = useContext(MarkdownContext)!;
    const { setPreview } = useContext(SecondPreviewContext)!;
    const { theme } = useContext(ThemeContext)!;

    useEffect(() => {
        const getEntry = (entryName: string) => {
            return Object.entries(localStorage)
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
                }))[0];
        };

        if (!p1 || !p2) return console.log("not working");

        const firstPreview = getEntry(p1);
        const secondPreview = getEntry(p2);

        filenameChange(p1);
        handleChange(firstPreview.markdown);
        setPreview({
            filename: p2,
            markdown: secondPreview.markdown,
        });
    }, [filenameChange, handleChange, p1, p2, setPreview]);

    return (
        <div className="previews">
            <div className={`preview-pane ${theme}`}>
                <Preview />
            </div>
            <div className={`preview-pane ${theme}`}>
                <SecondPreview />
            </div>
        </div>
    );
};

export default SplitPreviews;
