

const templatingService = {
    getAllTemplates: () => {
        return [
            {
                filePath: "src/index.js",
                template: 
`import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`
            },
            {
                filePath: "src/App.js",
                template: 
`import React from 'react';

function App() {
    return (
    <div className="App">
    </div>
    );
}

export default App;
`
            },
            {
                filePath: "package.json",
                template: 
`{
    "name": "simplest",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "react": "^16.8.6",
        "react-dom": "^16.8.6",
        "react-scripts": "3.0.1"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "eslintConfig": {
        "extends": "react-app"
    },
    "browserslist": {
        "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
        ],
        "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
        ]
    }
}
`
            },
            {
                filePath: "public/index.html",
                template: 
`<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
    </head>
    <body>
    <div id="root"></div>
    </body>
</html>`
            },
        ]
    }
};

export default templatingService;