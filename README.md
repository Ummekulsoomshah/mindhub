# co42b487d95fbd5b5c8f9c4a8
Overview
The React Vite Notes Chrome Extension is a lightweight note-taking application that runs directly within your web browser. This extension is built using React for the front-end and leverages Firebase for seamless data storage and synchronization. It's fast, responsive, and provides a user-friendly interface for effortless note-taking and organization.

Usage:
1.Click on the React Vite Notes icon in the Chrome toolbar to open the extension.

2.You'll be presented with a simple and clean note-taking interface.

3.Start typing your notes.

4.Use Markdown for formatting your notes.

5.Your notes are automatically saved and synchronized across all open tabs.

6.You can close the extension and reopen it from any tab to access your notes.
Warning: Vite enforces using jsx syntax inside jsx/tsx files, so it will complain about that. Solution: rename `.js` files to `.jsx` :)

Quick start:

```
$ npm install
$ npm start
````

Head over to https://vitejs.dev/ to learn more about using vite

If everything works as expected, build the extension:


```
$ npm run build
````
Load your extension locally in Chrome:

Open Chrome and go to chrome://extensions/.
Enable "Developer mode" at the top right corner.
Click "Load unpacked" and select the dist directory in your project.
Test your extension locally.

Once you are satisfied with your changes, create a pull request to the main repository.

