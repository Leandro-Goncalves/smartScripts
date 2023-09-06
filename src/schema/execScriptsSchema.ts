import { JSONSchemaType } from "ajv";
import { ExecScript, ScriptScript } from "../types/scripts";

export const execScriptsSchema: JSONSchemaType<ExecScript> = {
  $id: "execScriptsSchema",
  type: "object",
  required: ["exec", "type"],
  properties: {
    confirmToExec: { type: "string", nullable: true },
    exec: { type: "string" },
    type: {
      type: "string",
      const: "exec",
    },
  },
  additionalProperties: false,
  errorMessage: {
    required: {
      exec: "exec is required",
      type: "type exec required",
    },
  },
};

export const scriptScriptsSchema: JSONSchemaType<ScriptScript> = {
  $id: "scriptScriptsSchema",
  type: "object",
  required: ["script", "type"],
  properties: {
    confirmToExec: { type: "string", nullable: true },
    script: { type: "string" },
    type: {
      type: "string",
      const: "script",
    },
  },
  additionalProperties: false,
  errorMessage: {
    required: {
      exec: "exec is required",
      type: "type script required",
    },
  },
};
