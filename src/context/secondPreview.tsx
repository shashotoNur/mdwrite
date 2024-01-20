import { createContext, useState } from "react";

export interface SecondPreviewType {
    markdown: string;
    filename: string;
}

export interface SecondPreviewContextType extends SecondPreviewType {
    wordCount: number;
    charCount: number;
    setPreview: ({ markdown, filename }: SecondPreviewType) => void;
}

export const SecondPreviewContext =
    createContext<SecondPreviewContextType | null>(null);

const SecondPreviewProvider: React.FC<{ children: React.ReactNode }> = ({
    // eslint-disable-next-line react/prop-types
    children,
}) => {
    const [markdown, setMarkdown] = useState("");
    const [filename, setFilename] = useState("untitled");
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);

    const setPreview = ({
        markdown,
        filename,
    }: SecondPreviewType) => {
        setMarkdown(markdown);
        setFilename(filename);
        setWordCount(
            markdown.split(/\s+/).filter((string) => string).length
        );
        setCharCount(markdown.length);
    };

    return (
        <SecondPreviewContext.Provider
            value={{
                filename,
                markdown,
                wordCount,
                charCount,
                setPreview,
            }}
        >
            {children}
        </SecondPreviewContext.Provider>
    );
};

export default SecondPreviewProvider;
