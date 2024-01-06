import { lazy, startTransition, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "components/ErrorFallback";
import Home from "components/Home";

const Main = lazy(() => import("components/Main"));

import ThemeProvider from "context/theme.tsx";
import MarkdownProvider from "context/markdown.tsx";
import EditorProvider from "context/editor.tsx";

import "./App.css";

const App = () => {
    const [showHome, setShowHome] = useState(true);

    const closeHome = () => {
        startTransition(() => {
            setShowHome(false);
        });
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ThemeProvider>
                <MarkdownProvider>
                    <EditorProvider>
                        {showHome ? <Home closeHome={closeHome} /> : <Main />}
                    </EditorProvider>
                </MarkdownProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
