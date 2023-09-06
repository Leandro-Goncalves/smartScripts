import { Scripts } from "./scripts";

export type ScriptsObject = Record<string, Scripts>;

export type SmartScripts = {
  scripts: ScriptsObject;
};
