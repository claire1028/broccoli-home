const {defaults} = require('jest-config');
module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    setupFiles: ["./setupTests.js"],
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/fileMock.js",
        ".*\\.(css|less|scss|styl)$": "<rootDir>/__mocks__/fileMock.js"
    }
};
