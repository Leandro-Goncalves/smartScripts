"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScript = void 0;
const getScriptType_1 = require("../helpers/getScriptType");
const Options_1 = require("../options/Options");
const getScript = async (scriptKey, scripts, errorCallback) => {
    const currentScript = scripts[scriptKey];
    if (!currentScript) {
        errorCallback("scriptKey is not valid");
        return;
    }
    const runGetScript = async (s) => {
        if ((0, getScriptType_1.getScriptType)(s) === "exec") {
            const script = s;
            if (script.confirmToExec || typeof script.confirmToExec === "string") {
                const confirm = await Options_1.options.confirm(script.confirmToExec);
                if (confirm) {
                    return script;
                }
                process.exit(0);
            }
            return script;
        }
        const script = s;
        if (!script.options || (script.options ?? []).length <= 0) {
            errorCallback("options not found");
            process.exit(0);
        }
        const value = await Options_1.options.select(script);
        const allScriptsIsValid = value.every((s) => (0, getScriptType_1.getScriptType)(s) !== undefined);
        if (!allScriptsIsValid) {
            process.exit(0);
        }
        const getAllScripts = (await Promise.all(value.map((s) => runGetScript(s)))).flat();
        const allPayloadsIsValid = getAllScripts.every((s) => s !== undefined);
        return allPayloadsIsValid ? getAllScripts : undefined;
    };
    const valueToReturn = await runGetScript(currentScript);
    return valueToReturn;
};
exports.getScript = getScript;
