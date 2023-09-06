import { errorCallback } from "../types/errorCallback";
import { ScriptsObject } from "../types/smartScripts";
import { ExecScript, OptionsScript, Scripts } from "../types/scripts";
import { options } from "../options/Options";

export const getScript = async (
  scriptKey: string,
  scripts: ScriptsObject,
  errorCallback: errorCallback
) => {
  const currentScript = scripts[scriptKey];
  if (!currentScript) {
    errorCallback("scriptKey is not valid");
    return;
  }

  const runGetScript = async (
    s: Scripts
  ): Promise<ExecScript | ExecScript[] | undefined> => {
    if (s.type === "exec") {
      const script = s as ExecScript;
      if (script.confirmToExec || typeof script.confirmToExec === "string") {
        const confirm = await options.confirm(script.confirmToExec);

        if (confirm) {
          return script;
        }

        process.exit(0);
      }
      return script;
    }

    const script = s as OptionsScript;

    if (!script.options || (script.options ?? []).length <= 0) {
      errorCallback("options not found");
      process.exit(0);
    }

    const value = await options.select<Scripts>(script);

    const getAllScripts = (
      await Promise.all(value.map((s) => runGetScript(s)))
    ).flat();
    const allPayloadsIsValid = getAllScripts.every((s) => s !== undefined);

    return allPayloadsIsValid ? (getAllScripts as ExecScript[]) : undefined;
  };

  const valueToReturn = await runGetScript(currentScript);

  return valueToReturn;
};
