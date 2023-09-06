#!/usr/bin/env node
import { exitWithLog } from "./helpers/utils";
import { smartScriptHandler } from "./smartScript";
import { getSmartScript } from "./helpers/getSmartScript";
import { smartScriptSchema } from "./schema/smartScriptSchema";
import { handleError } from "./helpers/handleError";
import { execPayload } from "./helpers/execPlayload";

let scriptKey = process.argv[2];

const smartScripts = getSmartScript();
if (!smartScripts) {
  exitWithLog("package.smartScripts not found");
  process.exit(0);
}

const schema = smartScriptSchema();
const valid = schema(smartScripts);

if (!valid) {
  const output = handleError(schema, smartScripts, schema.errors ?? []);
  exitWithLog(output);
}

const { getScript, selectScriptKey } = smartScriptHandler(
  smartScripts,
  exitWithLog
);

(async function () {
  if (!scriptKey) {
    scriptKey = await selectScriptKey();
    if (!scriptKey) exitWithLog();
  }
  const scriptToRun = await getScript(scriptKey);

  if (!scriptToRun) {
    exitWithLog("scriptToRun not found");
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
