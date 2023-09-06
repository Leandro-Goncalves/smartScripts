export type Scripts = ExecScript | ScriptScript | OptionsScript;

export type ExecScript = {
  type: "exec";
  confirmToExec?: string;
  exec: string;
};

export type ScriptScript = {
  type: "script";
  confirmToExec?: string;
  script: string;
};

export type OptionsScript = {
  type: "options";
  multipleSelection?: boolean;
  message?: string;
  options: OptionItem[];
};

export type OptionItem = {
  name: string;
  message?: string;
  payload: Scripts;
  defaultCheck?: boolean;
};
