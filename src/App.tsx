import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

const Main = lazy(() => import("components/Main"));
const Entry = lazy(() => import("components/Entry"));
const SplitPreviews = lazy(() => import("components/SplitPreviews"));
const NotFound = lazy(() => import("components/NotFound"));
import {
    ErrorFallback,
    Home,
    Loading,
} from "components";
import {
    ThemeProvider,
    MarkdownProvider,
    EditorProvider,
    SecondPreviewProvider,
    EntryListProvider,
    Compose,
} from "context";

import "./App.css";

const App = () => {
    const [showHome, setShowHome] = useState(true);

    const closeHome = () => setShowHome(false);

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Compose
                components={[
                    ThemeProvider,
                    MarkdownProvider,
                    EditorProvider,
                    SecondPreviewProvider,
                    EntryListProvider,
                ]}
            >
                <BrowserRouter>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route
                                path="/mdwrite"
                                element={
                                    <Suspense fallback={<Loading />}>
                                        {showHome ? (
                                            <Home closeHome={closeHome} />
                                        ) : (
                                            <Main toCloseList={false} />
                                        )}
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/mdwrite/entry/:entryName"
                                element={<Entry />}
                            />
                            <Route
                                path="/mdwrite/previews/p1/:p1/p2/:p2"
                                element={<SplitPreviews />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </Compose>
        </ErrorBoundary>
    );
};

export default App;
