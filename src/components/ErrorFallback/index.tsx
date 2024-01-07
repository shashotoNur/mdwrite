import "components/ErrorFallback/styles.css";

const ErrorFallback = ({ error }: { error: Error }) => {
    return (
        <div className="error-boundary">
            <h2>Something went wrong.</h2>
            <p>Sorry for the inconvenience!</p>
            {error && <pre title="This is actual error message">{error.message}</pre>}
            <p>Try reloading the page.</p>
        </div>
    );
};

export default ErrorFallback;
