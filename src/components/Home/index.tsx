import { useContext } from "react";

import { ThemeContext } from "context/theme";

import "./styles.css";

const Home = ({ closeHome }: { closeHome: () => void }) => {
    const { theme } = useContext(ThemeContext)!;

    return (
        <div className={`homepage-container ${theme}`}>
            <header className="homepage-header">
                <h1># mdWrite</h1>
                <img
                    height={75}
                    width={75}
                    className="logo"
                    src="/icons/android-chrome-192x192.png"
                    alt="mdWrite Logo"
                    onClick={closeHome}
                />
            </header>

            <main className={`homepage-main ${theme}`}>
                <h2>A web-based markdown editor</h2>
                <section className={`features ${theme}`}>
                    <h2>Features</h2>
                    <ul>
                        <li>Live Preview</li>
                        <li>Access from anywhere</li>
                        <li>Syntax Highlighting</li>
                        <li>Toolbar</li>
                        <li>File Import/Export</li>
                        <li>Code Blocks and Emojis</li>
                        <li>Word & Character Count</li>
                        <li>Search & Replace</li>
                        <li>Light & Dark Themes</li>
                        <li>Autosave</li>
                        <li>Version History</li>
                    </ul>
                </section>

                <section className={`usage-guide ${theme}`}>
                    <h2>Getting Started</h2>

                    <ol>
                        <li>
                            <h3>Visualizing Your Work</h3>
                            <ul>
                                <li>
                                    See your Markdown code transform into
                                    formatted text in real time with the live
                                    preview panel on the side.
                                </li>
                                <li>
                                    Use both Markdown syntax and HTML tags, even
                                    emojis, for expressive content.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3>Setting the Mood</h3>
                            <ul>
                                <li>
                                    Choose between light or dark theme by
                                    clicking the &quot;Day&quot; button.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3>Accessing Your Masterpieces</h3>
                            <ul>
                                <li>
                                    See your saved Markdown entries upon opening
                                    mdWrite.
                                </li>
                                <li>
                                    Toggle the entries list with the
                                    &quot;Entries&quot; button.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3>Protecting Your Progress</h3>
                            <ul>
                                <li>
                                    Enable autosave to protect your work from
                                    interruptions. Check its status with the
                                    &quot;Save&quot; button.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3>Unleashing Your Creativity</h3>
                            <ul>
                                <li>
                                    Access essential formatting tools with the
                                    &quot;Tools&quot; button.
                                </li>
                                <li>
                                    Use handy keyboard shortcuts:
                                    <ul>
                                        <li>Ctrl+b: Bold text</li>
                                        <li>Ctrl+i: Italic text</li>
                                        <li>Ctrl+f: Find text</li>
                                        <li>
                                            Ctrl+s: Manually save and create a
                                            version
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3>Sharing and Storing Your Work</h3>
                            <ul>
                                <li>
                                    Import/export Markdown files from/to your
                                    filesystem.
                                </li>
                                <li>
                                    Keep track of changes and revert to previous
                                    versions (manual saves only).
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <hr></hr>
                    <br></br>

                    <p>
                        <b>Additional tips</b>: Explore the toolbar, use clear
                        Markdown syntax, and manually save (Ctrl+s) for
                        versions. Have questions? Reach out to
                        <a
                            href="mailto:shashoto.nur@proton.me"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            me
                        </a>
                        .
                    </p>
                    <p>Happy writing!</p>
                </section>
            </main>
            <button
                className={`close-home-button ${theme}`}
                onClick={closeHome}
            >
                Close
            </button>
        </div>
    );
};

export default Home;
