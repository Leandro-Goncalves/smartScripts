"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsScriptsSchema = exports.optionsScriptsSchemaOld = void 0;
exports.optionsScriptsSchemaOld = {
    $id: "optionsScriptsSchema",
    type: "object",
    required: ["options", "type"],
    properties: {
        type: {
            type: "string",
            const: "options",
        },
        multipleSelection: {
            type: "boolean",
            nullable: true,
        },
        message: {
            type: "string",
            nullable: true,
        },
        options: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["name", "payload"],
                properties: {
                    name: { type: "string" },
                    message: { type: "string", nullable: true },
                    payload: { $ref: "scriptSchema" },
                    defaultCheck: { type: "boolean", nullable: true },
                },
            },
        },
    },
    errorMessage: {
        required: {
            exec: "exec is required",
            type: "type options required",
        },
    },
};
exports.optionsScriptsSchema = {
    $id: "optionsScriptsSchema",
    type: "object",
    required: ["options", "type"],
    properties: {
        type: {
            type: "string",
            const: "options",
        },
        multipleSelection: {
            type: "boolean",
            nullable: true,
        },
        message: {
            type: "string",
            nullable: true,
        },
        options: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["name", "payload"],
                properties: {
                    name: { type: "string" },
                    message: { type: "string", nullable: true },
                    payload: { $ref: "scriptSchema" },
                    defaultCheck: { type: "boolean", nullable: true },
                },
            },
        },
    },
    errorMessage: {
        required: {
            exec: "exec is required",
            type: "type options required",
        },
    },
};
