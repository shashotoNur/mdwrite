import "components/Loading/styles.css";
import { useEffect, useState } from "react";

const Loading = () => {
    const [dots, setDots] = useState(1); // Start with one dot

    useEffect(() => {
        const dotInterval = setInterval(() => {
            setDots((prevDots) => (prevDots % 3) + 1);
        }, 1000);

        return () => clearInterval(dotInterval);
    }, []);

    return (
        <div className="loading">
            <h2>
                Loading
                {Array.from({ length: dots }, (_, i) => (
                    <span key={i}>.</span>
                ))}
            </h2>
            <p>The editor is being loaded.</p>
            <p>
                It may take a few seconds, depending upon your internet speed,
                if this is the first time the editor is being loaded.
            </p>
            <p>
                If it stuck, try clearing out the site data and reloading the
                page.
            </p>
        </div>
    );
};

export default Loading;
