# mdWrite

[![Project Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

A web-based markdown editor

## Table of Contents

- [mdWrite](#mdwrite)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Useful Scripts](#useful-scripts)
  - [Usage Guide](#usage-guide)
  - [Roadmap](#roadmap)
  - [License](#license)
  - [Contact](#contact)

## About

This is a web-based markdown editor built with the ace editor. It is capable of showing the live preview of your document and save it right in your browser. A more detailed list of its features is given below.

It is built for anyone who writes markdown on a regular basis in need of a cross platform editor without needing to install it. All of your files are kept locally. So no need for an internet connection once the editor is loaded.

## Features

- **Live Preview:** Displays a real-time preview of the rendered Markdown as users type.
- **Syntax Highlighting:** Highlights Markdown syntax to make it visually clear for users.
- **Toolbar:** Provides a toolbar with options to write bold, italic, headings, lists, etc.
- **File Import/Export:** Enables users to import and export Markdown files.
- **Code Blocks and Emojis:** Supports for displaying code blocks within the editor and parses emojis.
- **Word Count:** Displays live word and character count to help users track their progress.
- **Responsive Design:** Ensures the editor works well on different devices and screen sizes.
- **Search and Replace:** Includes a search and replace functionality.
- **Themes:** Offers light and dark theme for the editor to cater to users' preferences.
- **Autosave:** Implements autosave functionality to prevent users from losing their work.
- **Version History:** Keeps a history of the previous versions of the document.

## Getting Started

Follow the steps below to setup this project on your own machine.

### Prerequisites

Make sure you have the latest version of nodejs and git installed on your system to follow the installation guide.

### Installation

- **Clone the repo**: `git clone https://github.com/shashotoNur/mdwrite.git`.
- **Enter the project directory:** `cd mdwrite`.
- **Install the necessary dependencies:** `npm install`.
- **Run the project locally:** `npm run dev`.

### Useful Scripts

You can deploy this app to your own github page.
- First change the remote git repo with `git remote set-url origin https://github.com/username/repo_name.git`.
- Verify the change with `git remote -v`.
- Build the project with `npm run build`.
- Finally use the following script to deploy `npm run deploy`.

## Usage Guide

* The editor offers a live preview of your markdown code on the side panel with support for html tags as well as markdown emojis.
* By default the theme of the editor is light, which can be changed by clicking the "Day" button.
* On load, the editor shows the entries (markdown documents) saved inside the browser. The Entries list can be displayed/hidden by clicking on the "Entries" button.
* By default autosave is turned off but it can be activated using the "Save" button, which shows whether autosave is activated or not.
* The editor has a tool bar, featuring basic tools useful in writing markdown, that can be opened by clicking on the "tools" button.
* The editor also features four keyboard shortcuts:
  1. Ctrl+b for writing bold texts
  2. Ctrl+i for writing in italics
  3. Ctrl+f for finding texts within the active entry
  4. Ctrl+s for saving your your entry inside the browser
* The editor also allows you to import and/or export your entries from/to your filesystem.
* The editor can also version your files inside the browser. Note that, entries saved due to autosave shall not preserve any any versions. Versioning is only available for saves by Ctrl+s.

* **Demo:** You can view a live demo here as a [Github Page](https://shashotoNur.github.io/mdwrite/).

## Roadmap

- Optimize the codebase
- Create an icon
- Turn it into an installable web app

## [License](LICENSE)

## Contact

[<img align="left" alt="email" src="https://img.shields.io/badge/email-8838FF?logo=proton&logoColor=white&style=for-the-badge" />](mailto:shashoto.nur@proton.me?subject=Hey%20there&body=I%20wanted%20to%20say%20hi!)
[<img align="left" alt="telegram" src="https://img.shields.io/badge/telegram-229ED9?logo=telegram&logoColor=white&style=for-the-badge" />](https://t.me/shashoto)
