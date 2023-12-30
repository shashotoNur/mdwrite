import { createContext, useState } from "react";
import AceEditor from "react-ace";
import { IAceEditor } from "react-ace/lib/types";

export interface EditorContextType {
    editor: IAceEditor | undefined;
    changeEditor: (editorRef: React.RefObject<AceEditor>) => void;
}

export const EditorContext = createContext<EditorContextType | null>(null);

const EditorProvider: React.FC<{ children: React.ReactNode }> = ({
    // eslint-disable-next-line react/prop-types
    children,
}) => {
    const [editor, setEditor] = useState<IAceEditor | undefined>(undefined);

    const changeEditor = (editorRef: React.RefObject<AceEditor>) => {
        const newEditor = editorRef.current?.editor;
        if (!newEditor) return;

        setEditor(newEditor);
    };

    return (
        <EditorContext.Provider value={{ editor, changeEditor }}>
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;
