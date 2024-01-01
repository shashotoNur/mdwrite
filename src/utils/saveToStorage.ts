interface PropsType {
    filename: string;
    markdown: string;
}

export const saveToStorage = ({ filename, markdown }: PropsType) => {
    const timeZoneOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = new Date().toLocaleString("en-US", {
        timeZone: timeZoneOffset,
    });
    const itemName = `Entry: ${filename} - ${formattedDate}`;
    localStorage.setItem(itemName, markdown);
};
