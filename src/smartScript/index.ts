import prompts from "prompts";
import { SmartScripts } from "../types/smartScripts";
import { errorCallback } from "../types/errorCallback";
import { getScript } from "./getScript";

export const smartScriptHandler = (
  smartScripts: SmartScripts,
  errorCallback: errorCallback
) => {
  const scripts = smartScripts.scripts;
  if (!scripts) {
    console.log("scripts not found");
    process.exit(0);
  }

  const selectScriptKey = async () => {
    const { value } = await prompts({
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
    getScript: (key: string) => getScript(key, scripts, errorCallback),
    selectScriptKey,
  };
};
