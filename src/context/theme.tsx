import { createContext, useState } from "react";

export interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    // eslint-disable-next-line react/prop-types
    children,
}) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ?? "light"
    );

    const toggleTheme = () => {
        const newTheme = (theme === "light") ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
