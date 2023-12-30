import { createContext, useState } from "react";

export interface MarkdownContextType {
    markdown: string;
    filename: string;
    wordCount: number;
    charCount: number;
    handleChange: (newMarkdown: string) => void;
    filenameChange: (newFilename: string) => void;
}

export const MarkdownContext = createContext<MarkdownContextType | null>(null);

const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({
    // eslint-disable-next-line react/prop-types
    children,
}) => {
    const [markdown, setMarkdown] = useState("");
    const [filename, setFilename] = useState("untitled");
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);

    const handleChange = (newMarkdown: string) => {
        setMarkdown(newMarkdown);
        setWordCount(
            newMarkdown.split(/\s+/).filter((string) => string).length
        );
        setCharCount(newMarkdown.length);
    };

    const filenameChange = (newFilename: string) => {
        setFilename(newFilename);
    };

    return (
        <MarkdownContext.Provider
            value={{
                filename,
                markdown,
                wordCount,
                charCount,
                handleChange,
                filenameChange,
            }}
        >
            {children}
        </MarkdownContext.Provider>
    );
};

export default MarkdownProvider;
