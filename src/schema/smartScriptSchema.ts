import Ajv, { JSONSchemaType } from "ajv";
import { execScriptsSchema, scriptScriptsSchema } from "./execScriptsSchema";
import { optionsScriptsSchema } from "./optionsScriptsSchema";
import { Scripts } from "../types/scripts";
import { SmartScripts } from "../types/smartScripts";

import ajvFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const script2: JSONSchemaType<Scripts> = {
  $id: "scriptSchema",
  type: "object",
  required: [],
  oneOf: [execScriptsSchema, scriptScriptsSchema, optionsScriptsSchema],
  errorMessage: {
    oneOf: "The script must be an object",
  },
};

const script: any = {
  $id: "scriptSchema",
  type: "object",
  required: ["type"],
  properties: {
    type: {
      enum: ["exec", "script", "options"],
    },
  },

  allOf: [
    {
      if: {
        properties: { type: { const: "exec" } },
      },
      then: {
        required: ["exec"],
        properties: {
          exec: { type: "string" },
        },
      },
    },

    {
      if: {
        properties: { type: { const: "script" } },
      },
      then: {
        required: ["script"],
        properties: {
          script: { type: "string" },
        },
      },
    },

    {
      if: {
        properties: { type: { const: "options" } },
      },
      then: optionsScriptsSchema,
    },
  ],

  errorMessage: {
    oneOf: "The script not match with any script type",
  },
};
const smartScript: JSONSchemaType<SmartScripts> = {
  type: "object",
  required: ["scripts"],
  properties: {
    scripts: {
      required: [],
      type: "object",
      additionalProperties: script,
      minProperties: 1,
      errorMessage: {
        minProperties: "Should have at least one script",
        type: "The smart script must be an object",
      },
    },
  },
  errorMessage: {
    type: "The smart script must be a object",
    additionalProperties: "Should not have properties other than scripts",
  },
  additionalProperties: false,
};

const ajv = new Ajv({
  allErrors: true,
  $data: true,
});

ajvFormats(ajv);
ajvErrors(ajv);

export const smartScriptSchema = () => ajv.compile(smartScript);
export const getErrorText = (error: any) => ajv.errorsText([error]);
