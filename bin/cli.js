#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const utils_1 = require("./helpers/utils");
const smartScript_1 = require("./smartScript");
const getSmartScript_1 = require("./helpers/getSmartScript");
const smartScriptSchema_1 = require("./schema/smartScriptSchema");
const error_1 = require("./helpers/error");
const execPayload = (scriptToRun) => {
    if (scriptToRun.exec !== undefined) {
        let execArray = scriptToRun.exec.split(" ");
        const command = execArray.shift();
        if (!command) {
            process.exit(0);
        }
        (0, node_child_process_1.spawn)(command, execArray, {
            stdio: "inherit",
            shell: true,
        });
    }
    else {
        (0, node_child_process_1.spawn)("npm.cmd", ["run", scriptToRun.script], {
            stdio: "inherit",
        });
    }
};
let scriptKey = process.argv[2];
const smartScripts = (0, getSmartScript_1.getSmartScript)();
if (!smartScripts) {
    (0, utils_1.exitWithLog)("package.smartScripts not found");
    process.exit(0);
}
const schema = (0, smartScriptSchema_1.smartScriptSchema)();
const valid = schema(smartScripts);
if (!valid) {
    const output = (0, error_1.handleError)(schema, smartScripts, schema.errors ?? []);
    (0, utils_1.exitWithLog)(output);
}
const { getScript, selectScriptKey } = (0, smartScript_1.smartScriptHandler)(smartScripts, utils_1.exitWithLog);
(async function () {
    if (!scriptKey) {
        scriptKey = await selectScriptKey();
        console.log(scriptKey);
        if (!scriptKey)
            (0, utils_1.exitWithLog)();
    }
    const scriptToRun = await getScript(scriptKey);
    if (!scriptToRun) {
        (0, utils_1.exitWithLog)("scriptToRun not found");
        process.exit(0);
    }
    if (Array.isArray(scriptToRun)) {
        scriptToRun.forEach((s) => {
            execPayload(s);
        });
        return;
    }
    execPayload(scriptToRun);
})();
