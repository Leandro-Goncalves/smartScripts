"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSmartScript = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const smartScriptsName = ["smartScripts.json"];
const getSmartScript = () => {
    const pkg = require(path_1.default.join(process.cwd(), "package.json"));
    const smartScripts = pkg["smartScripts"];
    if (smartScripts) {
        return smartScripts;
    }
    const smartScriptJson = smartScriptsName.flatMap((name) => {
        const filePath = path_1.default.join(process.cwd(), name);
        if (!fs_1.default.existsSync(filePath)) {
            return [];
        }
        const smartScriptJson = require(filePath);
        return [smartScriptJson];
    });
    return smartScriptJson[0];
};
exports.getSmartScript = getSmartScript;
