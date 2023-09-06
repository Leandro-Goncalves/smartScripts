"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScriptType = void 0;
const getScriptType = (script, scriptName) => {
    const isAnExec = script.exec || script.script;
    if (isAnExec) {
        return "exec";
    }
    const optionsScript = script.options;
    if (optionsScript) {
        if (typeof optionsScript !== "object") {
            return {
                message: "options is not an object",
                pointer: `/options/${scriptName}`,
            };
        }
        if (optionsScript.length <= 1) {
            return {
                message: "options is less than 1",
                pointer: `/options/${scriptName}`,
            };
        }
        const allOptionsIsValid = optionsScript.every((op, index) => {
            const scriptKey = `/options/${scriptName}/${index}`;
            if (typeof op.name !== "string") {
                return {
                    message: `name is not a string`,
                    pointer: `${scriptKey}/name`,
                };
            }
            const isPayloadValid = (0, exports.getScriptType)(op.payload, scriptKey);
            return isPayloadValid !== undefined;
        });
        if (allOptionsIsValid) {
            return "options";
        }
    }
    return {
        message: `${scriptName} is not a valid script type`,
        pointer: `/scripts/${scriptName}`,
    };
};
exports.getScriptType = getScriptType;
