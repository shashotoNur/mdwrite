import { Suspense, lazy, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Main = lazy(() => import("components/Main"));
import { ErrorFallback, Home, Loading } from "components";
import { ThemeProvider, MarkdownProvider, EditorProvider } from "context";

import "./App.css";

const App = () => {
    const [showHome, setShowHome] = useState(true);

    const closeHome = () => setShowHome(false);

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ThemeProvider>
                <MarkdownProvider>
                    <EditorProvider>
                        <Suspense fallback={<Loading />}>
                            {showHome ? (
                                <Home closeHome={closeHome} />
                            ) : (
                                <Main />
                            )}
                        </Suspense>
                    </EditorProvider>
                </MarkdownProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
