"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScriptsValid = void 0;
const getScriptType_1 = require("./getScriptType");
const isScriptsValid = (smartScript) => {
    const makeInvalidResponse = (message, pointer) => ({
        isValid: false,
        reason: [
            {
                message,
                pointer,
            },
        ],
    });
    const makeInvalidResponseArray = (reason) => ({
        isValid: false,
        reason,
    });
    if (!smartScript) {
        return makeInvalidResponse("smartScript not found", "");
    }
    if (typeof smartScript !== "object") {
        return makeInvalidResponse("smartScript is not a object", "");
    }
    const scripts = smartScript.scripts;
    if (!scripts) {
        return makeInvalidResponse("scripts not found", "/scripts");
    }
    if (typeof scripts !== "object") {
        return makeInvalidResponse("script is not a object", "/scripts");
    }
    const errorKeys = Object.entries(scripts).flatMap(([key, value]) => {
        if (typeof value !== "object") {
            return [
                {
                    message: `script: ${key} is not an object`,
                    pointer: `/scripts/${key}`,
                },
            ];
        }
        const scriptType = (0, getScriptType_1.getScriptType)(value, key);
        if (typeof scriptType === "object") {
            return [scriptType];
        }
        return [];
    });
    if (errorKeys.length > 0) {
        return makeInvalidResponseArray(errorKeys);
    }
    return {
        isValid: true,
    };
};
exports.isScriptsValid = isScriptsValid;
