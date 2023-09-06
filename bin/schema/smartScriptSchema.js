"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorText = exports.smartScriptSchema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const execScriptsSchema_1 = require("./execScriptsSchema");
const optionsScriptsSchema_1 = require("./optionsScriptsSchema");
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_errors_1 = __importDefault(require("ajv-errors"));
const script2 = {
    $id: "scriptSchema",
    type: "object",
    required: [],
    oneOf: [execScriptsSchema_1.execScriptsSchema, execScriptsSchema_1.scriptScriptsSchema, optionsScriptsSchema_1.optionsScriptsSchema],
    errorMessage: {
        oneOf: "The script must be an object",
    },
};
const script = {
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
            then: optionsScriptsSchema_1.optionsScriptsSchema,
        },
    ],
    errorMessage: {
        oneOf: "The script not match with any script type",
    },
};
const smartScript = {
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
const ajv = new ajv_1.default({
    allErrors: true,
    $data: true,
});
(0, ajv_formats_1.default)(ajv);
(0, ajv_errors_1.default)(ajv);
const smartScriptSchema = () => ajv.compile(smartScript);
exports.smartScriptSchema = smartScriptSchema;
const getErrorText = (error) => ajv.errorsText([error]);
exports.getErrorText = getErrorText;
