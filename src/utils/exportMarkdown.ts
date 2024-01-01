import saveAs from "file-saver";

export const exportMarkdown = ({
    filename,
    markdown,
}: {
    filename: string;
    markdown: string;
}) => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    saveAs(blob, `${filename}.md`);
};
