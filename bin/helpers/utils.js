"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitWithLog = void 0;
const exitWithLog = (message) => {
    if (message)
        console.log(message);
    process.exit(1);
};
exports.exitWithLog = exitWithLog;
