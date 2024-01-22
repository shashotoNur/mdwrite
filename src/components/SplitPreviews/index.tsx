import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw"; // Crucial for HTML tag preservation
import rehypeStringify from "rehype-stringify";
import emoji from "remark-emoji";

import { MarkdownContext, SecondPreviewContext, ThemeContext } from "context";
import { ErrorFallback, Preview } from "components";
import { getReadableTime } from "utils";

import "components/SplitPreviews/styles.css";

const SplitPreviews = () => {
    const { p1, p2 } = useParams();
    const { handleChange, filenameChange } = useContext(MarkdownContext)!;
    const { setPreview } = useContext(SecondPreviewContext)!;
    const { markdown, wordCount, charCount, filename } =
        useContext(SecondPreviewContext)!;
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
        if(!firstPreview || !secondPreview) return;

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
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <div className={`preview-info ${theme}`}>
                        <div className={`word-count ${theme}`}>
                            {wordCount} words
                        </div>
                        <div className={`char-count ${theme}`}>
                            {charCount} characters
                        </div>
                    </div>
                    <h3>{filename}</h3>
                    <div className={`preview-content ${theme}`}>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw, rehypeStringify]}
                            remarkPlugins={[
                                remarkParse,
                                remarkGfm,
                                remarkRehype,
                                emoji,
                            ]}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default SplitPreviews;
