"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartScriptHandler = void 0;
const prompts_1 = __importDefault(require("prompts"));
const getScript_1 = require("./getScript");
const smartScriptHandler = (smartScripts, errorCallback) => {
    const scripts = smartScripts.scripts;
    if (!scripts) {
        console.log("scripts not found");
        process.exit(0);
    }
    const selectScriptKey = async () => {
        const { value } = await (0, prompts_1.default)({
            type: "select",
            name: "value",
            message: "Select the correct script",
            choices: Object.keys(scripts).map((key) => {
                return {
                    title: key,
                    value: key,
                };
            }),
            initial: 0,
        });
        return value;
    };
    return {
        getScript: (key) => (0, getScript_1.getScript)(key, scripts, errorCallback),
        selectScriptKey,
    };
};
exports.smartScriptHandler = smartScriptHandler;
