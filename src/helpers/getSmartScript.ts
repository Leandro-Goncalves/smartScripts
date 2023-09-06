import path from "path";
import fs from "fs";
import { SmartScripts } from "../types/smartScripts";

const smartScriptsName = ["smartScripts.json"];

export const getSmartScript = (): SmartScripts | undefined => {
  const pkg = require(path.join(process.cwd(), "package.json"));
  const smartScripts = pkg["smartScripts"];

  if (smartScripts) {
    return smartScripts;
  }

  const smartScriptJson = smartScriptsName.flatMap((name) => {
    const filePath = path.join(process.cwd(), name);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const smartScriptJson = require(filePath);
    return [smartScriptJson];
  });

  return smartScriptJson[0];
};
